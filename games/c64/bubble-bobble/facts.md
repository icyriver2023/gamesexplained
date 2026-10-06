# Bubble Bobble — facts

Current truth about this game, each fact with the routine or table it
comes from. Names are those of `symbols.json`. The image is the hand-over
snapshot described in `orientation.md`: Remember's crack with every
trainer option off.

## Memory layout

| Range | Contents |
|---|---|
| `$0002`-`$00FF` | variables: `level` `$10`, `frame_count` `$08`, the actor arrays at `$B2`, `$BA`, `$C2`, the object arrays at `$CA`, `$DC`, `$EE` |
| `$0100`-`$01FF` | stack, and object arrays in its lower half (`object_col_now` `$014B` and four more) |
| `$0200`-`$03FF` | `times8_lo/hi`, built by `start` |
| `$0400`-`$045B` | scores, top score, lives, `object_draw_table` |
| `$045C`-`$3FE5` | code: lives and continues, interrupts, the pass loop, bubbles, actors, items, bonus scenes, the round set-up |
| `$4000`-`$47FF` | character set 1; as loaded also `start` (`$4460`) and the title page's text |
| `$4800`-`$4FFF` | character set 2, built at run time |
| `$5000`-`$57FF` | the two screen buffers |
| `$5800`-`$703F` | sprites `$60`-`$C0`: the players and the eight enemy kinds |
| `$7040`-`$7304` | music patterns |
| `$7305`-`$743F` | the music commands' code and voice tables |
| `$7440`-`$7ABF` | sprites `$D1`-`$EA`: the floating bubble and the boss |
| `$7AC0`-`$7FFF` | code, text, run-time sprite buffers |
| `$8000`-`$8487` | bubble pictures and masks |
| `$8488`-`$897F` | collision map and actor arrays (run time) |
| `$8980`-`$8AFF` | pop pictures |
| `$8B00`-`$8EFF` | as loaded the title tune; then the clean copy of the screen |
| `$8F00`-`$9ADF` | object pictures: the Baron, the special bubbles, the letters, shots |
| `$9AE0`-`$A31F` | 58 item pictures and the falling block |
| `$A320`-`$A65F` | giant food sprites, code, tables |
| `$A660`-`$AE50` | tables, strings and object variables |
| `$AE51`-`$B568` | `enemy_lists` |
| `$B569`-`$B694` | `item_pos_a/b/c` |
| `$B695`-`$BB0D` | `air_current_data` |
| `$BB0E`-`$C5F1` | `wall_blocks`, `level_tiles`, `level_gaps` |
| `$C5F2`-`$DFFF` | `level_layouts`, the last 4 KB under the I/O area |
| `$E000`-`$F921` | code: the round builder, printing, the bubble renderer, enemy AI, the title, the music driver |
| `$F922`-`$FE8E` | tunes, sound effects, instruments |
| `$FE8F`-`$FFF9` | `small_digits`, `level_colours`, `level_pattern` |

The ROMs are switched out for the whole game (`$01` = `$35`). Only
`unpack_layout` changes it, to `$30`, to read the layouts.

## Video

- VIC bank 1, multicolour character mode, 40 columns by 25 rows. The
  playfield is columns 0-31, the panel columns 32-39.
- Two screen buffers and two character sets: `$5000` with `$4000`
  (`$D018` = `$40`) and `$5400` with `$4800` (`$52`). Each pass draws
  into the hidden pair and `irq_top` shows it (`flip_buffers` `$1844`).
- Bubbles and every other object except actors are characters.
  `draw_objects` (`$E90E`) gives each of the 18 objects up to nine fresh
  glyphs from character `$5E` up, and `render_object` (`$E7CF`) writes
  each as the glyph under it ANDed with a mask and ORed with the
  picture. `repair_back_buffer` (`$1853`) puts back the cells an object
  covered two passes earlier from the clean copy at `$8B00`.
- Eight sprites, no multiplexing in ordinary rounds: sprites 0 and 1 are
  the players, 2-7 the six enemies (`actors_to_sprites` `$1805`). The
  boss is nine sprites drawn with six: `irq_boss_lower` (`$0795`) moves
  three of them down 42 lines for its bottom row.
- Collisions are worked out from coordinates. The VIC's collision
  registers are never read.

## Timing

Measured and read on PAL.

- Two raster interrupts a frame, `irq_bottom` at line 251 and `irq_top`
  at line 50 (`$32`). No CIA interrupt: `start` clears CIA 1's mask.
