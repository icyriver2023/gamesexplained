# Bubble Bobble — features

Read this before annotating code. What the game is documented to do, with
verification status against the binary. Statuses: **open** (documented,
not found yet), **traced** (in the code, could not be exercised; say what
was tried), **confirmed** (in the code, consistent with the emulator),
**live** (observed directly), **differs** (the code does something else).
"Absent" is not a status.

Sources:

- The manual's text as typed into the documentation pages of the
  contributor's copy (Remember's crack, "documents supplied and typed by
  Jack Alien"), read off the screen on 5 October 2026. Quoted below as
  "manual". It is a transcription, not a scan.
- C64-Wiki, https://www.c64-wiki.com/wiki/Bubble_Bobble, read 5 October
  2026. Quoted as "wiki".
- Wikipedia, https://en.wikipedia.org/wiki/Bubble_Bobble_(video_game),
  read 5 October 2026, for the arcade game's rules and the C64 version's
  reception (97 % and a Gold Medal in Zzap!64).
- The trainer menu of the same crack, read 5 October 2026: twelve
  options, each a claim about an address in the game (`cheats.md`).
- The game's own strings (`facts.md`, "Text").

Lemon64 through the Wayback Machine and StrategyWiki refused the fetch
(5 October 2026). No scan of the printed manual was found.

## Features

