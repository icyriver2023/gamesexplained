// Bubble Bobble: the pages' widgets, drawn from listing.json with ../../lib/c64.js. Each block runs
// on the page that has its elements.
// bb-frame-data: one recorded frame, trimmed to the memory the drawing reads (kit/c64/frame.py trim)
const BB_FRAME = /*FRAME*/{"schema":1,"standard":"PAL","lines":312,"cycles":63,"about":"","vic":[118,221,0,0,180,214,102,221,74,221,0,21,0,21,0,21,0,27,0,209,0,255,216,0,65,112,241,0,255,0,255,31,240,240,242,241,242,242,241,245,243,254,252,252,240,240,240],"cia2":[150,63],"cpu":[47,53],"writes":[[52,7,65534,171],[52,11,65535,6],[256,2,53256,76],[257,1,21500,118],[257,6,22524,118],[257,24,53254,104],[258,23,21499,117],[258,28,22523,117],[258,46,53252,187],[273,8,65534,46],[273,12,65535,7]],"colour":"CQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0CAgICAgICDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NBwcHDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0FBQUFBQUFDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQUFBQUFBQUNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQICAgICDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQcHBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAwMDAwMDAw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0DAwMDAwMDDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0CAgICAg0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0HBwcNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0BAQEBAQEBDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQICAgICAgINDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0DAwMDAwMDDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ==","ram":[{"a":16384,"b":"PmNjY2NjPgAIGDgYGBg8ADxmBgwYMH4APEYGHAZGPAAOHjZmfwYGAHxgfAYGZjwAHDB8ZmZmPAB+BgwYGBgY"},{"a":16456,"b":"PGZmZj4GPAAAVRUFAAAAABRUVFQAAAAAEBAUFBQUFBQAVVVVAAAAABQUFBQUFBQUABUVFRQUFBRaaaWWWmmlllpppZZaaaWWWmmlllpppZZaaaWWWmmlllpppZZaaaWW"},{"a":16592,"b":"AAAAAAAApZYw8DAw/ACllg=="},{"a":16616,"b":"AB4/Pz8/HgAAAP8AAP8AAA=="},{"a":16640,"b":"AAAAAAAAAAA="},{"a":16664,"b":"PGZgYGBmPAB4bGZmZmx4AH5gYHhgYH4A"},{"a":16712,"b":"fhgYGBgYfgA="},{"a":16760,"b":"PGZmZmZmPAB8ZmZmfGBgAA=="},{"a":16784,"b":"fGZmfHhsZgA8ZnA8DmY8AH4YGBgYGBgAZmZmZmZmPAA="},{"a":17136,"b":"AwAAAAAAAAD//zwAAAAAAMAAAAAAAAAAAw8PDw8PDwOvr////////8Dw8PDw8PDAAAAAAAAAAAMAAAAAADz/rwAAAAAAAADAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAA1dXVwMAAAD/////////P/z9/f388PDAWmmlllpppZdaaaWff+vr61pppZba+fX+////Pz8/DwP////8/PzwwAAAAAAAAAAAAw8/Ojr6///A8Pz8/P///wAAAAAAAAAA"},{"a":20480,"b":"GhsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQERIgICAgICAgIBMUDw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDRMUICAgICAgICAREg4gICAgICAgICAgICAgICAgICAgICAgICAgICAREiAeHh4eHh4eExQOICAgICAgICAgICAgICAgICAgICAgICAgICAgExQgICAgICAgIBESDiAgICAgICAgICAgICAgICAgICAgICAgICAgIBESICAgATUwICATFA4gICAgICAgICAgICAgICAgICAgICAgICAgICATFCAgICABAAAAERIOICAgICAgICAgICAgICAgICAgICAgICAgICAgERIgICAgICAgIBMUDiAgICAgICAgICAgICAgICAgICAgICAgICAgIBMUICAgICAdHR0REg4gICAgICAgICAgICAgICAgICAgICAgICAgICAREiAgICAgICAgExQQEAwgIBAQEBAQEBAQEBAQEBAQEBAQEAwgIBAQExQgIB4eHh4eIBESDw0LICAKDQ0NDQ0NDQ0NDQ0NDQ0NDQ0LICAKDRESICAgICAgICATFA4gICAgICAgICAgICAgZGVmICAgICAgICAgICATFCAgIAI1MCAgERIOICAgICAgICAgICAgIGFiYyAgICAgICAgICAgERIgICAgICAAABMUDiAgICAgICAgICAgICBeX2AgICAgICAgICAgIBMUICAgICAgICAREhAQDCAgEBAQEBAQEBAQEBAQEG1ubxAQDCAgEBAREiAgICAgHR0dExQPDQsgIAoNDQ0NDQ0NDQ0NDQ1qa2wNDQsgIAoNExQgICAgICAgIBESDiAgICAgICAgICAgICAgICAgZ2hpICAgICAgIBESICAeHh4eHiATFA4gICAgICAgICAgICAgICAgICAgICAgc3R1ICATFCAgICAgICAgERIOICAgICAgICAgICAgICAgICAgICAgIHBxciAgERIgICA0LzAgIBMUEBAMICAQEBAQEBAQEBAQEBAQEBAQEBAMICAQEBMUICAgICAgICAREg8NCyAgCg0NDQ0NDQ0NDQ0NDQ0NDQ0NCyAgCg0REiAgIAIAAAAAExQOICAgICAgICAgICAgICAgICAgICAgICAgICAgExQgICAgICAgIBESDiAgICAgICAgICAgICAgICAgICAgICAgICAgIBESIB4eHh4eHh4TFA4gICAgICAgICAgICAgICAgICAgICAgICAgICATFCAjMiUkKTQzERIQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQERIgICAgCSAgIA=="},{"a":21496,"b":"ZWR9dHUAAAA="},{"a":22784,"b":"AAAAAAAAAAAAAAAAADAAAKgAAqoACqr8C7qwDI6ADI68DI6wC7qACqi8AMKwCqpQAvpQC/6gCfWgBfVoBa1q"},{"a":22848,"b":"AAAAAAAAAAAAAAAAADAAAKgAAqoACqr8C7qwDI6ADI68DI6wC7qACqi8AMKwCqpQAvpQC/6iCf2qBfVoCaVg"},{"a":23808,"b":"AAAAAAAAAAAAAAAAAA/AA//wD//wD//wD//wD//wB/MwGfMwGXMwGZ/wBZwADZAACmqgCqqgAqqAAQFQBUAA"},{"a":23872,"b":"AAAAAAAAAAAAAAPAAD/wA//wD//wD//wD//wDf8wBnMwBnMwBnPwDf8ABnAABkAABmqgCaqgAqqABUBAAAFQ"},{"a":24384,"b":"AAAAAAAAAAAAAAAAA/IADzKQDzKQD/KQDzKQDzKQD/KAD/KAD/KAD/KQD96QD2aQD2aQD96QD2aAA2YAABAA"},{"a":32767,"b":"AA=="}],"capture":{"phase_cycles_uncertain":0,"frame_cycles":19656,"frame_ended_on_line":0,"picture_lines_low":0,"writes_account_for_end_state":true,"ram_bytes_changed_during_frame":73,"colour_cells_changed_during_frame":0}}/*END*/;
(async function () {
  if (!window.C64) { document.querySelectorAll('canvas').forEach(c => c.title = 'needs the built site (lib/c64.js)'); return; }
  const G = await C64.load('listing.json'), ram = G.ram, PAL = C64.PAL;
  const $ = id => document.getElementById(id);
  const KIND = [
    ['white wind-up robot', 'walks and climbs towards its player'],
    ['grey spiky creature', 'walks; breathes a fireball along its row'],
    ['green head on a spring', 'moves only by hopping'],
    ['pale green flyer', 'flies on a shallow diagonal: two pixels across, one up or down'],
    ['purple whale shape', 'flies diagonally, two pixels each way'],
    ['green cloak, red face', 'walks; throws a bottle that comes back'],
    ['white robed figure', 'walks; rolls a slow boulder'],
    ['white robot on legs', 'walks; drops a bolt straight down']];
  const kindSprite = k => ram[0xAB6B + k], kindColour = k => ram[0xAB63 + k] & 15, kindFrames = k => [4, 4, 4, 4, 4, 2, 2, 2][k];
  const sprite = n => ram.subarray(0x4000 + n * 64, 0x4000 + n * 64 + 63);
  const drawEnemy = (ctx, k, f, x, y, s) => C64.drawSpriteMC(ctx, sprite(kindSprite(k) + f), x, y, s, PAL[kindColour(k)], PAL[2], PAL[1]);
  let tick = 0;                                  // the animation frame the enemy pictures share
  const bcd = b => (b >> 4) * 10 + (b & 15);
  const itemPic = (ctx, picture, colour, x, y, s) => {
    const a = 0x9AE0 + 32 * picture, cols = [null, PAL[2], PAL[1], PAL[colour & 7]];
    C64.drawGlyphMC(ctx, ram.subarray(a, a + 32), 0, x, y, s, cols); C64.drawGlyphMC(ctx, ram.subarray(a, a + 32), 1, x, y + 8 * s, s, cols);
    C64.drawGlyphMC(ctx, ram.subarray(a, a + 32), 2, x + 8 * s, y, s, cols); C64.drawGlyphMC(ctx, ram.subarray(a, a + 32), 3, x + 8 * s, y + 8 * s, s, cols);
  };

  if ($('bb-round')) {
  // ---- 01 rounds
  const sel = $('bb-round');
  for (let i = 0; i < 100; i++) sel.add(new Option('Round ' + (i + 1), i));
  const mapCtx = C64.canvas($('bb-map'), 512, 400);
  function glyphs(lv) {                     // the character set as build_round leaves it, for the codes a layout uses
    const cs = new Uint8Array(0x100);
    cs.set(ram.subarray(0x4050, 0x4080), 0x50);                       // shadows $0A-$0F
    cs.set(ram.subarray(0xC26E + 8 * lv, 0xC276 + 8 * lv), 0xA8);     // wall tile, $15
    const p = ram[0xFF94 + lv] & 0x7F;
    for (let i = 0; i < 4; i++)
      cs.set(p < 0x64 ? ram.subarray(0xBB0E + 32 * p + 8 * i, 0xBB16 + 32 * p + 8 * i) : ram.subarray(0xC26E + 8 * lv, 0xC276 + 8 * lv), 0xB0 + 8 * i);
    return cs;
  }
  function drawRound() {
    const lv = +sel.value, s = 2, ctx = mapCtx;
    const col = ram[0xFF30 + lv], cols = [null, PAL[col >> 4], PAL[col & 15], PAL[1]];
    const S = BB.screen(ram, lv), cs = glyphs(lv), half = BB.half(ram, lv);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 512, 400);
    for (let r = 0; r < 25; r++) for (let c = 0; c < 32; c++) if (S[r][c] !== 0x20) C64.drawGlyphMC(ctx, cs, S[r][c], c * 16, r * 16, s, cols);
    if ($('bb-t-half').checked && half) { ctx.fillStyle = 'rgba(0,0,0,.72)'; ctx.fillRect(256, 16, 256, 368); }
    if ($('bb-t-air').checked) {
      const A = BB.air(ram, lv), W = BB.walls(ram, lv);
      ctx.strokeStyle = 'rgba(120,220,255,.9)'; ctx.lineWidth = 1.5;
      const d = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      for (let r = 0; r < 25; r++) for (let c = 0; c < 32; c++) {
        if (W[r][c]) continue;
        const [dx, dy] = d[A[r][c]], x = c * 16 + 8, y = r * 16 + 8;
        ctx.beginPath(); ctx.moveTo(x - dx * 5, y - dy * 5); ctx.lineTo(x + dx * 5, y + dy * 5);
        ctx.lineTo(x + dx * 5 - dx * 3 - dy * 3, y + dy * 5 - dy * 3 - dx * 3);
        ctx.moveTo(x + dx * 5, y + dy * 5); ctx.lineTo(x + dx * 5 - dx * 3 + dy * 3, y + dy * 5 - dy * 3 + dx * 3); ctx.stroke();
      }
    }
    const It = BB.items(ram, lv);
    if ($('bb-t-items').checked && lv < 99) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fff'; ctx.strokeRect(It.points.col * 16 + 1, It.points.row * 16 + 1, 30, 30);
      ctx.strokeStyle = PAL[7]; ctx.strokeRect(It.special.col * 16 + 1, It.special.row * 16 + 1, 30, 30);
    }
    const E = BB.enemies(ram, lv, $('bb-t-super').checked);
    for (const e of E) {
      const x = (e.x - 24) * 2 + 24, y = Math.max(10, (e.y - 50) * 2 + 21);
      ctx.fillStyle = PAL[kindColour(e.kind)]; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill();
      ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
    }
    const cast = $('bb-cast'); cast.innerHTML = '';
    for (const e of E) {
      const cv = document.createElement('canvas'), c2 = C64.canvas(cv, 48, 42);
      drawEnemy(c2, e.kind, (e.left ? kindFrames(e.kind) : 0) + (tick % kindFrames(e.kind)), 0, 0, 2);
      cv.title = KIND[e.kind][0]; cast.appendChild(cv);
    }
    const a = BB.layoutAddr(ram, lv), ar = BB.airRecord(ram, lv), al = ram[ar] & 0x80 ? 'same as round ' + ((ram[ar] & 0x7F) + 1) : ram[ar] + ' bytes';
    const vents = !It.vents ? 'none' : ['water', 'fire', 'thunder'].filter(k => It[k]).join(', ') || 'plain bubbles only';
    const t = lv === 55 ? 10 : lv >= 56 ? 20 : 30;
    $('bb-info').innerHTML =
      `<dt>layout</dt><dd><code>${C64.hex(a)}</code>, ${half ? '46 bytes, mirrored' : '92 bytes'}</dd>` +
      `<dt>air currents</dt><dd><code>${C64.hex(ar)}</code>, ${al}</dd>` +
      `<dt>enemies</dt><dd>${E.length ? E.length : 'none: the boss'}</dd>` +
      `<dt>timer</dt><dd>${lv === 99 ? 'stopped' : t + ' seconds'}</dd>` +
      `<dt>vents</dt><dd>${vents}</dd>` +
      `<dt>wall block</dt><dd>${(ram[0xFF94 + lv] & 0x7F) < 0x64 ? 'number ' + (ram[0xFF94 + lv] & 0x7F) : 'the tile itself'}</dd>`;
  }
  sel.onchange = drawRound;
  $('bb-prev').onclick = () => { sel.value = (+sel.value + 99) % 100; drawRound(); };
  $('bb-next').onclick = () => { sel.value = (+sel.value + 1) % 100; drawRound(); };
  for (const id of ['bb-t-air', 'bb-t-half', 'bb-t-items', 'bb-t-super']) $(id).onchange = drawRound;
  drawRound();
  }

  if ($('bb-pic')) {
  // ---- 02 the merge
  const PICS = [['plain bubble, small', 0, 5], ['plain bubble, medium', 4, 5], ['plain bubble, full', 8, 5], ['water bubble', 12, 3],
                ['fire bubble', 16, 2], ['thunder bubble', 20, 5], ['letter E', 24, 5], ['letter X', 28, 5], ['letter T', 32, 5],
                ['letter N', 36, 5], ['letter D', 40, 5], ['Baron', 48, 1]];
  const pic = $('bb-pic');
  PICS.forEach((p, i) => pic.add(new Option(p[0], i)));
  pic.value = 2;
  const stage = ['bb-s-bg', 'bb-s-mask', 'bb-s-gfx', 'bb-s-out'].map(id => C64.canvas($(id), 144, 96));
  function drawMerge() {
    const [, base, colour] = PICS[+pic.value], n = base + (+$('bb-shift').value);
    $('bb-shift-v').textContent = $('bb-shift').value;
    const g = ram[0xAA54 + n] | ram[0xAA8E + n] << 8, m = ram[0xAAC8 + n] | ram[0xAB02 + n] << 8;
    const tile = ram.subarray(0xC26E, 0xC276), cols = ['#000', PAL[2], PAL[1], PAL[colour]];
    // the six cells: an empty row over a row of wall tiles
    const bg = (cx, y) => y < 8 ? 0 : tile[y - 8];
    const put = (ctx, f) => {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 144, 96);
      for (let cx = 0; cx < 3; cx++) for (let y = 0; y < 16; y++) {
        const v = f(cx, y);
        for (let x = 0; x < 4; x++) { const p = (v >> (6 - 2 * x)) & 3; if (p) { ctx.fillStyle = cols[p]; ctx.fillRect(cx * 48 + x * 12, y * 6, 12, 6); } }
      }
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1;
      for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(i * 48 + .5, 0); ctx.lineTo(i * 48 + .5, 96); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(0, 48.5); ctx.lineTo(144, 48.5); ctx.stroke();
    };
    put(stage[0], bg);
    put(stage[1], (cx, y) => bg(cx, y) & ram[m + cx * 16 + y]);
    put(stage[2], (cx, y) => ram[g + cx * 16 + y]);
    put(stage[3], (cx, y) => (bg(cx, y) & ram[m + cx * 16 + y]) | ram[g + cx * 16 + y]);
  }
  pic.onchange = drawMerge; $('bb-shift').oninput = drawMerge; drawMerge();
  if (BB_FRAME) C64.drawFrame($('bb-frame'), BB_FRAME, 2);
  }

  if ($('bb-kinds')) {
  // ---- 03 the cast
  const stats = Array.from({ length: 8 }, () => ({ n: 0, first: 0 }));
  for (let lv = 0; lv < 100; lv++) for (const e of BB.enemies(ram, lv)) { stats[e.kind].n++; if (!stats[e.kind].first) stats[e.kind].first = lv + 1; }
  const kt = $('bb-kinds');
  kt.innerHTML = '<tr><th>Kind</th><th></th><th>Looks like</th><th>Moves</th><th>First round</th><th>In all</th></tr>';
  const kc = [];
  KIND.forEach((k, i) => {
    const tr = kt.insertRow();
    tr.innerHTML = `<td class="bb-num">${i}</td><td></td><td>${k[0]}</td><td>${k[1]}</td><td class="bb-num">${stats[i].first}</td><td class="bb-num">${stats[i].n}</td>`;
    const cv = document.createElement('canvas'); kc.push(C64.canvas(cv, 72, 63)); tr.cells[1].appendChild(cv);
  });
  function drawKinds() { kc.forEach((ctx, i) => { ctx.clearRect(0, 0, 72, 63); drawEnemy(ctx, i, tick % kindFrames(i), 0, 0, 3); }); }
  setInterval(() => { tick++; drawKinds(); }, 180); drawKinds();
  }

  if ($('bb-chain')) {
  // ---- 04 chains
  function drawChain() {
    const n = +$('bb-chain').value; $('bb-chain-v').textContent = n;
    const bonus = bcd(ram[0xAB52 + n]) * 1000; let total = bonus;
    $('bb-chain-bonus').textContent = bonus.toLocaleString('en');
    const box = $('bb-chain-foods'); box.innerHTML = '';
    for (let r = 1; r <= n; r++) {
      const item = ram[0xA790 + r], code = ram[0xA79A + r], pts = code === 0x50 ? 500 : bcd(code) * 1000; total += pts;
      const d = document.createElement('div'), cv = document.createElement('canvas'), ctx = C64.canvas(cv, 48, 48);
      itemPic(ctx, ram[0xA892 + item], ram[0xA8E4 + item], 0, 0, 3);
      d.appendChild(cv); d.appendChild(document.createTextNode(pts.toLocaleString('en'))); box.appendChild(d);
    }
    $('bb-chain-total').textContent = total.toLocaleString('en');
  }
  $('bb-chain').oninput = drawChain; drawChain();
  }

  if ($('bb-items')) {
  // ---- 06 special items
  const FX = { 0x00: ['shoe', 'the player moves half as fast again'], 0x01: ['cane', 'a giant food at the end of the round'], 0x02: ['cane', 'a giant food at the end of the round'],
    0x03: ['sweet', 'bubbles reload in 3 steps, not 8'], 0x04: ['sweet', 'bubbles travel further'], 0x05: ['sweet', 'bubbles fly at double speed'],
    0x06: ['red cross', '19 fireballs in place of bubbles'], 0x07: ['yellow cross', 'a flash, then a falling block that kills what it passes'], 0x08: ['cyan cross', 'a flood that kills every enemy'],
    0x09: ['lamp', 'all three bubble powers and all three rings'], 0x0A: ['lamp', 'all three bubble powers'], 0x0B: ['lamp', 'every enemy is beaten at once and falls as food'],
    0x0C: ['ring', '10 points for every jump'], 0x0D: ['ring', '10 points for every step'], 0x0E: ['ring', '10 points for every bubble blown'],
    0x0F: ['clock', 'enemies frozen and the timer stopped for a while'], 0x10: ['potion', 'a bonus room: 30 seconds, 500 points a block'], 0x11: ['potion', 'a bonus room'], 0x12: ['potion', 'a bonus room'],
    0x13: ['', 'points only'], 0x14: ['umbrella', 'skip three rounds'], 0x15: ['cane', 'a giant food at the end of the round'], 0x16: ['umbrella', 'skip seven rounds'], 0x17: ['cane', 'a giant food at the end of the round'],
    0x18: ['heart', 'enemies frozen, players invincible until the round ends'], 0x19: ['chest', 'a giant food at the end of the round'], 0x1A: ['chest', 'a giant food at the end of the round'], 0x1B: ['chest', 'a giant food at the end of the round'],
    0x1C: ['lamp', 'points only'], 0x1D: ['crystal ball', 'every enemy is beaten at once and falls as food'], 0x1E: ['', 'points only'], 0x1F: ['', 'points only'],
    0x20: ['door', 'the secret room'], 0x21: ['door', 'from round 50 to round 70'], 0x22: ['potion', 'round 100 only: arms the thunder bubbles'] };
  const it = $('bb-items');
  it.innerHTML = '<tr><th>No.</th><th></th><th>Picture</th><th>Effect</th><th>Points</th><th>Routine</th></tr>';
  for (let i = 0; i < 35; i++) {
    const code = ram[0xA965 + i], pts = i < 0x18 ? bcd(code) * 10 : bcd(code) * 1000, r = ram[0x2D65 + i] | ram[0x2D88 + i] << 8;
    const tr = it.insertRow();
    tr.innerHTML = `<td class="bb-num">${C64.hex(i, 2)}</td><td></td><td>${FX[i][0]}</td><td>${FX[i][1]}</td><td class="bb-num">${pts.toLocaleString('en')}</td><td><code>${C64.hex(r)}</code></td>`;
    const cv = document.createElement('canvas'); itemPic(C64.canvas(cv, 32, 32), ram[0xA8C1 + i], ram[0xA913 + i], 0, 0, 2); tr.cells[1].appendChild(cv);
  }
  }
})();