- `frame_count` (`$08`) counts frames. A pass of the main loop
  (`pass_loop`, `$0A07`) lasts until two frames have gone by, so the
  bubbles and the timers in the loop run 25 times a second.
- The actors' logic, `update_actors` (`$1CBD`), runs inside `irq_top` on
  every other frame, also 25 times a second, independently of the pass
  loop. An actor with its fast flag set gets a second call on alternate
  runs, which makes it half as fast again.
- `round_timer` (`$2A`) loses one every 50 frames (`irq_bottom`).

## A round

Built by `build_round` (`$E000`), `build_air_currents` (`$E189`),
`scroll_in_round` (`$37C9`) and `start_round` (`$392A`).

- `level_layouts`: one bit per cell, 23 rows of 32. 45 rounds store 92
  bytes; 55 store 46, the left half, and are mirrored
  (`level_pattern` bit 7). 6,670 bytes in all, ending at `$DFFF`.
- `level_gaps`: bits 0 and 1 open the top row at columns 9-12 and
  19-22, bits 2 and 3 the bottom row; bits 4-5 and 6-7 are the air
  current of the top and the bottom row.
- `level_tiles`: the round's one wall glyph. `wall_blocks`: 59 two by
  two blocks for the side walls. `level_colours`: its two multicolours.
- `air_current_data`: per round a list of rectangles, each with one of
  four directions; a plain bubble drifts the way the cell under it says
  (`move_bubbles` `$0CF2`). Rounds 2, 36 and 48 reuse round 1's currents
  and round 52 round 50's.
- `enemy_lists`: 572 enemies in 100 lists of at most six. Round 100's
  list is empty.
- The round timer starts at 30 seconds; 10 on round 56 and 20 from
  round 57 (`start_round`).
- `item_pos_c` bit 0: 70 rounds have vents that release special
  bubbles; bits 1-3 allow water (14 rounds), fire (21) and thunder (8).
  In such a round a coin is tossed at set-up: heads, the first one to
  four vent bubbles are EXTEND letters instead.

## Objects

Eighteen slots (`object_type` `$CA`). The type is an even number:

| Type | What | Moved by | Drawn by |
|---|---|---|---|
| `$00`-`$04` | plain bubble: small, medium, full | `move_bubbles` | `draw_bubble` |
| `$06`, `$08`, `$0A` | water, fire, thunder bubble | `move_bubbles` | `draw_bubble` |
| `$0C`-`$14` | letter bubbles E, X, T, N, D | `move_bubbles` | `draw_bubble` |
| `$16` | bubble just blown | `blown_step` | `draw_blown_first` |
| `$18`-`$22` | bubble holding enemy 0-5 | `move_bubbles` | `draw_carrier` (the enemy's sprite) |
| `$24` | falling flame | `fire_drop` | `draw_flame` |
| `$26` | thunder bolt | `thunder_shot` | `draw_shot` |
| `$28` | enemy's fireball | `enemy_fireball` | `draw_fireball` |
| `$2A` | boulder | `boulder_shot` | `draw_boulder` |
| `$2C` | returning bottle | `bottle_shot` | `draw_bottle` |
| `$2E`, `$30` | the Barons | `baron_move` | `draw_baron` |
| `$32` | falling bolt | `bolt_fall` | `draw_bolt` |
| `$34` | bubble burst by a player | | `draw_burst` (scores, chain, release) |
| `$36`, `$38` | ending | | `draw_free`, `draw_gone` |
| `$3A`-`$40` | pop animation | | `draw_pop_start` and three more |
| `$42` | an enemy's shot being readied | | nothing |
| `$44` | player's fireball | `fireball` | `draw_fireball` |
| `$46` | giant falling block | `giant_fall_step` | `draw_giant_block` |
| `$4A` | ended by a scene change | | nothing |
| `$4C` | falling food | `food_fall` | `draw_falling_food` |

The letter E bubble gives the first E, or the second when the first is
held (`draw_burst`).

A bubble a player blows travels `bubble_travel` steps of 8 pixels
(`blown_step` `$0F61`), growing through three sizes, and catches the
first ordinary enemy within 16 pixels (`catch_enemy` `$105B`). A held
enemy escapes angry when the bubble's life runs out (`age_objects`
`$13BE`).

## Actors

Eight actors, players 0-1 and enemies 2-7, with a state each
(`actor_state` `$B2`) and a handler per state (`actor_state_table`
`$1E3C`).

