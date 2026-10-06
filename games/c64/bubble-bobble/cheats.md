# Bubble Bobble — cheats

Pokes that change the game within its own parameters. Each one names the
variable it changes and whether it has been tested live. Untested pokes are
labelled as candidates.

The candidates marked "trainer" are the patches of the crack's own menu
(`orientation.md`), read out of its code at `$54AB`-`$5537` and checked
against the routine each one lands in; the menu applies those at
`$0400`-`$07FF` to its copy at `$4800`, so its `$48D8` is the game's
`$04D8`.

| Effect | Poke | Status |
|---|---|---|
| Start at any round | on the score table, `level` `$10` = round - 2 (`$62` for round 100), then press 1 | live: rounds 2, 16, 40, 41, 57, 77, 85, 99 and 100 started this way |
| End the round at once | `round_done` `$21` = 1 in play | live: on round 99 the next pass built round 100 |
| Players cannot be killed | `$156E`, `$1D73`, `$1E27` = `$B9`: the three stores of state `$0E` (in `touch_kills`, `update_actors` and `boss_move`) become loads | live: Bub survived 3,000 frames of round 1 among enemies and the Barons (trainer: "invincibility") |
| All six EXTEND letters | `extend_bits` `$54` = `$3F` (player 2: `$55`) | live: the scene ran, one life more, next round |
| Any special item | `special_item` `$53` = its number, and `item2_x` `$5A`, `item2_y` `$5C` = the player's `actor_x` `$BA` and `actor_y` `$C2` | live: eleven items forced this way in round 1, the door to the secret room among them |
| Lives | `lives` `$045A`, `$045B` (3 at the start) | candidate: read live, not poked |
| Unlimited lives | `$04D8` = `$BD`: the `DEC lives,X` in `check_deaths` becomes a load | candidate (trainer) |
| Unlimited continues | `$0556`, `$0559` = `$AD` and `$055C` = `$A5`: the three decrements in `check_rejoin` (two screen digits and `credits` `$AB`) become loads | candidate (trainer) |
| The Barons never come | `$1621` = `$60`: `barons_appear` returns at once | candidate (trainer) |
| Players half as fast again | `actor_fast` `$8728`, `$8729` = `$FF`, the flag the shoe sets | candidate (the trainer sets it every frame through its own stub at `$3FC3`) |
| Bubbles reload in 3 calls, not 8 | `$7F59` = 3, the value `reset_powers` gives `reload_time` | candidate (trainer) |
| Bubbles fly at double speed | `$7F63` = `$FF`, the value `reset_powers` gives `bubble_speed` | candidate (trainer) |
| Bubbles travel further | `$7F5E` = `$FF` and `$7F54` = `$8C`, the values `reset_powers` gives `bubble_range_flag` and `bubble_travel` | candidate (trainer) |
| Keep the thunder bubbles on round 100 | `weapon_charge` `$37C7`, `$37C8` = `$FF`; `$7F7D` and `$7C3C` = `$BD`, so a death and the potion no longer change it | candidate (trainer) |
| The boss falls to one bolt | `$2C76` = 0 and `$1195` = 0, the hit counts `set_special_item` and `boss_hit_test` load | candidate (trainer) |
| Harder enemies | hold S, U, P, O, R and the Commodore key on the title page until the border turns red (`super_keys` `$45A7`) | live: the border turned red and every kind 0 enemy became kind 1, every kind 6 kind 5 |
