# LegacyWorks — Website & Backend Handoff Bundle

Welcome. This zip contains everything you need to take over the website and technical operations of LegacyWorks ([legacyworks.studio](https://legacyworks.studio)).

## ⚠️ One small file rename before you start

Gmail blocks `.js` files inside zip attachments, so one file in this bundle has been renamed:

- `03-multi-page-draft/assets/main.js.txt` → **rename to** `main.js`

Just remove the `.txt` extension before you try to use that file. It's a tiny script (~1.8 KB) and only matters when you work with the multi-page draft.

## What to read first

Open **`01-handoff-doc.md`** — the main handoff document, ~3,500 words. It covers everything: the systems map, current state, deploy process, conventions, your first 30 days. Read it start to finish before doing anything else.

## What's in this bundle

| Folder / file | What it is | When you'll need it |
|---|---|---|
| **`01-handoff-doc.md`** | Main handoff document. Start here. | Day 1 |
| **`02-current-website/index.html`** | The exact HTML file that's live at legacyworks.studio right now (34 KB, self-contained). | First time you make a change |
| **`03-multi-page-draft/`** | A drafted multi-page version of the site (11 files including `about.html`, `contact.html` with Calendly embed, `story-starter/keeper/legacy.html`, `404.html`, `sitemap.xml`, `robots.txt`, plus `assets/main.js.txt` ← rename to `main.js` and `assets/styles.css`). Not yet deployed — needs content review and your input. | First-week priority #4 |
| **`04-context/founding-operator-jd.md`** | The job description for the *business-side* role at LegacyWorks. Tells you who your peer will be. | Background reading |
| **`04-context/operator-handoff.md`** | The non-technical handoff doc the founding operator will work from. Lets you see the business workflow (Calendly response process, brand voice, three tiers, sales funnel). | Background reading |

## To redeploy the current site

A pre-packaged `.zip` for the Cloudflare upload widget wasn't included in this bundle (nested zips trip email filters). To make one yourself:

1. Take `02-current-website/index.html`.
2. Right-click → **Send to → Compressed (zipped) folder**.
3. The resulting `.zip` works directly with the Cloudflare Pages Direct Upload widget.

Full instructions in `01-handoff-doc.md` Section 6.

## What's NOT in this zip (and where to get it)

- **GitHub repo with full history** — clone or fork: https://github.com/michaelwlinton-coder/legacyworks
- **Logins / credentials** — Mike will share via 1Password (or his password manager) once you're set up.
- **Cloudflare dashboard access** — Mike invites you via the Cloudflare account.
- **Calendly admin** — Mike invites you via Calendly team settings.

## How to reach Mike

- Email: `mike@aspirex.org`
- Text: (Mike will text you his number)

Welcome aboard. Read `01-handoff-doc.md` and then text Mike when you're ready to walk through it together.