| State | Handler |
|---|---|
| 1 | `player_control` |
| 2-9 | the eight enemy kinds |
| `$0A` | `enemy_released` |
| `$0B`, `$0C` | `enemy_thrown`, `fall_to_floor`: a beaten enemy |
| `$0D` | `carried_by_water` |
| `$0E`, `$0F` | `player_dying`, dead |
| `$10` | `player_reappear`, flashing and safe |
| `$11`, `$12` | `enemy_to_food`, `food_wait` |
| `$13`-`$15` | bonus sprites and the giant food |
| `$16`, `$17` | frozen enemy falling, lying |
| `$18` | `player_invincible` |

### Enemies

The level data stores a kind 0-7; the state is the kind plus 2. The
game has no names for them. Pictures are in `reference/`; counts are of
all 100 lists.

| Stored kind | State | Picture | Behaviour | First round | Count |
|---|---|---|---|---|---|
| 0 | 2 | white wind-up robot | walks, climbs towards its player (`enemy_walker`) | 1 | 114 |
| 1 | 3 | grey spiky creature | walker that shoots a fireball along its row (`enemy_shooter`) | 40 | 62 |
| 2 | 4 | green head on a spring | moves only by hopping (`enemy_hopper`) | 30 | 48 |
| 3 | 5 | pale green flyer | flies diagonally, one pixel a call (`enemy_flyer`) | 20 | 78 |
| 4 | 6 | purple whale shape | flies diagonally, two pixels a call (`enemy_flyer_fast`) | 10 | 75 |
| 5 | 7 | green cloak, red face | walker that throws a bottle that comes back | 50 | 62 |
| 6 | 8 | white robed figure | walker that rolls a slow boulder | 6 | 72 |
| 7 | 9 | white robot on legs | walks and drops a bolt straight down (`enemy_dropper`) | 60 | 61 |

Holding S, U, P, O, R and the Commodore key on the title page
(`super_keys` `$45A7`) rewrites the lists: kind 0 becomes 1 and kind 6
becomes 5.

The boss of round 100 (`boss_move` `$1D84`, `boss_hit_test` `$1134`)
bounces round the playfield. Fifty thunder bolts put it in its beaten
frame for `$82` passes; a player who touches it then ends the game, and
if nobody does it recovers with 40 hits and moves twice as fast.

## Scoring

A score is three packed-decimal bytes shown with a fixed 0 after them
(`print_score` `$E3D9`), so the low byte counts tens, the middle byte
thousands and the top byte hundreds of thousands (`add_score` `$7C26`).

| Event | Points | Where |
|---|---|---|
| burst a plain or letter bubble | 10 | `draw_burst` |
| burst a water, fire or thunder bubble | 100 | `draw_burst` |
| burst 1, 2, 3, 4, 5, 6 held enemies in one chain | 1,000, 2,000, 4,000, 8,000, 10,000, 20,000 | `chain_bonus` |
| food left by the 1st to 8th enemy of a chain | 500, 1,000, 2,000, 3,000, 4,000, 5,000, 8,000, 9,000 | `food_scores` |
| points item | 10 to 12,000 by item | `points_item_scores` |
| special item | 10 to 8,000 by item | `special_item_scores` |
| falling food of a food round | 700 | `food_fall` |
| a block in a bonus room | 500 | `bonus_block_score` |
| every block of a bonus room taken | 100,000, or 50,000 to the player with fewer | `bonus_room` |
| a block in the secret room | 12,000 (36 can be taken: 432,000) | `effect_secret_room` |
| jumping, walking, blowing with a ring | 10 each time | `score_ten` |
| round 100 | 1,000,000 | `ending` |

Extra lives at 30,000, 100,000, 400,000, 1,000,000 and each further
million up to 9,000,000 (`check_extra_life` `$F1AC`,
`extra_life_scores`).

## Special items

One appears each round, 1 to 16 seconds in (`place_items` `$2B31`).
Numbers are the game's; names describe the pictures.

