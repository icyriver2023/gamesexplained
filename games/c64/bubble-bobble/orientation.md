# Bubble Bobble — orientation

How to get from the contributor's own copy to the analysed state. Someone
else must be able to follow this exactly.

## The image

`BUBBLEBO.T64`, 49,023 bytes, SHA-256
`7e9b0d0c95879680fd9117722032775e7341ca988f2ee182c5ef243291f2f859`. The
header says what it is: `C64 tape image file`, a T64 tape archive with the
name field `ASS PRESENTS:` and one entry, `BUBBLE BOBBLE+`, a program of
48,927 bytes that loads at `$0801`-`$C720` and starts with the BASIC line
`1994 SYS2059`.

It is not the original release. It is the crack by Remember ("cracked in
August 2002", release 161 by the C64-Wiki's count), made from the disk
version: one packed file that holds the cracker's intro, the manual text
as pages of documentation, the loading picture, a trainer menu of twelve
options, and the whole game. The `VERSION.NFO` beside it in the
contributor's copy calls it GameBase64 entry 1138, "Cracked/Crunched:
Remember (REM)", twelve trainers, PAL.

Nothing in the file maps onto memory directly: of 3,057 sixteen-byte
pieces of the program, 23 are found anywhere in the hand-over snapshot
and no offset takes more than seven of them. The file is packed
throughout.

| File | Load address | Lands in memory | Part |
|---|---|---|---|
| `BUBBLE BOBBLE+` | `$0801`-`$C720` | nowhere as stored; unpacked in stages to `$0400`-`$FFFF` | the whole game |

## From power-on to play

Emulator: vice-mcp release v3.13.2 (`v3.13.2-macos-arm64-gui.dmg`), x64sc,
PAL, on macOS arm64. `check-emulator` passed 57 of 57 on 6 October 2026;
no workaround applied. The host's default audio output was a virtual
device that never answered, and the emulator's CPU thread waited for it
forever, so VICE's own `SoundDeviceName="dummy"` was set in
`tools/vice-home/config/vice/vicerc`. The SID is emulated all the same.

1. Power-cycle (`reset(rpc, "hard")` in `kit/c64/vice.py`), then
   `autostart(rpc, "work/BUBBLEBO.T64")`. About nine seconds later the
   cracker's intro is up ("REMEMBER proudly presents Bubble Bobble +12",
   a scroller, music), its loop at `$1909`.
2. Tap SPACE. The documentation appears: six pages, SPACE to turn, the
   text of the manual (`features.md` quotes it). RUN/STOP leaves it.
3. The loading picture appears (a multicolour bitmap: the logo, Bub and
   Bob, "by Stephen Ruddy", Software Creations, Firebird), held by a loop
   at `$C8E5`. Tap SPACE.
4. A depacker runs from the stack page (`$0100`-`$01FF`) for about six
   seconds, then the trainer menu appears, twelve rows, all `-N-`, and
   "Starting level ? 001". **Nothing was switched on**: SPACE starts the
   plain game from round 1. The menu's own text also gives the cheat
   the game itself carries: "Hold down the keys [S][U][P][O][R][C=] in
   the Titlescreen for a harder game".
5. The menu's start code at `$54A1` applies the chosen patches (none
   here), writes the starting level minus two to `$F044` (`$FF` for
   level 1, the value already there), blanks colour RAM, copies
   `$4800`-`$4BFF` down to `$0400`-`$07FF` and does `JMP $4460`.
   **`work/entry.vsf` is the machine stopped on `$4460`**, the game's
   first instruction, with `$01` = `$37`.
6. The game's title follows in about four seconds: the logo in large
   characters, the credits, "PRESS FIRE FOR BUBBLE BOBBLE"
   (`work/title.vsf`). Hold **fire on joystick port 2** for half a
   second.
7. The score table appears, "PRESS 1 OR 2 TO PLAY", "CREDITS 10"
   (`work/select.vsf`). Hold the **1** key for half a second.
8. The story screen ("Now, it is the beginning of a fantastic story!
   Let's make a journey to the cave of monsters! Good luck!") runs for
   about five seconds, Bub floats down in a bubble into round 1, "ROUND
   1 READY !!" shows, and play starts about fifteen seconds after the
   key. Stick right for 1.2 s, wait half a second, stop:
   **`work/play-round1.vsf`**, round 1 in play, three Benzos walking, one
   of the three lives already lost.

The listing is built from `work/entry.vsf`, with `work/play-round1.vsf`
as the second image (`listing.py ... --entry`): the start-up code at
`$4080`-`$409F` and `$4460`-`$4625` exists only at the hand-over, since
the game then builds its level character set over it.

## Steady state

Read from `play-round1.vsf` and from one frame recorded with
`kit/c64/frame.py capture` in play (its rebuild matched the emulator's
picture in all 104,448 pixels).

- **Banking**: `$01` = `$25`, so RAM at `$A000`-`$BFFF` and
  `$E000`-`$FFFF`, the chips at `$D000`. The KERNAL is never used;
  `$0314`-`$0319` are zero.
- **Vectors** (RAM at `$FFFA`): NMI `$072D`, reset `$0000`, IRQ `$072E`.
  The interrupt is a chain of two raster handlers that write each
  other's address into `$FFFE`: `$072E` runs near the top of the picture
  (it sets `$D018` at line 51 and hands over at line 52), `$06AB` near
  the bottom (it writes sprite registers at lines 256-261 and hands back
  at line 271). CIA 1's timer A interrupt is enabled as well
  (`$DC0D` mask 1).
- **Video**: VIC bank 1 (`$DD00` low bits `%10`), `$D018` = `$41`: screen
  at `$5000`, characters at `$4000`, multicolour character mode
  (`$D016` = `$D8`), sprite pointers at `$53F8`.
- **Main loop**: during play the program counter was sampled at `$0A5C`
  inside a routine called from `$F0E8` (`JSR $08E4`).
- **Where things are**: the unpacked game fills `$0400`-`$FFFF` almost
  completely; the hand-over image has six runs of zeros of 240 bytes or
  more (`$4210`, `$4C00`, `$55BF`, `$7C40`, `$8480`, `$8DE2`), 4 KB
  together.
- **Nothing is loaded after the hand-over**: the tape archive has one
  file and the game runs with the KERNAL banked out. One load, one part.

Entry and play differ in 6,061 bytes. Besides variables (zero page, the
tables the start-up builds at `$0200`-`$03FF`) the game writes over three
stretches of what it was loaded with: `$4000`-`$47FF` (start-up code and
title characters become the level's character set), `$5000`-`$57FF` (the
screen), and `$8488`-`$8EFF` (a working copy of the screen at `$8B00`;
the hand-over image holds other data there).

## The loader, in a paragraph

The cracker's, not the game's: the original disk's loader is gone. The
one file unpacks itself, plays the intro, shows the manual pages and the
loading picture, unpacks the game from the stack page and shows the
trainer menu, whose code sits at `$5400`-`$55BE` inside the game's own
screen area. The menu had kept the game's `$0400`-`$07FF` at
`$4800`-`$4BFF` while it used the screen, and puts it back before
jumping to `$4460`. Its patch list (`$54AB`-`$5537`) names twenty
addresses in the game with the bytes that make each cheat, which
`cheats.md` takes up. Not annotated further, by policy.
