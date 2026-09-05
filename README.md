# Moxx Lab

Mockup animations. Each one is a single self-contained HTML page — no build step,
no dependencies, no network requests. Open one in a browser and it runs.

`index.html` is the directory page; add a new `<li>` to it when a new animation
lands.

| File | What it is |
| --- | --- |
| `index.html` | The directory. Start here. |
| `terminal-type.html` | **Terminal Type** — portrait terminal text that types itself in, with a font-upload panel. |

Live at **https://sahil639.github.io/Moxx-lab/** — GitHub Pages serves `main` from
the repository root, so every push to `main` redeploys.

## Terminal Type

A 1080×1920 portrait stage of monospaced terminal text, built to be
screen-recorded as a mockup.

It exists to try typefaces. Drop any `.ttf`, `.otf`, `.woff` or `.woff2` anywhere on
the page and it loads through the `FontFace` API, joins the list in the panel, and
the stage and the specimen strip both switch to it at once. Several fonts can be
held at a time and clicked between, so the same frame can be compared across them.
Nothing is uploaded anywhere — the file is read in the browser and stays there.

### The animation

Three layers, each independently switchable, each with its own intensities:

- **Typewriter · decode** — characters land at a set rate, with a run of scrambled
  glyphs racing ahead of the write head. Depth, scramble frequency, ghost opacity
  and the scramble alphabet (technical, hex, katakana, binary, or the source text's
  own characters) are all controls. Line and block pauses give the rhythm its
  phrasing; a line is a block boundary when it is blank, `}`, or opens with `{`.
- **Line cascade** — each line rises, fades and unblurs into place on a stagger,
  with a choice of easing. Runs with or without the typewriter.
- **CRT atmosphere** — scanlines at an adjustable pitch, flicker, animated noise,
  vignette, chromatic split on the text, and occasional horizontal glitch
  displacement.

The view follows the write head at an adjustable anchor height with damped
smoothing, or holds still with a constant drift. The text itself is editable in the
panel.

### Recording

Set the canvas (1080×1920 portrait, 4:5, square, landscape, or fill), set zoom to
**100%** for a true 1:1 capture, and press **H** to clear the UI. **R** replays,
**space** pauses, and the scrub slider holds any single frame — useful for picking a
still. **Copy settings** puts the whole state on the clipboard as JSON, so a look
worth keeping can be pasted back into `S` in the source.

If 1920 px of height does not fit the display, record at Fit and scale up in post,
or work at 4:5.
