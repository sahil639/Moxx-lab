# Moxx Lab — project context

Static multi-page site of mockup animations. Live at https://sahil639.github.io/Moxx-lab/
(GitHub Pages serves `main` from the repo root; every push to `main` redeploys).
No build step, no dependencies: each page is one HTML file plus the shared `ui.css` / `ui.js`.

## Files
- `index.html` — directory page: chrome logo, list of effects, credit footer. No dividers
  (spacing only); rows are number + large name + description. Hovering a row shows a blank
  16:10 `.thumb` beside it (hover-capable screens ≥1100px only); real previews are still to be
  added. New effect = new `<li>`. The logo is an inline WebGL1 script (no library): `logo.svg`
  is baked into a texture (shape + two blurs for bevel/dome), drawn as 18 masked slices with a
  procedural reflection; drag rotates, flick spins, hold pulls it along, springs bring it back.
  It is 250px square (170px on phones). It only draws while moving; `<img>` remains the fallback. Exposed as `window.MoxxLogo`.
  The footer link (`#portfolio`) still has `href="#"` — the user has not given the URL.
- `terminal-type.html` (01), `dither-lab.html` (02), `line-relief.html` (03),
  `glyph-matrix.html` (04), `prism-core.html` (05), `compass-mark.html` (06),
  `brand-engine.html` (07), `jelly-pitch.html` (08),
  `pretext-play.html` (09), `tape-deck.html` (10), `grain-stack.html` (11) — the effects.
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
- Brand font: GT Zirkon, self-hosted (`fonts.css` + `fonts/*.woff2`: Thin 200, Light 300,
  Book 350, Regular 400, Medium 500–700), linked from every page; system sans fallback. It is a
  commercial Grilli Type face — the user supplied the files; web licence not confirmed.
  Pretext Play still imports its library from a CDN. Terminal Type's stage/font-tester fonts
  are intentionally not changed (that page exists to try other typefaces).
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

## Status (last work)
All work is committed; see `git log`.

## Open / not yet verified
- Index hover thumbnails are blank placeholders.
- Not checked by eye: phone-width index, Safari/touch, effect pages after the font change
  (other than Prism Core), Prism Core drag/motion modes, Save PNG, front/side/top views,
  gradient backgrounds, cylinder/sphere/pyramid after later changes.
- Per-effect accent colours are gone (unified by `ui.css`).
- After the GT Zirkon change only the index and Dither Lab were looked at; the chrome logo was
  driven with synthetic pointer events, not a real mouse or touch.
- Light/dark redesign not checked by eye: Safari, Firefox, phone width, the theme wipe
  animation at full frame rate, drag-and-drop overlays in light mode.
- A "How a Launch Works" section with a boxes illustration + on-scroll effect (in shades of
  white) was requested, but it does not exist in this repo — it likely belongs to another
  project/site. Ask the user where it lives before building anything.