| No. | Picture | Effect |
|---|---|---|
| `$00` | shoe | the player moves half as fast again (`effect_shoes`) |
| `$01`, `$02`, `$15`, `$17` | canes | a giant food at the end of the round |
| `$03` | sweet | bubbles reload in 3 calls instead of 8 |
| `$04` | sweet | bubbles travel further |
| `$05` | sweet | bubbles fly at double speed |
| `$06` | red cross | 19 fireballs instead of bubbles |
| `$07` | yellow cross | a flash, then a block that falls across the screen killing enemies |
| `$08` | cyan cross | a flood that kills every enemy |
| `$09` | red lamp | all three bubble powers and all three rings |
| `$0A` | yellow lamp | all three bubble powers |
| `$0B` | purple lamp | every enemy is beaten at once: the six sprites gather into a flashing picture (state `$13`), then fall as food |
| `$0C`-`$0E` | rings | 10 points for every jump, step or bubble |
| `$0F` | clock | enemies frozen and the timer stopped for `$87` passes |
| `$10`-`$12` | potions | a bonus room: up to 85 foods, 30 seconds |
| `$13`, `$1C`, `$1E`, `$1F` | four more pictures | points only |
| `$14`, `$16` | umbrellas | skip 3 rounds, skip 7 |
| `$18` | heart | enemies frozen where they stand, players invincible until the round ends |
| `$19`-`$1B` | chests | a giant food at the end of the round |
| `$1D` | crystal ball | every enemy is beaten at once, behind a flashing formation (state `$14`) |
| `$20` | door | the secret room |
| `$21` | door | from round 50 to round 70 |
| `$22` | potion | round 100 only: arms the thunder bubbles |

Doors replace the round's item after rounds 19, 29, 39, 49 (the `$21`
door), 79 and 89, as long as one player has not lost a life
(`doors_possible` `$5B7F`).

## Sound

- A three-voice driver stepped once a frame from `irq_bottom`
  (`music_frame` `$F53C`). Twelve tunes (`tune_table` `$F922`), six
  sound effects on voice 1 (`sfx_records` `$F976`).
- Music data is events: a note 0-`$5E` or a rest, then a length index;
  or a command `$80`-`$9C` (`music_command_table` `$F240`): repeats,
  pattern calls and returns, transposition, instruments, arpeggios,
  filter routing.
- An instrument is 29 bytes: a four-step frequency modulation, a pulse
  sweep, pulse width, waveform, envelope, gate and release times
  (`instrument_v1` `$F2AE`).
- The title tune (tune 7) lies at `$8B00`-`$8DE1`, which the first game
  overwrites.

## Text

Strings are printed by `print_string` (`$E42A`): a byte below `$10` sets
the colour, `$10` ends the string, `$1F` is followed by a column and a
row, anything else is a character code plus `$20`. With the game's
character set (digits at 0-9, letters at `$21`-`$3A`) text reads as
ASCII with `@` for a space.

| Address | Text |
|---|---|
| `$462D` | the title page: the logo's characters, WRITTEN BY STEPHEN RUDDY. GRAPHICS BY ANDREW THRELFALL. COMMODORE CONVERSION BY SOFTWARE CREATIONS PRODUCED BY FIREBIRD. LICENSED BY FIREBIRD FROM TAITO ELECTRONICS. ! PRESS FIRE FOR BUBBLE BOBBLE ! |
| `$F0EE` | ! BUBBLE BOBBLE ! COMMODORE CONVERSION BY SOFTWARE CREATIONS SCORE ROUND TOP WRITTEN BY STEPHEN RUDDY CREDITS 10 ! PRESS 1 OR 2 TO PLAY ! |
| `$AC41` | NOW, IT IS THE BEGINNING OF A FANTASTIC STORY! LET'S MAKE A JOURNEY TO THE CAVE OF MONSTERS! ! GOOD LUCK ! |
| `$1773` | CONGRATULATIONS YOU HAVE COMPLETED BUBBLE BOBBLE ! WHAT HEROES ! |
| `$A7C8` | BONUS 500X 500X, PERFECT 100000 |
| `$A7F8` | PLAYER 1 GETS |
| `$A73B` | GAME OVER |
| `$AB93` | the panel: 1UP 2UP TOP |
| `$7B96` | CREDITS |
| `$47CD` | GAME  OVER, ALL |

No build date or version string was found in a sweep of the image as
this code, as screen codes and as PETSCII.

## Hardware registers