| Feature | Status | Where |
|---|---|---|
| One or two players at once; player 1 on port 2, player 2 on port 1 (manual) | live | `update_actors` `$1CBD` reads `$DC00` for player 1 and `$DC01` for player 2; port 2 drove Bub in every test |
| Left and right walk, up jumps, fire blows a bubble (manual) | live | `player_ground_input` `$220C`; from the round-start snapshot, fire made a bubble and up a 43-pixel jump |
| "Press 1 or 2 to play" on the score table | live | `title_loop` `$F04A` |
| A second player can join at any time with fire, while credits last (manual) | traced | `check_rejoin` `$052A`; not exercised with a second stick |
| "You start the game with an extra 9 credits" (manual) | differs | `play_game` `$08E4`: eight continues with one player, seven with two; the panel shows one more than are left (9 at the start of a one-player game, seen live). A continue gives three lives and a score of zero |
| Three lives | live | `lives` `$045A` set to 3 at `$0956`; three dots on the panel |
| Blow bubbles, box up bullies, burst them (manual) | live | `blow_animation` `$2301`, `catch_enemy` `$105B`, `draw_burst` `$3D2D` |
| Normal bubble 10 points; fire, thunder and water bubbles 100 (manual) | live | `draw_burst` `$3D2D`: bursting a forced bubble of each kind scored exactly these |
| "Boxed-up Bully 500 pts" (manual) | differs | bursting one held enemy scores 1,000 (`chain_bonus` `$AB52`, seen live); the 500 is the food a single enemy then leaves |
| Food left by beaten enemies: banana 500, apple 1,000, garlic 2,000, melon 4,000, grape 8,000, pineapple 16,000, diamond 32,000 (manual) | differs | `food_scores` `$A79A`: 500, 1,000, 2,000, 3,000, 4,000, 5,000, 8,000 and 9,000 for the first to eighth enemy of one chain; the chain bonus itself is 1, 2, 4, 8, 10, 20 thousand (`chain_bonus`) |
| "It's best to destroy several enemies at the same time" (manual) | confirmed | `draw_burst` bursts every bubble within 24 pixels and counts the enemies; first enemy of a chain seen live |
| Water, fire and thunder bubbles; what they release flows the way the player faces (manual) | confirmed | `special_bubble_kind` `$0CC1`; water becomes a stream that runs down and along floors and carries enemies off (`step_water` `$1B40`), fire a flame that drops and burns along the floor (`fire_drop` `$11B7`, `run_fires` `$1319`), thunder a bolt that flies level, away from the side the player faces (`thunder_shot` `$10D6`). Each release seen live from a forced bubble; only thunder depends on facing |
| "You can even bounce on the bubbles (by keeping the joystick pushed up)" (manual) | traced | `player_control` `$2162`, the loop at `$217A`; not exercised |
| EXTEND letters; all six give an extra life and skip the round (manual, wiki) | live | letters in `extend_bits` `$54`; `check_extend` `$32C1`: with all six bits set the scene ran, lives went from 3 to 4 and the round from 1 to 2 |
| Letters "appear when destroying several enemies at the same time" (manual) | differs | letter bubbles come out of the vents in rounds the level data allows, at random (`spawn_kind_switch` `$0C9C`, `item_pos_c` bit 0); nothing links them to chains |
| Points items ("timing targets") are better after a quick clear (manual) | confirmed | `round_cleared` `$16F7` sets `points_rank` from the seconds left; `place_items` `$2B31` |
| Jewels 5,000 to jewelled crown 10,000 (manual) | confirmed | `points_item_scores` `$A936`: 47 items from 10 points to 12,000; the names are the manual's, the code has none |
| Magic items: candy "bubble up", shoe "speed up", bomb, potion "chance", cross "lucky", string of pearls "1 up!?" (manual) | confirmed | 35 special items, `item_effect_lo/hi` `$2D65`; see `facts.md`, "Special items". No effect gives a life directly, and no bomb picture was identified |
| Shoe: walk faster (manual, wiki) | live | `effect_shoes` `$7FF1` sets the fast flag; the trainer's "fast movement" sets the same flag |
| Clock (wiki: "the time until the Baron appears is extended") | differs | `effect_clock` `$2F68` freezes the enemies and stops the round timer for `$87` passes (seen live) |
| Umbrella skips 3 or 7 rounds (wiki) | live | `effect_skip_3` `$7FA4`, `effect_skip_7` `$7FA7`; the first, forced in round 1, led to round 4 |
| Crosses: yellow gives fireballs, blue turns monsters to jewels, flashing destroys them (wiki) | differs | by the colours in `special_item_colours`: the red cross gives 19 fireballs (`effect_fire_breath` `$A64D`), the yellow one a flash and a falling block that kills what it passes (`effect_sky_flash` `$A653`), the cyan one a flood that kills every enemy (`effect_flood` `$2DD7`) |
| Baron von Blubba appears if you take too long, and cannot be beaten (manual) | live | `round_timers` `$1578`, `barons_appear` `$1621`, `baron_move` `$1473`: HURRY UP after 30 seconds, a Baron for each player 10 seconds later; nothing in the code can remove one except its player dying or the round ending |
| Enemies turn angry and faster after "hurry up" or on escaping a bubble (Wikipedia) | confirmed | `enemies_angry` `$16E4`, `age_objects` `$13BE` |
| 100 rounds (manual, wiki) | confirmed | every per-round table has 100 entries; nine rounds rebuilt from the data match the running game (`facts.md`, "Live tests") |
| A boss on round 100, beaten with thunder bubbles from a potion (wiki) | traced | `boss_round_setup` `$7F86`, `boss_hit_test` `$1134`, `boss_move` `$1D84`. The round and its nine-sprite boss were seen; the fight was not played |
| "About 1,000,000 points" for round 100 (wiki) | live | `ending` `$A5B7` adds 1,000,000; forced live, the score went from 0 to 1,000,000 |
| Secret doors at rounds 20, 30, 40, 80 and 90 if no life is lost; a room worth 432,000 points (wiki) | confirmed | `place_items` `$2B31`, `effect_secret_room` `$3621`: 36 blocks at 12,000 each (432,000, the wiki's figure). The door rounds follow from `next_door_level`. The room itself was seen live by forcing the door item in round 1 (`reference/secret-room.png`); no door was reached by play |
| The door of round 50 leads to round 70 (wiki) | traced | `effect_skip_to_70` `$7C37` |
| Super mode: hold S, U, P, O, R and the Commodore key on the title until the border flashes red (wiki, trainer menu) | live | `super_keys` `$45A7` in `start`: with the six keys held the border went red and the enemy lists were rewritten in memory, all 114 of kind 0 to kind 1 and all 72 of kind 6 to kind 5 |
| Space switches between one and two players (wiki) | open | no test of the space key (row 7, column 4) was found: every read of `$DC01` in the listing was checked (`read_keys` `$7EB6`, `title_loop`, `start`). Joining is by fire (`check_rejoin`) |
| RUN/STOP pauses, Q quits (crack's documentation) | confirmed | `check_pause` `$7E80`, `check_quit` `$7EC1` |
| The C64 ending is the arcade's bad ending (wiki) | confirmed | `ending` `$A5B7` prints CONGRATULATIONS / YOU HAVE COMPLETED BUBBLE BOBBLE / ! WHAT HEROES ! whether one or two played |

## Beyond the documentation

Found in the code, not in the manual.

- **The title page plays once.** Its code (`start`, `$4460`), its
  lettering and its tune (`title_tune`, `$8B00`) sit in memory the game
  reuses for level graphics and for its copy of the screen. After the
  first game only the score table is ever shown.
- **Bubbles are characters, not sprites.** `render_object` (`$E7CF`)
  draws up to eighteen 24-pixel objects into freshly made glyphs every
  pass, in two screen buffers with a character set each, flipped by the
  raster interrupt.
- **Food rounds.** On rounds 1, 5, 10, 16, 23 and so on
  (`next_food_round`, `$59BF`), every full-size plain bubble left when
  the round is cleared turns into falling food worth 700 points.
- **Round 85 spells KIMI** in its platforms (seen live, `reference/round-85.png`).
- **A layout is a bitmap, and more than half are stored as halves.**
  `unpack_layout` (`$E299`): 55 of the 100 rounds keep only their left
  side.
- **The last 4 KB of layouts lie under the I/O chips**, read with the
  chips switched out.
- **Fifteen variables live in the 64th byte of sprites** (`skip_target`
  `$587F` to `current_tune` `$5C3F`), and eight actor arrays in the unused right
  edge of the collision map.

## Open questions

- Which arcade or manual name belongs to which enemy kind. The game
  stores no names. By their pictures and behaviour (`facts.md`,
  "Enemies") the eight kinds resemble the eight of the arcade game, but
  the manual's list has six names and no pictures.
- Whether the space key does anything (above).
- What draws characters `$40` and `$41` of the loaded character set.
- The sweep and vibrato fields of an instrument are named from how
  `voice_frame` uses them; no tune was compared against a recording of
  the SID.
- The giant food (state `$15`) is described from the code alone. The two
  six-sprite shows (`$13`, `$14`) were triggered live, but only their
  result was recorded, not their look.
