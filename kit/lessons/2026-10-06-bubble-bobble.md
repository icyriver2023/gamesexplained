## next · 6 October 2026 · Bubble Bobble · icyriver2023 with Claude

**A kind is named by its picture.** Bubble Bobble has three special
bubbles, and what each releases is a routine: one falls and runs along
the floor carrying whatever it meets, one drops and spreads into a row
of cells that kill, one flies level. Read as code, the first looked like
lightning and the second like water, and thirty names and comments said
so. The colours the spawner gives the bubbles and the pictures behind
the draw routines said water, fire and thunder, in that order. The same
happened to the enemies' shots, where a bottle and a bolt were given to
each other's owners until the object pictures were rendered from their
pointer table. `50-coverage` now says to follow a kind's draw routine to
its picture and colour before naming it.

**A score table is in the units of the byte it is added to.** The item
scores are one byte each, and the routine that adds one chooses the
score byte by the item's number. Read without that routine the table
gave hundreds where the game gives tens. A figure the documentation
quotes for a whole scene (432,000 for a secret room) checked the
corrected units against 36 blocks of 12,000.

**Authored data can sit in a buffer.** The title page's tune lies in the
kilobyte the game uses as its copy of the screen, so it plays once and
is gone. The compare of hand-over and play showed the region changing;
what it held was found by following the tune table's pointers, not by
looking at the bytes. `10-orient`'s hand-over snapshot and
`50-coverage`'s rule on pointer tables already lead there, and they
did.
