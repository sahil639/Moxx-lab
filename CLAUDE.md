# Moxx Lab — project context

Static multi-page site of mockup animations. Live at https://sahil639.github.io/Moxx-lab/
(GitHub Pages serves `main` from the repo root; every push to `main` redeploys).
No build step, no dependencies: each page is one HTML file plus the shared `ui.css` / `ui.js`.

## Files
- `index.html` — directory page. Small logo + list of effects only. No hero, nav, buttons or
  footer. Hovering a row shows a blank 16:10 `.thumb` rectangle beside it (hover-capable
  screens ≥1100px only); real previews are still to be added. New effect = new `<li>`.
- `terminal-type.html` (01), `dither-lab.html` (02), `line-relief.html` (03),
  `glyph-matrix.html` (04), `prism-core.html` (05), `compass-mark.html` (06) — the effects.
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
- Brand font: IBM Plex Mono (Google Fonts link on every page, system monospace fallback).
  It is the only network request. Terminal Type's stage/font-tester fonts are intentionally
  not changed (that page exists to try other typefaces).
- Look: minimal, modern, monospaced; neutral greys with one near-black / near-white accent
  (no per-effect accent colours any more). Light and dark themes; the theme styles the
  interface only, effect canvases keep their own colours.
- Keys on effect pages: H hides panel, S saves PNG, R replays, space pauses.
- Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Test locally with `python3 -m http.server` (file:// breaks relative assets like logo.svg).
- Only commit/push when the user asks.

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

## Status (last work)
All work is committed and pushed (HEAD `c8d6758`, minimal index + IBM Plex Mono).

## Open / not yet verified
- Index hover thumbnails are blank placeholders.
- Not checked by eye: phone-width index, Safari/touch, effect pages after the font change
  (other than Prism Core), Prism Core drag/motion modes, Save PNG, front/side/top views,
  gradient backgrounds, cylinder/sphere/pyramid after later changes.
- Per-effect accent colours are gone (unified by `ui.css`). Option still open: self-host
  IBM Plex Mono to restore "no network requests".
- Light/dark redesign not checked by eye: Safari, Firefox, phone width, the theme wipe
  animation at full frame rate, drag-and-drop overlays in light mode.
- A "How a Launch Works" section with a boxes illustration + on-scroll effect (in shades of
  white) was requested, but it does not exist in this repo — it likely belongs to another
  project/site. Ask the user where it lives before building anything.
