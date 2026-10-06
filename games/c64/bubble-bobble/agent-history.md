# Bubble Bobble — agent history

Narrative of how the analysis went, including wrong turns, for the next
agent's benefit. This is the only file that narrates; `facts.md` and
`features.md` state current truth only.

## 5-6 October 2026, one session, claude-fable-5-1, kit 0.0.93

**Setting up.** Nothing was installed. Rust went into `tools/` with
rustup's own installer, regenerator2000 was built from crates.io, and the
vice-mcp v3.13.2 macOS release was unpacked by `get-vice download`.

**The emulator started and answered nothing.** `tools.py vice` reported
it up, `check-emulator` hung on its first call, and the log ended at
"Queuing trap dispatch for: initialize". The process used 2 % of a
core. `sample <pid>` showed the emulation thread inside
`AudioComponentInstanceNew`, waiting on CoreAudio: the Mac's default
output was a remote-desktop program's virtual device ("Jump Desktop
Audio") that never answered. Writing `SoundDeviceName="dummy"` under
`[C64SC]` in `tools/vice-home/config/vice/vicerc` and restarting cured
it; `check-emulator` then passed 57 of 57.

**The image.** A T64 with one packed file: Remember's crack. It shows an
intro, six pages of the manual's text, the loading picture, and after a
depack a trainer menu whose start code ends in `JMP $4460`. The menu's
patch list was read before anything else in the game: twenty addresses
with their meanings attached.

**The first play snapshot was taken mid-death.** After pressing 1, the
stick was held right for a second and the machine saved. Bub had walked
into the first enemy. A fire test on that snapshot blew no bubble and a
lives dot had gone. The snapshot was replaced by one taken a fixed
number of frames after the key, with Bub standing still
(`play-r1-start.vsf`), and every later test started from it.

**Reading.** regenerator2000's tracer found 12 KB from the entry point.
A small recursive-descent reader over the snapshot (`work/d.py`) printed
compact listings for reading, and the dispatch tables were seeded as
they turned up: the object draw table at `$040C`, the special objects at
`$0D68`, the actor states at `$1E3C`, the item effects at `$2D65`, the
music commands at `$F240`. A list of every instruction that stores into
another instruction found the patched calls: the pass hook at `$0A38`
(which is how the boss's hit test at `$1134` was found, called from
nowhere), the JMP/BIT switches in the interrupt handlers, the fall
routine's two tails. 22 KB of code in the end.

**Water, fire and thunder were first read the wrong way round.** The
object that falls and then runs along the floor carrying actors was
annotated as lightning, and the falling drop that spreads along a floor
as water, from the shapes of the code. The colours the spawner gives
the three bubbles (cyan, red, green) and the trail's cyan cells put it
right, and the pictures confirmed it later: type 6 is water, 8 fire,
`$0A` thunder. About thirty names and comments were corrected in one
pass.

**The enemies' shots were named before their pictures were drawn.**
"Bottle thrower" was first given to the kind that drops a bolt, and
"rock" to a fireball. Rendering the object pictures from the pointer
tables settled which shot is which.

**Score units.** The first descriptions of the item score tables called
the low score byte hundreds. It counts tens: the screen prints a fixed
zero after the six digits. The secret room's block score, `$12` in the
middle byte, 36 times, gives the 432,000 the C64-Wiki quotes, which was
a good check on the corrected units.

**The title tune.** The compare of hand-over and play showed 1 KB at
`$8B00` changing completely. Decoding the tune table showed tune 7, the
title's, pointing there: the game overwrites it with its screen copy.

**Coverage.** After every symbol had a comment the figure read 99.6 %
of 52 KB. A script over the ledger (`work/untracked.py`) then listed
6 KB that no symbol's span reached: the tails of the layouts, enemy
lists, wall blocks and item pictures, and several tables typed for one
byte only. Labels with their round numbers, generated from the data,
closed it at 58,532 bytes.

**Verification.** A Python decoder of the layouts and air currents,
written from the format, matched the running game's collision map in
nine and ten rounds. The burst scores, the chain bonus, the timer,
EXTEND and round 100 were forced and measured. The first round-100 test
poked `level` one too low and landed on round 99.

**The listing sample was bad twice.** An agent that had written none of
the comments checked 60 drawn at random and found 11 with a wrong
detail, none wrong about what its subject is. Those were fixed, and the
same slips looked for elsewhere, and a second sample of 60 came back
with 10. Sixteen of the 21 were routine descriptions: units (frames,
runs of the actor loop, passes of the main loop), which states a
compare lets through, up for down, once for every time. Fixing by
pattern had not moved the rate, so a fresh agent audited all 367
routine comments not yet checked and rewrote 99. Its report also turned
up a store of the wrong register in the game itself (`$F23C`).

**A pass is three frames, not two.** The pass loop's own wait reads as
two frames. A blown bubble sampled every frame changed every third, and
non-stopping checkpoints then counted 100 passes in 300 frames: the
buffer flip at the top of each pass waits for a frame of its own. The
same trace showed the growth table is indexed by the counter before the
decrement, because the routine's AND works on the value its caller
loaded.

**Two pictures showed nothing.** The first Baron screenshot was taken
60 frames after the Baron's object appeared, during a jingle the game
waits for inside its main loop, so no Baron had been drawn. The first
EXTEND picture was a black frame between two scenes. Both were caught
by looking at the built page, not by any check.

**The page.** The decoders were rewritten in JavaScript inside
`index.html` and compared with the Python ones for all 100 rounds by a
node script in `work/`; a second script compared the drawn screen with
the game's clean copy for rounds 1 and 3, and found that the unpacker
forces the left wall on before the shadows are drawn. No Firefox was
installed, so the page was checked with the Mac's own Chrome, headless,
with its profile in `tools/chrome-profile`.
