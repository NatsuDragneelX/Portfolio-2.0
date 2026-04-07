# Shivam Patel — Portfolio website

This repo is the source for **Shivam Patel’s personal portfolio**: a fast, responsive site that introduces who you are, what you build, and how to get in touch.

## What’s on the site

- **Home** — Hero, about (with profile photo), skills, experience, and education.
- **Resume** — Full resume as a dedicated page (`/resume`), linked from the nav and hero.
- **Projects** — Cards for coursework and personal work, with optional GitHub and live links.
- **Services** — Tiers and pricing-style presentation for web work.
- **Games** — Small browser games (tic-tac-toe, snake, rock–paper–scissors, memory).

Reach out via **email** and social links from the home hero (`site.email`, GitHub, LinkedIn in `src/config/site.js`).

The UI supports **light and dark mode** and several **color palette** presets (neon, emerald, neutral, and more) so visitors can tune the look.

## Tech stack

Built with **Next.js 15** (App Router), **React 19**, **Tailwind CSS**, **Radix**-based UI patterns, **Framer Motion**, and **next-themes**.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your real domain for metadata.

## Editing content & assets

**If you maintain this repo:** all project lists, copy, images paths, and most site text are driven from config files and `public/` assets. Step-by-step instructions (projects, games, profile photo, resume, redirects, etc.) are in **[EDITING.md](./EDITING.md)** — not duplicated here so this README stays a simple overview.

## License

Private / personal use — adjust as you like.
