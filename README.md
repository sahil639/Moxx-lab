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

## Recording

Both pages are built to be screen-recorded. **H** clears the panel on either one.

In Terminal Type, set the canvas (1080×1920 portrait, 4:5, square, landscape or
fill) and zoom to **100%** for a true 1:1 capture; **R** replays, **space** pauses,
and the scrub slider holds any single frame. If 1920 px of height does not fit the
display, record at Fit and scale up in post, or work at 4:5. **Copy settings** puts
the whole state on the clipboard as JSON.

In Dither Lab, **S** saves the current frame as a PNG.