| Register | Use | Routine |
|---|---|---|
| `$D000`-`$D010` | sprite positions | `actors_to_sprites`, `place_boss`, `intro_step`, `irq_boss_lower` |
| `$D011`, `$D016` | 25 rows, multicolour, set once | `start` |
| `$D012`, `$D019`, `$D01A` | the raster interrupt chain | `irq_exit`, `start` |
| `$D015` | sprite enable; bits flicker a held enemy before it escapes | `age_objects`, `boss_hit_test` and nine more |
| `$D017`, `$D01D` | sprite expansion, for one bonus only | `giant_flash` |
| `$D018` | the buffer flip | `irq_top` |
| `$D01B`, `$D01C` | priority, all sprites multicolour, set once | `start` |
| `$D01E`, `$D01F` | never touched | |
| `$D020`, `$D021` | black; flashed by five effects; red for the super-mode keys | `clear_screens`, `sky_flash`, `skip_rounds`, `enemies_to_bonus`, `super_keys` |
| `$D022`, `$D023` | the round's two wall colours | `irq_bottom`, `irq_top` |
| `$D025`, `$D026` | sprite multicolours 2 and 1, set once | `start` |
| `$D027`-`$D02E` | sprite colours | `actors_to_sprites`, `place_boss`, `intro_step` |
| `$D400`-`$D406`, `+7`, `+14` | the three voices | `voice_note`, `voice_frame`, `start_sfx`, `silence` |
| `$D415`-`$D418` | filter cutoff, routing, volume `$1F` | `filter_restart`, music commands, `silence` |
| `$DC00`, `$DC01` | joysticks and keyboard | `update_actors`, `check_rejoin`, `read_keys`, `start` |
| `$DC04`, `$DC06` | read only, to seed and stir the random numbers | `start`, `random` |
| `$DC0D` | interrupts off | `start` |
| `$DD00` | video bank 1 | `start` |

## What the cracker changed

Seen in the image; the original disk was not available to compare.

- `$3FB0`-`$3FE5`, three short routines in free space after the game's
  code. Two serve the trainer (`trainer_key_hook`, `trainer_boss_hook`)
  and are called from `read_keys` (`$7EBB`) and from the end of
  `boss_round_setup` (`$7FA1`), where the game's own instruction must
  have stood. The third, `print_score_digit`, may be either's.
- `$F044` is written by the menu with the starting round.
- `$4800`-`$4BFF` and `$5000`-`$55BE` held the menu and its stash at the
  hand-over.

## Live tests

All in VICE x64sc (vice-mcp v3.13.2), PAL, from snapshots made by the
recipe in `orientation.md`, stepped by frames.

- **Layouts and enemy lists.** A decoder written from the format above
  rebuilt rounds 1, 2, 16, 40, 41, 57, 77, 85 and 99 from the data. Each
  was compared with the running game after poking `level` on the score
  table: the 800 cells of the collision map matched in every round
  (round 40's layout crosses `$D000`), and so did the kinds of the
  enemies.
- **Burst scores.** An object forced to type `$34` over a plain, water,
  fire, thunder and letter bubble scored 10, 100, 100, 100 and 10; the
  water one started the stream, the fire one a flame and then a fire
  run, the thunder one a bolt, and the letter set bit 0 of
  `extend_bits`.
- **Chain bonus and food.** A burst bubble holding enemy 0 scored 1,000,
  took one from `enemies_left`, threw the enemy (state `$0B`) and left
  food of rank 1.
- **Timer.** With the players made safe, `hurry_stage` became 1 1,500
  frames after play began and the Barons appeared 500 frames later.
- **EXTEND.** `extend_bits` set to `$3F`: the scene ran, lives went
  from 3 to 4 and the round from 1 to 2.
- **Round 100.** Reached by poking `level`: `boss_hits` was 50, the pass
  hook pointed at `boss_hit_test`, the two items were `$22` and `$51`,
  and the boss moved one pixel a frame on each axis, turning at the
  walls. With its frame forced to 9 and the player put on it, `level`
  became `$64`, the score went from 0 to 1,000,000 and the ending
  appeared with tune `$51`.
- **Controls.** From the round-start snapshot, fire made a bubble and up
  a jump that rose 43 pixels.
- **One frame.** `kit/c64/frame.py capture` in play: eight register
  writes, and the frame rebuilt from memory matched the emulator's
  picture in all 104,448 pixels.

- **Super mode.** On the title page, with S, U, P, O, R and the
  Commodore key held through the keyboard matrix, the border showed red
  and the 100 enemy lists read back from the machine had no kind 0 and
  no kind 6 left: 176 of kind 1 and 134 of kind 5, where the loaded
  image has 62 and 62.

- **Special items.** With `special_item` set and the item's position put
  on the player in round 1: the shoe set the fast flag, the red cross
  gave 19 fireballs, the yellow cross killed two of the three enemies
  with its falling block, the cyan cross flooded the playfield and
  killed all three, the clock set the freeze timer and inverted the wall
  colours, the heart froze the enemies and put the player in state
  `$18`, the umbrella `$14` took the game from round 1 to round 4, a
  potion opened a bonus room, the purple lamp and the crystal ball left
  every enemy as food, and the door `$20` opened the secret room with 37
  blocks counted.

Not tested live: the giant foods, a second player, and the boss fight
played through (its beaten state was forced).
