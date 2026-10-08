// The game's level data, decoded the way the game decodes it. Pure functions of a 64 KB image.
const BB = (function () {
  const rev = b => { let r = 0; for (let i = 0; i < 8; i++) if (b & (1 << i)) r |= 0x80 >> i; return r; };
  const half = (ram, lv) => !!(ram[0xFF94 + lv] & 0x80);
  function layoutAddr(ram, lv) {            // unpack_layout $E299: 46 bytes for a mirrored round, 92 otherwise
    let a = 0xC5F2;
    for (let i = 0; i < lv; i++) a += half(ram, i) ? 46 : 92;
    return a;
  }
  function layoutRows(ram, lv) {            // 25 rows of four bytes, as the game leaves them at $8B00
    const a = layoutAddr(ram, lv), g = ram[0xC58E + lv], h = half(ram, lv);
    const gap = (l, r) => [0xFF, l ? 0x87 : 0xFF, r ? 0xE1 : 0xFF, 0xFF];
    const rows = [gap(g & 1, g & 2)];
    for (let r = 0; r < 23; r++) {
      if (h) { const b0 = ram[a + 2 * r], b1 = ram[a + 2 * r + 1]; rows.push([b0, b1, rev(b1), rev(b0)]); }
      else rows.push([ram[a + 4 * r], ram[a + 4 * r + 1], ram[a + 4 * r + 2], ram[a + 4 * r + 3]]);
    }
    rows.push(gap(g & 4, g & 8));
    for (let r = 1; r < 24; r++) rows[r][0] |= 0xC0;      // the left wall, forced on as the unpacker does
    rows[0][3] = (rows[0][3] & 0xFC) | ((g >> 4) & 3);
    rows[24][3] = (rows[24][3] & 0xFC) | ((g >> 6) & 3);
    return rows;
  }
  function walls(ram, lv) {                 // 25 x 32 booleans: a solid cell
    return layoutRows(ram, lv).map(row => {
      const bits = [];
      for (const b of row) for (let i = 0; i < 8; i++) bits.push(!!(b & (0x80 >> i)));
      bits[0] = bits[1] = bits[30] = bits[31] = true;
      return bits;
    });
  }
  function screen(ram, lv) {                // draw_layout $E09B: character codes, 25 x 32, with the shadows
    const rows = layoutRows(ram, lv), S = [];
    for (let r = 0; r < 27; r++) S.push(new Array(42).fill(0x20));
    for (let r = 0; r < 25; r++) for (let x = 0; x < 32; x++) {
      if (!(rows[r][x >> 3] & (0x80 >> (x & 7)))) continue;
      S[r][x] = 0x15;
      const t = S[r][x + 1];
      S[r][x + 1] = t === 0x20 ? 0x0C : (t === 0x0A || t === 0x0D) ? 0x0F : 0x0E;
      S[r + 1][x] = S[r + 1][x] === 0x20 ? 0x0A : 0x0D;
      S[r + 1][x + 1] = 0x0B;
    }
    for (let r = 0; r < 25; r++) {
      const top = !(r & 1);
      S[r][0] = S[r][30] = top ? 0x16 : 0x18;
      S[r][1] = S[r][31] = top ? 0x17 : 0x19;
    }
    for (let x = 0; x < 32; x++) if (S[0][x] === 0x0C) S[0][x] = 0x0E;
    return S.slice(0, 25).map(r => r.slice(0, 32));
  }
  function airRecord(ram, lv) {
    let a = 0xB695;
    for (let i = 0; i < lv; i++) { const b = ram[a]; a += (b & 0x80 || b === 0) ? 1 : b; }
    return a;
  }
  function air(ram, lv) {                   // build_air_currents $E189: 25 x 32 directions, 0 up 1 right 2 down 3 left
    let a;
    for (;;) { a = airRecord(ram, lv); if (ram[a] & 0x80) lv = ram[a] & 0x7F; else break; }
    const rows = layoutRows(ram, lv), m = rows.map(r => new Array(32).fill(r[3] & 3)), n = ram[a];
    if (!n) return m;
    for (let y = 1; y !== n && y < 251;) {
      const b = ram[a + y];
      if (b & 0x80) {
        const d = (b >> 5) & 3, col = b & 0x1F, b1 = ram[a + y + 1], b2 = ram[a + y + 2];
        y += 3;
        const row = b1 >> 3, w = (((b1 & 7) << 2) | (b2 >> 6)) + 1, h = (b2 & 0x1F) + 1;
        for (let r = row; r < row + h && r < 25; r++) for (let c = col; c < col + w && c < 32; c++) m[r][c] = d;
      } else {
        y += 1;
        for (let r = 0; r < 25; r++) for (let c = 0; c < 16; c++) { const v = m[r][c]; m[r][31 - c] = (v & 1) ? v ^ 2 : v; }
      }
    }
    return m;
  }
  function enemies(ram, lv, superMode) {    // start_round $392A; superMode applies the rewrite at $45E3
    let a = 0xAE51;
    for (let i = 0; i < lv; i++) { while (ram[a]) a += 3; a += 1; }
    const out = [];
    for (; ram[a]; a += 3) {
      const b0 = ram[a], b1 = ram[a + 1], b2 = ram[a + 2];
      let kind = b0 & 7;
      if (superMode) kind = kind === 0 ? 1 : kind === 6 ? 5 : kind;
      out.push({ kind, x: (b0 & 0xF8) + 0x14, y: (b1 & 0xF8) + 0x15, wait: (b2 & 0x3F) * 2, left: !!(b2 & 0x40) });
    }
    return out;
  }
  function items(ram, lv) {                 // place_items $2B31: cell of the points item and of the special item
    const a = ram[0xB569 + lv], b = ram[0xB5CD + lv], c = ram[0xB631 + lv];
    return { points: { col: a >> 3, row: ((a & 7) << 2) | (b >> 6) },
             special: { col: (b & 0x3E) >> 1, row: ((b & 1) << 4) | (c >> 4) },
             vents: !!(c & 1), water: !!(c & 2), fire: !!(c & 4), thunder: !!(c & 8) };
  }
  return { rev, half, layoutAddr, layoutRows, walls, screen, air, airRecord, enemies, items };
})();
if (typeof module !== 'undefined') module.exports = BB;
