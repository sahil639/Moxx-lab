# Moxx Lab

Mockup animations. Each one is a single self-contained HTML page — no build step,
no dependencies. Open one in a browser and it runs. The only network request is the
IBM Plex Mono brand font from Google Fonts; every page falls back to the system
monospace if it cannot load.

`index.html` is the directory; add a new card to its grid when a new animation lands.
`logo.svg` is the Moxx Lab mark (white on transparent) and `favicon.svg` the same on black;
every page uses them for the tab icon, the panel header and the back link.

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
side or top view. Up to twelve shapes can be placed at once — a single centred shape,
a row, a grid, a hexagonal cluster (three shapes form a triangle), a radial ring, or a
seeded random scatter inside an adjustable area — each with its own drifting interior.
Width, height and depth stretch the shape independently, and everything is kept in frame
automatically unless that is switched off. The ground can be a solid colour or a linear
or radial gradient; the glow behind the shapes can be switched off, sized and dimmed,
turns into a soft shadow on light grounds, and a contrast guard outlines the silhouettes
and reports the shape-to-ground contrast ratio. Seven colour presets. Needs WebGL2.

**`compass-mark.html` — Compass Mark.** A parametric logo builder: equal circles
(lobes) set around a ring, a fillet circle rolled into each notch, a centre hole, and
thin "spiral channels" cut as the sliver between a big circle and a slightly smaller,
offset one. The construction circles stay visible over the mark. Six presets, saved
versions (kept in this browser's localStorage), a preview strip at 16–96 px, drag to
turn, scroll to zoom, four preview views (build, icon sizes, app icon, 24 px grid), and export as PNG, transparent mark PNG or SVG. Canvas 2D only;
the outline is one SVG arc path, so canvas and SVG export share the same geometry.
**R** replays the build-in of the construction, **space** pauses, **S** saves a PNG.

**`brand-engine.html` — Brand Engine.** A seeded generative brand system: one integer seed
and one fixed palette produce every visual for a brand, and the same seed always gives the
same output (a seeded PRNG throughout, never `Math.random`). The whole state is mirrored in
the URL hash, so any output is a link. It is self-contained and does not load `ui.css` /
`ui.js`, though it follows the site's saved light / dark choice.

- **Shell.** A pill nav (Scene · Sheet · Layout · Logo · Kit), a left rail of scene
  thumbnails that re-render live, a right panel with seed, reroll, ground swatches and
  formats (1:1, 4:5, 9:16, 16:9, 3:2), and an export footer: PNG at 1×/2×/4×, SVG, copy to
  clipboard and WebM video with an optional lockup intro.
- **Scene.** *Hero Diagram* — workspaces (✕), bonded pairs of people (dumbbells), agent
  squads (dot clusters), artifacts (four-point stars, `ARTIFACT#n`) and pipes (hairlines) in
  Ring, Tree, Mirror or Loose layouts, complexity 1–5, flat or on a tilted 2.5D plane.
  *Mosaic* — the same graph with the workspace pasted up from checker and stripe tiles.
  *Rewrite* — an animated chat where people type and the agent rewrites a big brand line in
  a glyph scramble, from an editable script (`name: text`, `name (mo's agent): text`,
  `> New line`). *Avatar* — a dot-matrix H-shaped head and two eyes in exactly three
  colours; the seed is the identity.
- **Layout.** Split, Blob, Bleed, Poster and Manifesto: brand copy fitted by measuring, a
  dimmed second line, shuffle, type size, lockup, scene picker and page colour. A `-` typed
  between two letters marks where a word may break.
- **Logo.** The mark, the wordmark and a coloured shape (Auto, Circle, Pill, Two, Many)
  holding a sub-brand name; the type stays one size and the shape grows. SVG exports the
  logo alone from the same display list the canvas draws (names are live `<text>`).
- **Sheet.** The current scene across 12–24 consecutive seeds; click a frame to adopt its
  seed, export the sheet as one PNG.
- **Kit.** Brand name, concepts, brand lines, sub-brands and palette (kept in
  localStorage), display and label fonts by file drop (session only), and **Download kit**:
  one zip with every scene and layout at all five formats, the logo, the sheet and the kit
  card as numbered PNGs, plus an SVG logo per sub-brand.
- **Print.** Screen, Riso wet or Riso dry, applied to the finished pixels in every mode, to
  PNG and to video: each colour becomes a flat ink layer printed slightly out of register
  with grain; wet spreads the ink, dry breaks the fill into speckle. SVG stays vector.

Keys: **R** reroll, **1–5** complexity, **L** layout, **D** 2.5D, **P** print, **←/→** scene,
**space** play / pause, **S** sheet, **K** kit, **B** layout mode, **E** export PNG, **H**
panels.

**`jelly-pitch.html` — Jelly Pitch.** A WebGPU soft-body experiment: a tennis ball, a
football or a basketball made of translucent jelly on reactive artificial turf. The body is
a tetrahedral mesh solved with XPBD at a fixed 60 Hz step with 10 substeps — a co-rotational
elastic constraint and a volume constraint per tet, damping along mesh edges only, ground
contact with friction, and a soft grab on a patch of particles. **Hand** grabs and pulls
(scroll or a second finger twists); **Knife** takes a drawn stroke as a vertical blade
plane, presses a groove, then splits every tet the plane crosses, so each piece becomes its
own soft body that can be grabbed and cut again and collides with the others. The smooth
skin is a subdivided surface bound to the tets by barycentric weights; seams, panels, ribs
and an uploaded face are drawn in rest space, so they stretch and travel with the jelly and
are cut with it. Rendering is a thickness pass (back faces minus front faces), refraction
by thickness, Beer–Lambert absorption, milky scattering, back-lit glow, Fresnel reflections
of a procedural studio and GGX highlights. The floor is 90,000 instanced grass blades that
flatten, lean away and ripple from a small pressure field. Controls sit in a liquid-glass
panel drawn by WebGPU (blurred, lensed copy of the frame with a rim and a cursor highlight).
Real sizes and a 1.3 g/cm³ gummy density. It needs WebGPU and shows a message without it.
Keys: **H** hand, **K** knife, **R** reset, **space** pause. Written from scratch for this
site, following the description of a jelly-cutting experiment by another author.

## Interface

Every page loads two shared files, `ui.css` and `ui.js`. Together they give the site a
light and a dark mode — the switch sits at the top of each controls panel (top-right on
the index), follows the system setting until you choose, and remembers the choice in
`localStorage` — and one look for the controls: collapsible sections with a chevron,
flat bar sliders with the label and value inside and the filled part showing the value,
tile buttons with a dark outline when selected, and switch-style checkboxes. The theme
only changes the interface; each effect keeps its own colours, except Compass Mark,
whose default mark and ground follow the theme until you pick your own.

## Recording

Every page is built to be screen-recorded. **H** clears the panel on any of them.

In Terminal Type, set the canvas (1080×1920 portrait, 4:5, square, landscape or
fill) and zoom to **100%** for a true 1:1 capture; **R** replays, **space** pauses,
and the scrub slider holds any single frame. If 1920 px of height does not fit the
display, record at Fit and scale up in post, or work at 4:5. **Copy settings** puts
the whole state on the clipboard as JSON.

In Dither Lab, Line Relief, Glyph Matrix and Prism Core, **S** saves the current frame as a PNG. Line Relief
takes the same canvas presets and zoom as Terminal Type, and **R** replays its bloom.
