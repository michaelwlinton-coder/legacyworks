# LegacyWorks

The source for [legacyworks.studio](https://legacyworks.studio) — a life-story studio that captures voices, wisdom, and histories and turns them into films, books, and documentaries families actually watch.

## New to the team?

Start with **[`01-handoff-doc.md`](./01-handoff-doc.md)** — it covers the mission, the three product tiers, everything currently built, and what's still outstanding. Read it before anything else.

## What's in this repo

- **Root-level `.html` files** — the live, multi-page site (homepage, tier pages, equipment guide, quiz, gift flow, partners page, etc.), plus a handful of working drafts and reference docs.
- **`assets/`** — shared `styles.css` and `main.js` used across most pages.
- **`legacyworks-capture/`** — a separate project: the survey-to-archive lead-capture system (Cloudflare Workers + D1), deployed independently at its own `.pages.dev` address. See its own `SETUP.md` for that system specifically.
- **`sitemap.xml`, `robots.txt`** — SEO basics for the main site.

## Deploying

The main site deploys to Cloudflare Pages. `legacyworks-capture/` deploys separately via `wrangler` — see `legacyworks-capture/SETUP.md`.

## Questions

Mike Linton — `mike@aspirex.org`.
