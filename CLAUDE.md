# Moxx Lab — project context

Static multi-page site of mockup animations. Live at https://sahil639.github.io/Moxx-lab/
(GitHub Pages serves `main` from the repo root; every push to `main` redeploys).
No build step, no dependencies: each page is one HTML file plus the shared `ui.css` / `ui.js`.

## Files
- `index.html` — directory page, laid out after a reference the user supplied (a developer-blog
  index): black ground with a neon green accent (`--ix-accent`), the chrome logo top-left (no count beside it; the user removed it) and a short description of Moxx Lab top-right (`.intro`), a left "/ FILTERS" column
  of topic checkboxes, and a "/ DATE / NAME" list, newest first: a green square, the date the
  page was first committed (from `git log --diff-filter=A`, written `2026.11.27`), a long
  descriptive title ("Name: what it does") and a "+" per row, separated by thin lines. The name is the link; "+" opens the
  description. New effect = new `<li data-tags="...">` in `#list` (topics are listed in `NAMES`
  in the filter script; counts are worked out from the rows). Ticking several topics shows rows
  with any of them. Its own tokens are `--ix-*`; it still loads `ui.css` for the theme toggle,
  so the block at the end of its `<style>` undoes the panel styling of `summary`, `button` and
  inputs — keep that block last. Small labels and numbers use the system monospace; everything
  else is Helvetica Neue. Hovering a row shows that effect's sample image (`previews/<page>.jpg`, 720 x 450) in a
  box that follows the pointer (`#peek`; hover-capable devices only). The previews are cropped
  screenshots of each page at its defaults, taken with headless Chrome at 1600 x 900 (crop
  1240 x 775 from x 0, y 62); a new effect needs one added. The logo is an inline WebGL1 script
  (no library): `logo.svg` is baked into a texture (shape + two blurs for bevel/dome), drawn
  as 18 masked slices with a procedural reflection; drag rotates, flick spins, hold pulls it
  along, springs bring it back. It is 250px square (170px on phones) and only draws while
  moving; `<img>` remains the fallback. Exposed as `window.MoxxLogo`. The footer link
  (`#portfolio`) still has `href="#"` — the user has not given the URL.
- `terminal-type.html` (01), `dither-lab.html` (02), `line-relief.html` (03),
  `glyph-matrix.html` (04), `prism-core.html` (05), `compass-mark.html` (06),
  `brand-engine.html` (07), `jelly-pitch.html` (08),
  `pretext-play.html` (09), `tape-deck.html` (10), `grain-stack.html` (11),
  `pattern-maker.html` (12), `particle-morph.html` (13), `isocuboid.html` (14),
  `tone-tiles.html` (15), `glow-cells.html` (16) — the effects.
- `logo.svg` (white on transparent), `favicon.svg` (on black) — Moxx Lab brand mark; every
  page uses them for tab icon, panel header (`.mark`) and back link.
- `ui.css`, `ui.js` — shared interface layer, loaded right after each page's own `<style>`.
  `ui.js` (blocking, in head) sets `html[data-theme=light|dark]` (localStorage `moxx-theme`,
  else system), adds the `.theme-toggle` switch to `#panel h1` / `#ui h2` (floating on the
  index), fires a `moxx-theme` window event, and keeps `--p` (fill %) on every range input.
  `ui.css` holds the `--u-*` tokens and restyles panel, `details/summary`, `.row` sliders
  (label + `.val` sit inside the bar), buttons/`.chip`/`.tile` (`.on` or `aria-pressed` =
  dark outline), fields and `.toggle` switches, all nested under `html[data-theme]` so they
  outrank per-page rules. Change control looks there, not per page.
- `README.md` — documents each effect; keep it in sync when effects change.

## Conventions
- Brand font: Helvetica Neue, a system font (stack `'Helvetica Neue',Helvetica,Arial,sans-serif`),
  on every page; nothing is downloaded. It replaced the self-hosted GT Zirkon on the user's
  request (2026-11-27); `fonts.css` and `fonts/` are deleted. Devices without Helvetica Neue
  (Windows, Android) fall back to Helvetica or Arial. Pretext Play still imports its library
  from a CDN. Terminal Type's stage/font-tester fonts are intentionally not changed.
