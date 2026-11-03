# Moxx Lab

Mockup animations. Each one is a single self-contained HTML page — no build step,
no dependencies, no network requests. Open one in a browser and it runs.

`index.html` is the directory; add a new `<li>` to it when a new animation lands.

Live at **https://sahil639.github.io/Moxx-lab/** — GitHub Pages serves `main` from
the repository root, so every push to `main` redeploys.

## The animations

**`terminal-type.html` — Terminal Type.** A 1080×1920 portrait stage of monospaced
terminal text that types itself in, with a run of scrambled glyphs decoding ahead of
the write head, lines rising into place on a stagger, and scanlines, flicker and
chromatic split over the top. Each of those three layers switches off independently
and carries its own intensities. It exists to try typefaces: drop any `.ttf`, `.otf`,
`.woff` or `.woff2` anywhere on the page and it loads through the `FontFace` API,
joins a list you can click between, and sets both the stage and a specimen strip in
that face — the file is read in the browser and goes nowhere else. The text itself is
editable in the panel.

**`dither-lab.html` — Dither Lab.** Drop an image or a video and it is dithered live
on the GPU in WebGL2 — Bayer 4 or 8, blue-ish noise, or halftone — quantised to
between two and eight tones and mapped onto a three-colour palette, with contrast,
exposure and gamma ahead of the threshold and scanlines, grain, bloom and RGB split
behind it. A lens follows the cursor and sharpens the cell size under it; clicking
pulses it. Six presets set the whole chain at once. Needs WebGL2.

**`line-relief.html` — Line Relief.** A field of evenly spaced lines, each pushed
sideways by the brightness of a dropped image, so the picture is never drawn — it
exists only as deformation in the field. Where brightness ramps steeply the local
spacing collapses and the lines bunch into dense bands; where it ramps the other way
they pull apart and break into dots, which is one duty-cycle control rather than a
separate mode. Layered tileable noise keeps the whole thing from reading as
mechanical, and it drifts on the loop length so the held state is a seamless loop.
The lines bloom out from flat over an adjustable stagger. Angle, line count,
amplitude, response curve, blur and the break-up are all controls; Canvas 2D, so any
image works.

**`glyph-matrix.html` — Glyph Matrix.** A lattice of small marks laid over a
picture, which the picture then drives. The source — a dropped image, or one of four
procedural fields — is sampled once per cell, read as brightness, edges, hue,
saturation or a single channel, and quantised into bands; each band owns a colour and
a glyph, so the image is redrawn in an alphabet of rings, bars, crosses, sparkles,
diamonds or typed characters rather than in pixels. Ordered dithering scatters the
cells across each band edge and histogram equalisation keeps every band in play, which
is what stops it collapsing into two tones. A wave — linear, radial, spiral or noise —
travels through the lattice over time and can drive glyph size, glyph angle or a shift
in the banding, cycling a whole number of times per loop. The lattice takes any cell
size, aspect, rotation, jitter and a square, brick or hexagonal arrangement; glyphs can
take their colour from the palette or from the image itself, over the original at any
opacity in any blend mode. Eight presets. The glyph layer is WebGL2 instancing, so a
hundred thousand cells still runs at sixty frames.

**`prism-core.html` — Prism Core.** A vertically oriented, rounded hexagonal block,
ray-marched in a WebGL2 fragment shader as a translucent volume. Inside it sit
broad drifting orbs of colour, thin translucent layers that tilt and slide through
the block, and small bright motes that rise, all emitting and absorbing light along
each ray, so it reads as softly lit and slightly volumetric rather than painted on.
The edges pull toward a deeper edge colour, with a rim light and a halo outside. Drag
to rotate it (shift-drag rolls, scroll zooms, and it keeps its momentum), or set it
to sway or spin; yaw, pitch and roll also have sliders. The gradient takes up to
eight colours — add, remove, edit, randomise or reverse them — and the orbs, layers
and motes pick their colours from the same list. A shape menu swaps the block for a
hexagonal prism, cube, rectangular prism, cylinder, sphere or pyramid, and a view menu
eases the camera to a soft 3/4, isometric, 3/4 perspective, or orthographic front,
side or top view. Six colour presets. Needs WebGL2.

## Recording

Every page is built to be screen-recorded. **H** clears the panel on any of them.

In Terminal Type, set the canvas (1080×1920 portrait, 4:5, square, landscape or
fill) and zoom to **100%** for a true 1:1 capture; **R** replays, **space** pauses,
and the scrub slider holds any single frame. If 1920 px of height does not fit the
display, record at Fit and scale up in post, or work at 4:5. **Copy settings** puts
the whole state on the clipboard as JSON.

In Dither Lab, Line Relief, Glyph Matrix and Prism Core, **S** saves the current frame as a PNG. Line Relief
takes the same canvas presets and zoom as Terminal Type, and **R** replays its bloom.
