# Tools

Client-side utilities used on **`/tools`** and under **`/tools/<slug>`**. Each tool lives in its own folder with a React component (and optional CSS module). Routes are defined in **`src/app/tools/<slug>/page.jsx`**.

Hub layout and routes are registered in **`src/config/tools.js`**. Category **`filterLabel`** strings power the filter chips on `/tools`.

Short “how to use” copy on each tool page comes from **`src/config/tool-instructions.js`** (keyed by the same `slug` as in `tools.js`). Update that file when you change behavior or want clearer guidance.

## Catalog

| Slug | Purpose |
|------|---------|
| `password-generator` | Random passwords with length, charset toggles, strength hint, copy. |
| `qr-code-generator` | Text/URL → QR code (canvas), download PNG. |
| `unit-converter` | Length, weight, temperature, speed conversions. |
| `pomodoro` | Focus/break timer, ring progress, end chime. |
| `expense-splitter` | Split bills, net balances, settle-up suggestions, text export. |
| `text-case-converter` | UPPERCASE, lowercase, title/sentence/capitalize transforms. |
| `tip-calculator` | Bill, tip %, party size → per-person totals. |
| `color-picker` | Hex/RGB/HSL, native picker, lightness-based palette, copy. |
| `gradient-generator` | Two-color linear gradients, CSS copy, randomize. |
| `world-clock` | Multi-city clocks (IANA zones), add/remove, day/night hints. |
| `scientific-calculator` | Keypad-built expressions: trig, log, ln, sqrt, power, π, e. |
| `percentage-calculator` | Common percent questions (of, is % of, inc/dec, reverse). |
| `equation-solver` | Linear and simple quadratic equations with short steps. |
| `word-counter` | Words, characters, sentences, paragraphs, reading time, copy. |

## Stack

- **React** (client components where needed)
- **Next.js** App Router pages in `src/app/tools/`
- **Tailwind** + existing UI primitives (`Button`, `Input`, etc.)
- **qrcode.react** — QR canvas (`QRCodeCanvas`)

## Adding a tool

1. Add an entry to **`src/config/tools.js`** (`slug`, `category`, `title`, `tagline`, `description`, `href`, `icon`, `accent`). `category` must match an `id` in **`toolCategories`**. `tagline` is the short line on the hub card; `description` remains for reference / SEO-style copy.
2. Add the icon to the `iconMap` in **`src/app/tools/page.jsx`** if it is new.
3. Create **`src/tools/YourTool/YourTool.jsx`** (and optional `.module.css`).
4. Create **`src/app/tools/your-slug/page.jsx`** using `ToolPageChrome` with `instructionKey="your-slug"`.
5. Add **`toolInstructions["your-slug"]`** in **`src/config/tool-instructions.js`**.
6. Document the new row in the table above.