- Look: minimal, modern; neutral greys with one near-black / near-white accent
  (no per-effect accent colours any more). Light and dark themes; the theme styles the
  interface only, effect canvases keep their own colours.
- Keys on effect pages: H hides panel, S saves PNG, R replays, space pauses.
- Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Test locally with `python3 -m http.server` (file:// breaks relative assets like logo.svg).
- When the changes for a prompt are finished, commit and push to `main` without asking (user instruction, 2026-11-23). No separate "commit" or "push" prompt is needed.

## Effect notes
- **Glyph Matrix**: Canvas 2D + WebGL2 instancing; source can be image, video
  (`<video>` drawn into the source buffer) or procedural fields.
- **Prism Core**: WebGL2 fragment-shader raymarch of a translucent rounded hex block.
  Shape presets (hex prism, cube, rect prism, cylinder, sphere, pyramid), view presets
  (3/4, isometric, perspective, ortho front/side/top), up to 12 instances with arrangements
  (single, row/grid, hex cluster, radial, random), W/H/D sizing, glow + bg (solid/gradient),
  contrast guard, "Inner shadow" control, 7 colour presets. State lives in `S`; exposed as
  `window.PC`. Cube look was tuned to avoid white specks and dark inner outlines — shell
  colour (`palette * uBase * 0.75 * T`) and wrapped face shading are what prevent that;
  don't reintroduce facing-based darkening.

- **Compass Mark**: Canvas 2D parametric logo builder (lobes on a ring, fillets, centre hole,
  spiral channel cuts, construction guides). `build(P)` returns the outline as an SVG arc path
  used for both canvas (`Path2D`) and SVG export; cuts use `destination-out` on an offscreen
  layer (masks in the SVG). State in `S`, exposed as `window.CM`. Versions in localStorage
  (`moxx-compass-versions`).
- Every effect page has a fixed top-left `#back` button ("← Moxx Lab" → `index.html`); it fades
  out when the panel is hidden and reappears on hover. New pages must include it.

- **Brand Engine** (07): seeded generative brand system, built from the user's 7-phase spec; all
  seven phases are done. Deliberately self-contained (own CSS, does NOT load `ui.css`/`ui.js`;
  shares the `moxx-theme` key). Never use `Math.random` in it (seeded `makeRng`). Structure, in
  file order: kit (`moxx-brand-kit` in localStorage; dropped fonts are session-only) → `state`
  + hash (`DEFAULTS` are omitted from the hash; `REWRITE_SCRIPT` must stay above `state`) →
  `Mark` vocabulary → `SCENES` (pure `render(ctx, env, rng, t)`; optional hooks `graph`,
  `animated`, `duration`, `thumbT`, `still`) → Layout (`LAY.*`, `fitText`) → Logo (`logoModel`
  display list drawn by `listToCanvas` and `listToSvg`; keep them in step) → Sheet → print
  (`risoPass`, a pixel pass) → `drawFrame` (single entry for stage, thumbnails, export, video)
  → UI → export (`renderTo`, `recordVideo`, `downloadKit` with a store-only `zip`). Keys differ
  from the other pages by spec: S = Sheet, E = export PNG. Exposed as `window.BE`.
  Known gaps: shell not laid out under ~1100px wide; SVG text is not outlined; 2.5D Mosaic is
  a flat tilt (no extruded tiles); brand defaults (name, palette, lines, sub-brands) are
  placeholders the user has not confirmed.

- **Jelly Pitch** (08): WebGPU only, self-contained (own CSS, no `ui.css`/`ui.js`), an
  original implementation written from the user's spec — the reference artifact ("Melon Jelly
  Knife") belongs to another author and its code was deliberately NOT copied. CPU physics
  (XPBD tets: `solveTets`, contacts, `performCut` = clip every crossed tet and fan from the
  smallest-index vertex; `buildSurface` regenerates the subdivided, sphere-projected skin),
  GPU passes: scene → thickness (additive, rgba16float) → jelly over a blit → present with
  the glass panels. One uniform block `G` (208 floats; keep `GU.set` offsets in step with the
  WGSL struct, and never put a `//` comment mid-line in the `GU.set` row — that once disabled
  the material uniforms). Seams/panels/ribs/face are procedural in rest space, not separate
  meshes. `window.JP` exposes `stats`, `cut(nx,nz,d)`, `step()`. Not done or approximate:
  cut tets multiply (about 9 ms per step after three cuts), SVG displacement fallback for the
  glass, face auto-centre only where `FaceDetector` exists.

- **Pretext Play** (09): playground for `@chenglou/pretext` 1.0.0, imported at run time from
  esm.sh (jsDelivr fallback) — the one page with a network dependency besides the font; the
  library is not vendored. Uses the shared `ui.css`/`ui.js`. Canvas 2D; `reprepare()` runs
  `prepareWithSegments` only when text/font/options change, width changes only re-run layout.
  Modes: `drawWrap`, `drawBubbles`, `drawFlow`, `drawSegments`. Exposed as `window.PP`.

- **Tape Deck** (10): cassette carousel in raw WebGL 2, shared `ui.css`/`ui.js`. Inspired by
  webgl.dev (Luis Bizarro's portfolio: one 115 kB hand-written WebGPU bundle, no model files,
  lazy media; its desktop app is the same scene as a native Rust/wgpu binary) — an original
  implementation with its own model, labels and tracker design, none of that site's code,
  assets or names. Everything is procedural: `mesh` (two boxes), `paintLabel` → one
  `TEXTURE_2D_ARRAY` layer per project, hubs/window drawn in `FS`. Passes: MSAA float scene →
  resolve → bright + 2 blurs at quarter size → `FS_OUT`. `layout()` rebuilds tape transforms
  each frame, `pick()` is a CPU ray/box test, `drawTracker()` is the 2D overlay (`#hud2`).
  `Offline copy` inlines `ui.css`, `ui.js`, `logo.svg` and a `__TAPE_PRESET`. Settings and
  the project list live in localStorage `moxx-tape-deck`. Exposed as `window.TD`.

- **Grain Stack** (11): Canvas 2D, shared `ui.css`/`ui.js`, built from the user's spec and two
  reference videos (dense grain bands, bright at the leading edge). File order: state →
  `Shapes` (unit polygons; add a function to add a shape) → Layer (`layerGeometry`,
  `columnTable`: 240 vertical columns with each shape's top/bottom) → Particles (`seedParticles`,
  `stepLayer`: a grain is a column index + progress 0..1, so it cannot leave the shape) →
  Renderer (body fill casts the shadow, grains drawn clipped in 28 colour buckets) → UI →
  Export (PNG, 6 s WebM). Count scales with layer area. Custom polygon is drawn on the canvas.
  Presets Dunes/Stack/Bloom. R = randomize. Exposed as `window.GS`. Dunes costs ~10 ms a frame.

- **Pattern Maker** (12): seamless repeat-pattern builder, Canvas 2D + SVG, shared
  `ui.css`/`ui.js`. State `S` = tile size, bg, palette, `layers[]`, view; each layer is a flat
  object (see `newLayer` for every option). File order: state → Motifs (`SHAPES` unit-box SVG
  paths; also text, image, pasted SVG path, hand-drawn strokes — `motifOf`) → `FIELDS`
  (periodic maps driving size/turn/opacity/colour) → Layout (`buildItems`: one display list per
  layer, with edge copies so the tile repeats) → Renderers (`drawTile` canvas and `tileSvg`
  read the same list; keep them in step) → view (tile repeated with `createPattern`) → history
  (undo, localStorage `moxx-pattern-maker`) → generic `ctl()` control builder → presets →
  input (files, drag-drop, paste, pad, palette from image) → export (tile PNG, SVG, view PNG,
  CSS data URI, JSON, WebM). Never use `Math.random` inside `buildItems` (use `hash`).
  Keys: R = new seed, S = save tile, space = motion, Cmd/Ctrl+Z undo. Exposed as `window.PM`.
  Not checked: real file uploads, drag-drop, clipboard paste, CSS copy, video (only presets,
  SVG validity and the draw/path/text motifs were exercised, via script).

- **Particle Morph** (13): WebGL 2, shared `ui.css`/`ui.js`, built from the user's spec and a
  reference recording (white stippled dots, density follows brightness, dissolve to a noisy
  cloud between images, repel hole under the cursor). Two script blocks: `<script id="engine">`
  is `ParticleMorph(canvas, opts)` with NO dependency on the page — the Embed snippet ships that
  block's text verbatim, so keep page helpers (`$`, `el`) out of it and never write a closing
  script tag inside it. Engine parts: `sample` (stipple by CDF or grid; background by alpha or
  corner colour) → `arrange` (points into N slots ordered by mapping mode; spare slots get
  alpha 0) → GL (morph path, easing and colour in the vertex shader; attributes A/B positions,
  A/B colours, delay key, randoms, hover offset) → timeline (`tick`: hold/delay/morph, triggers,
  playback) → `hover` (CPU springs, uploaded only while something moves) → `frame`. Per-step
  overrides live on each image as `own`. The second script is the panel (`ctl()` with tooltips,
  thumbnails with drag reorder, presets, JSON, snippet, video). Settings (not images) persist
  in localStorage `moxx-particle-morph`. Sample images are drawn in code. Exposed as
  `window.PMX` (engine) and `window.PMUI`. Not done: GIF export (video only). Not checked: real
  uploads, drag reorder, the exported snippet running on its own, video recording, frame rate
  (the preview pane throttles to ~2 fps), touch.
- **Isocuboid** (14): isometric boxes, WebGL 2, shared `ui.css`/`ui.js`. Two modes (`S.view`):
  `city` and `single`. The earlier separate single-box page (`iso-cuboid.html`) was merged into
  this one on the user's request and deleted. One GPU instance per box: 18 face vertices + 54
  edge vertices (nine edges as screen-space quads; edges 1, 2 and 5 are flagged "inner" and
  take `uWIn`, the other six take `uWOut`). Height animation (wave + per-box random targets,
  blended, clamped) is entirely in the vertex shader (`height()` in `COMMON`); `S.animate`
  switches it off for a still city (amplitudes sent as 0), separate from play/pause. The depth
  buffer orders boxes (depth = x+y+z), so there is no sorting and no per-frame CPU work.
  `buildCity()` runs only when layout, types, seed, pan or zoom change: it walks the grid cells
  that project into the frame and derives everything about a box from `hash(seed, i, j, k)`,
  so panning reveals a stable endless city. Roads (`onRoad`: 2 = on a road, 1 = beside one
  and capped low so the road shows) are strips along a grid axis, one per band of `roadGap`
  cells; `aRnd.y >= 2` marks a box the shader keeps still. Motifs: `MOTIFS` is 36 six-digit codes (one wedge of a
  5 x 5 grid, mirrored eight ways; generated, not copied from the user's reference sheet),
  baked by `motifAtlas()` into a 30 x 30 R8 texture; per-instance `aMotif` = (motif id, face
  bits 1/2/4, palette row); `FS_FACE` tiles it in squares with a one-cell margin and reads
  colours from `palTex` (64 rows x 3, rebuilt in `buildCity`). The instance colour buffer is 20
  bytes per box. Motif ids 36+ are
  the ten ornate tiles: `TILES` (original designs drawn from circles, petals, stars and
  diamonds; the user's reference sheet was stock tile artwork and was not copied), baked by
  `ornateAtlas()` into a 640 x 64 R8 texture (`uAtlas2`); `palTex` is 64 rows x 4 colours. Motif
  choices use `S.motifSeed`, not the city seed. `uMScale` scales the tile and `uMWrap` makes the
  left and right faces share one strip of UV (top joins the left). `FS_FACE` takes four taps
  per pixel. `roadBlock` cuts each road cell into K x K instances, so `buildCity` grows its
  buffers with `room()`. Master palettes (`MASTERS`, `master()`, `bgHex()`): when one is chosen every
  colour asked for by types, roads, accents and motifs is remapped to it (`col()` in
  `buildCity`), and optionally background and outline ink too. Every panel section starts with
  a one-line `.lead` description. Zones come from smooth `noise()`; "fill off" boxes
  are painted in the background colour so they still hide what is behind them. "Boxes in the
  frame" sets the zoom. `buildSingle()` makes one instance sized in pixels (`sw`, `sd`, `sh`,
  strokes `sInner` 0.5 / `sOuter` 1.5), scaled down only to fit; Save SVG exists in that mode
  only and is built separately in `bSvg` (keep its geometry in step with the shader).
  State `S`, saved in localStorage `moxx-isocuboid`. Exposed as `window.IQ`.
  Not checked: animation in motion (the preview pane throttles frames), Uniform mode, the
  type editor by hand, SVG/PNG/video export, very high counts.

- **Tone Tiles** (15): an image rebuilt as a mosaic of black-and-white patterns, Canvas 2D,
  shared `ui.css`/`ui.js`, from a reference picture the user supplied. File order: state →
  source (`prepare`: image → grey with contrast/brightness/midtones, into summed-area tables;
  `stats` gives mean and spread of any rectangle) → tiles (`buildTiles`: a grid of squares,
  each split in four while its spread exceeds `detail`, up to `depth`) → `PATTERNS` (each
  draws ink shapes covering fraction `c` ≤ 0.5 of a square; darker tiles draw the same pattern
  reversed; `triangle`, `fade` and `flat` are special cases in `drawTile`) → `render(g, px)`
  (used for screen and for the larger PNG) → UI. Pattern choice is `hash(seed, tile)`. `floor`
  keeps a little pattern in pure white and black. The sample is `dither-default.png` on a black
  matte. Settings in localStorage `moxx-tone-tiles`. R = reshuffle. Exposed as `window.TT`.
  Not checked: uploading an image, drop and paste, Save PNG. No SVG export.

- **Glow Cells** (16): a flat 2D colony in which every mark is a tiny filled circle, Canvas 2D,
  shared `ui.css`/`ui.js`, from a reference video. The first version drew cells as glowing line
  scribbles; the user said that reading was wrong (everything is circles of similar hues) and
  it was rewritten — do not bring strokes back. File order: state → noise and colour (`shades`:
  six hues near the cell's colour plus two accents) → colony (`newColony`: each cell gets `d`,
  its dots as polar homes `rho`/`th` chosen patchily per kind — `hollow`, `full`, `core`,
  `cloud` — bucketed by shade in `d.by`; `shapeTable`/`outline` = noise-shaped blob; `physics`:
  drift, pull to the middle, soft repulsion, drag, 160 settling steps at creation) → `drawCell`
  (body dots one path per shade, optional ringed dots, membrane = chains of dots along the
  outline, the last chain meandering) → `plankton` (loose circles, ringed ones, streaks as
  short dot chains) → `draw` into an offscreen `scene`, then to the visible canvas with a light
  halo. Not additive: plain `source-over`. Settings carry `v:2`; older saved settings are
  ignored. localStorage `moxx-glow-cells`. R = new colony. Exposed as `window.GC`. About 5 ms
  a frame. Not checked: motion at full frame rate, dragging by hand, video.

## Status (last work)
All work is committed; see `git log`.

## Open / not yet verified
- The new index was looked at at desktop width in dark, and at a narrow width in dark and light;
  not on a phone, and the topic assigned to each effect is my own guess.
- Not checked by eye: phone-width index, Safari/touch, effect pages after the font change
  (other than Prism Core), Prism Core drag/motion modes, Save PNG, front/side/top views,
  gradient backgrounds, cylinder/sphere/pyramid after later changes.
- Per-effect accent colours are gone (unified by `ui.css`).
- After the font changes (GT Zirkon, then Helvetica Neue) the pages were not re-checked by eye; the chrome logo was
  driven with synthetic pointer events, not a real mouse or touch.
- Light/dark redesign not checked by eye: Safari, Firefox, phone width, the theme wipe
  animation at full frame rate, drag-and-drop overlays in light mode.
- A "How a Launch Works" section with a boxes illustration + on-scroll effect (in shades of
  white) was requested, but it does not exist in this repo — it likely belongs to another
  project/site. Ask the user where it lives before building anything.
