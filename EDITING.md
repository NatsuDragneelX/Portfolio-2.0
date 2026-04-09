# Editing this portfolio

This file is for **you** (or a collaborator) maintaining the site. Visitors never see it unless they open the repo.

## Where content lives

Most copy and lists are **JavaScript config files** under `src/config/`. Change the text or arrays there, save, and refresh the dev server.

| What to change | File |
| ---------------- | ---- |
| Your name, role, tagline, email, GitHub, LinkedIn, nav labels | `src/config/site.js` |
| About section text + profile photo path | `src/config/about.js` |
| Resume page (headline, sections, bullets) | `src/config/resume.js` |
| Skills categories | `src/config/skills.js` |
| Work experience | `src/config/experience.js` |
| Education | `src/config/education.js` |
| Project cards (title, tech, highlights, links) | `src/config/projects.js` |
| Services / pricing tables | `src/config/services.js` |
| Games hub (titles, descriptions, routes, preview images) | `src/config/games.js` |
| Tools hub (cards, categories, routes, icons) | `src/config/tools.js` (`toolCategories`, `tools`, `tagline` per card) |
| Tool page “how to use” blurbs | `src/config/tool-instructions.js` |

## Tools hub

The **`/tools`** grid and each **`/tools/<slug>`** page are documented in **`src/tools/README.md`**. Register new tools in **`src/config/tools.js`**, add instructions in **`src/config/tool-instructions.js`**, and match **`instructionKey`** on the page to the slug.

## Profile photo

1. Put the image in the **`public`** folder (next to `package.json`, not inside `src`).
2. Prefer a **lowercase** filename in the URL, e.g. `public/profile.jpg` → use `/profile.jpg` in config. Case-sensitive hosts (Vercel, Netlify, etc.) will 404 if the casing does not match.
3. Set **`about.profileImage`** in `src/config/about.js` to that path, e.g. `"/profile.jpg"` or `"/profile.png"`.
4. Use **JPEG or PNG**. iPhone **HEIC** files usually will not show in browsers unless you export to JPG/PNG first.
5. **Commit** `public/profile.jpg` (or your file) to git if you deploy — otherwise production will not have the file.

## Project cards: text, links, screenshots

Edit **`src/config/projects.js`**. Each project is an object with fields like:

- **`id`** — unique string (used as React `key`).
- **`title`**, **`tech`**, **`highlights`** — what appears on the card.
- **`github`** / **`live`** — full URLs starting with `https://`. If empty, that button is hidden.
- **`image`** — optional. Path under `public`, e.g. put `public/projects/my-app.png` and set `image: "/projects/my-app.png"`. If empty, the card uses the **`accent`** gradient instead.
- **`accent`** — Tailwind gradient classes for the placeholder when there is no image.

To **add** a project: duplicate an existing block and change the fields. To **remove** one: delete its object from the array.

## Games hub: previews and new games

**Preview images**

- Files live in **`public/games/`** (SVG or PNG works).
- In **`src/config/games.js`**, each game has a **`preview`** field, e.g. `"/games/snake-preview.svg"`.

**Add a new game**

1. Add a route under `src/app/games/<your-slug>/page.jsx`.
2. Add the game UI under `src/components/games/` (or reuse patterns from existing games).
3. Append an entry to the **`games`** array in **`src/config/games.js`** (`slug`, `title`, `description`, `href`, `preview`, `accent`).

## Resume page

All resume copy for **`/resume`** comes from **`src/config/resume.js`**. There is no automatic PDF download; it is HTML on the site only.

## Theme & colors

Global theme tokens and palette variants are in **`src/app/globals.css`** (CSS variables) and the palette switcher in **`src/components/providers/palette-provider.jsx`**.

## Redirects

**`next.config.mjs`** defines redirects, for example:

- `/qr/*` → home (short QR links).
- `/games/tic-tac-toe` → `/games/tictactoe`.
- `/contact` → home (legacy URL after the contact page was removed).

Do **not** add a redirect from **`/resume`** to **`/`** if you want the resume page to work.

## Environment

For production metadata / Open Graph, set in **`.env.local`**:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Build commands

```bash
npm install
npm run dev    # local development
npm run build  # production build
npm run start  # run production build locally
npm run lint   # ESLint
```

---

The main **`README.md`** is a short overview of the site for anyone browsing the repo; this file is the detailed maintenance guide.
