# LegacyWorks — Website & Backend Handoff

**For the person taking over the website, deployments, integrations, and technical operations.**

Last updated: June 2026 · By: Mike Linton (Founder, mike@aspirex.org)

---

## ⚡ Mike — read this section first

You (Mike) are reading this before you've fully figured out where everything lives. That's normal — most of it lives in your accounts; you just haven't logged in to half of them yet. Before you forward this doc to your new hire, work through **Section 1** (the access checklist). It tells you exactly what to gather, what to share, and how.

Once you've done that, the rest of the doc is for them.

---

## 1. ✅ What Mike needs to gather & share before Day 1

This is your prep list. Work through it in order. Most items take 1–3 minutes.

### A. Accounts you need to give them access to

| # | System | URL | What to do | Approx time |
|---|---|---|---|---|
| 1 | **GitHub repo** | https://github.com/michaelwlinton-coder/legacyworks | Settings → Collaborators → Add their GitHub username with **Maintain** role | 2 min |
| 2 | **Cloudflare account** | https://dash.cloudflare.com → Manage Account → Members | Invite their email with **Super Administrator** role (or **Administrator** if you want to keep billing locked down) | 3 min |
| 3 | **Cloudflare Registrar** | Same account as #2 — auto-included | Confirms they can manage `legacyworks.studio` domain settings | (included) |
| 4 | **Calendly** | https://calendly.com → Account → Team | Add as Team Member; they only need view/edit on the LegacyWorks event | 2 min |
| 5 | **aspireX Gmail** | https://admin.google.com (if Workspace) or Gmail settings | Either give them a `@aspirex.org` mailbox **or** add them as a delegate on `mike@aspirex.org` so they can send on your behalf and triage | 5 min |
| 6 | **1Password / Bitwarden vault** | (your password manager) | Create a **"LegacyWorks – Tech"** vault, drop in every login above, share it with them as a vault member | 10 min |
| 7 | **Cowork outputs folder** | Wherever your Cowork app stores files locally on your computer | Zip it up and send via email, or share the folder via Google Drive / Dropbox / OneDrive | 5 min |

If you don't have a password manager set up yet, **set one up before you onboard them**. Free 1Password Families is fine for two people. Don't text passwords. Don't email them.

### B. Things you need to give them via email or doc

| # | Item | Where it lives now | How to share |
|---|---|---|---|
| 8 | **This handoff doc** | Your Cowork outputs folder: `legacyworks-website-backend-handoff.md` | Email as attachment, or convert to a Google Doc and share |
| 9 | **Current website source code** | Same outputs folder: `index.html` (latest patched version, 34 KB) | Share folder; also in GitHub on `main` |
| 10 | **The multi-page draft** | Same outputs folder: `legacyworks-deploy/` (11 files) | Share folder |
| 11 | **The Calendly URL** | https://calendly.com/mlinton/legacy-works-discovery-call | Already public; just mention it |
| 12 | **Brand colors & fonts** | Listed in Section 5 of this doc, also inline in `index.html` CSS | They'll find them once they have the code |
| 13 | **Your phone number for emergencies** | (yours) | Text them, ask for theirs back |

### C. Things to decide before Day 1

| # | Decision | Default if you don't pick |
|---|---|---|
| 14 | Will they use a **`@aspirex.org` mailbox** or their own email? | Default: their own; CC `mike@aspirex.org` on important threads |
| 15 | **Hourly rate** + invoicing cadence | Default: discuss on the first call |
| 16 | **Hours per week** expected | Default: 10–15 hrs/wk while in school; 20+ over breaks |
| 17 | **Communication channel** for quick questions (text? Slack? WhatsApp?) | Default: text |
| 18 | **Standing weekly check-in** time | Default: 30 min, Friday afternoons |

### D. Day 1 onboarding flow (~30 min with them on the call)

1. Walk through the **Systems map** below (Section 3) while you're both logged in.
2. Make sure they can access **every system** in the checklist above. Test each one.
3. Have them push a tiny test commit to GitHub (e.g., update the footer year) to confirm their setup works.
4. Walk through the **current deploy process** (Section 6) so they can do one end-to-end.
5. Agree on the **first 30-day priorities** (Section 8).

---

# 👇 The rest of this doc is for the new hire 👇

---

## 2. What you own

You are LegacyWorks' first website & backend contributor. You own:

1. **The website** — `legacyworks.studio`. Content updates, layout changes, performance, SEO basics, accessibility.
2. **Source control** — the GitHub repo. Clean commits, sensible branches, version history.
3. **Deployments & hosting** — Cloudflare Pages. The current Direct-Upload flow needs to become Git-connected (see Section 9). DNS and SSL also live here.
4. **Domain management** — `legacyworks.studio` is registered through Cloudflare. Renewal, DNS records, subdomains, email routing if we add any.
5. **Integrations** — Calendly embed/widget, analytics (Plausible or GA4 — we haven't picked one), email capture, social meta tags, favicon.
6. **Backups & disaster recovery** — make sure the site can be rebuilt from GitHub if Cloudflare disappears tomorrow.
7. **Backend automations** — as we grow: form handlers, email automations, basic admin tooling. None of this exists yet; you'll help design it.

What you do **not** own: brand decisions, copywriting (you'll execute, not author), pricing structure, sales operations. Those run through Mike or the founding operator.

---

## 3. Systems map — every tool, every URL

Once Mike has set up the 1Password vault, every credential is there.

| System | What it does | URL | Account owner |
|---|---|---|---|
| **legacyworks.studio** | The live website | https://legacyworks.studio | (custom domain via Cloudflare Registrar) |
| **Cloudflare Pages** | Hosts the static site, serves SSL via Google cert | https://dash.cloudflare.com → Workers & Pages → `legacyworks` | michael.w.linton@gmail.com |
| **Cloudflare DNS** | DNS for `legacyworks.studio`, CNAME → `legacyworks.pages.dev` (proxied) | Same dashboard → Websites → legacyworks.studio | Same |
| **Cloudflare Registrar** | Domain registration; renews May 10, 2027; auto-renew ON | Same dashboard → Domains → Registrations | Same |
| **GitHub** | Source code, `index.html` and the multi-page draft | https://github.com/michaelwlinton-coder/legacyworks | michaelwlinton-coder |
| **Calendly** | Booking funnel; embedded by URL on every "Book a Call" CTA | https://calendly.com/mlinton/legacy-works-discovery-call | mlinton |
| **aspireX Gmail** | Outbound email | https://mail.google.com (account: `mike@aspirex.org`) | AspireX |
| **Cloudflare Account ID** | Used in any URL or API call | `fbfb2f9109e237c24d2846a9619a4e63` | (it's just an ID) |
| **Cloudflare Pages project ID** | For API calls | `9ecc4a0d-c912-4a0b-bf10-3533590dc7e4` | (it's just an ID) |

**Quick deep-links** (bookmark these):

- Pages project: https://dash.cloudflare.com/fbfb2f9109e237c24d2846a9619a4e63/pages/view/legacyworks
- New deployment: https://dash.cloudflare.com/fbfb2f9109e237c24d2846a9619a4e63/pages/view/legacyworks/deployments/new
- Custom domains: https://dash.cloudflare.com/fbfb2f9109e237c24d2846a9619a4e63/pages/view/legacyworks/domains
- DNS for legacyworks.studio: https://dash.cloudflare.com/fbfb2f9109e237c24d2846a9619a4e63/legacyworks.studio
- GitHub repo: https://github.com/michaelwlinton-coder/legacyworks

---

## 4. Current state — what's deployed

**As of handoff:**

- A **single-page** site at `legacyworks.studio` (one self-contained `index.html`, all CSS and JS inlined, no build step).
- Hero, three-tier offering (Story Starter / Keeper / Legacy), CTA banner, footer. All five "Book a Call" buttons link directly to Calendly with `target="_blank" rel="noopener"`.
- SSL active (Google-issued cert through Cloudflare).
- Backup URL: `legacyworks.pages.dev`.
- Latest successful deployment: short ID `6c052b00` (see Cloudflare Pages → Deployments).
- The Cloudflare Pages project is **Direct Upload** type, not Git-connected (see Section 9 — open issue).

**Not yet on the site:**

- Favicon (browser shows default white square).
- Open Graph + Twitter card meta tags (link previews look broken on social).
- Analytics of any kind.
- Email capture / newsletter signup.
- Sitemap.xml at the root (one exists in the multi-page draft but isn't deployed).
- `robots.txt` at the root.
- A 404 page (Cloudflare just serves `index.html` for unknown paths right now).
- Multi-page version (drafts exist in `legacyworks-deploy/`).

---

## 5. The codebase

**Repo:** `michaelwlinton-coder/legacyworks`, branch `main`, one file: `index.html`.

**Stack:** intentionally vanilla — single HTML file, inlined CSS, no JS framework, no build step. The goal was "any human with a text editor can ship a change in five minutes." Don't introduce a build step unless we hit a real need (multi-page consolidation, partial reuse, etc.).

**Brand tokens** (referenced as CSS custom properties at the top of `index.html`):

```css
--charcoal: #1a1a1a;   /* dark backgrounds */
--cream:    #f5efe6;   /* cream backgrounds, text on dark */
--gold:     #c9a961;   /* primary accent / CTAs / brand mark */
--burgundy: #6d2e46;   /* rare secondary accent */
```

**Typography** (loaded from Google Fonts CDN, see `<head>`):
- **Cormorant Garamond** — serif, used for headlines (italic for emotional copy).
- **Inter** — sans-serif, used for body text and UI.

**Local files Mike will share with you** (in his Cowork outputs folder, packaged into a single folder for handoff):

| File | What it is | Status |
|---|---|---|
| `index.html` | Current production HTML (single-file build, 34 KB) | Deployed |
| `legacyworks-fixed.zip` | Ready-to-deploy zip of `index.html` | Backup of what's live |
| `legacyworks-deploy/` | Multi-page draft (11 files including `about.html`, `contact.html` with Calendly embed, `story-starter/keeper/legacy.html`, `404.html`, `sitemap.xml`, `robots.txt`, `assets/main.js`, `assets/styles.css`) | Not yet deployed; needs review |
| `legacyworks-single.html` | Earlier single-page build, before the link patches | Reference only |

---

## 6. How to deploy (current process — read carefully, the upload widget is picky)

Until we get Git-connected auto-deploy working, every change deploys via Direct Upload as a zip.

1. Edit `index.html` locally (or use the GitHub web editor).
2. Push the change to GitHub `main` first — **always** — so the repo stays the source of truth.
3. **Zip it.** The Cloudflare upload widget only accepts `.zip` files. Loose `.html` files are silently rejected (this is the cause of "deploy says success but the site is empty" — known gotcha).
   - Easiest: right-click the file → Send to → Compressed (zipped) folder.
   - The zip can contain just `index.html` or a folder structure. Use **store mode** (no compression) if your zip tool offers it — Cloudflare's JS unzipper has had issues with some DEFLATE outputs.
4. Open: https://dash.cloudflare.com/fbfb2f9109e237c24d2846a9619a4e63/pages/view/legacyworks/deployments/new
5. Drag the `.zip` onto the **"Drag in or click to upload"** zone.
6. Wait for the status: **"1/1 files uploaded · All files were successfully uploaded."** (For multi-file zips you'll see N/N files.)
7. Confirm Production is selected (it is by default).
8. Click **Save and deploy**. Goes live in ~10 seconds.
9. Hard-refresh the live site in your browser (Ctrl+Shift+R / Cmd+Shift+R) to bypass CDN cache.

**To roll back:** Deployments tab → three-dot menu on any prior successful deployment → "Rollback to this deployment."

---

## 7. Custom domain & SSL

`legacyworks.studio`:
- Registered through **Cloudflare Registrar** (same Cloudflare account).
- Auto-renew **ON**, expires May 10, 2027.
- Single DNS record in the `legacyworks.studio` zone:
  ```
  CNAME  legacyworks.studio → legacyworks.pages.dev   (proxied / orange cloud)
  ```
- SSL cert: Google CA, issued via Cloudflare's Universal SSL, auto-renews.
- HTTPS is enforced (Cloudflare's default for proxied records).

If you ever need to add subdomains (e.g., `app.legacyworks.studio` for a future booking app), do it in Cloudflare DNS, and add it to the Pages project's Custom Domains tab.

---

## 8. First-30-days priorities (technical)

These are the technical items the founder needs shipped, roughly in order. Don't wait for permission on any of them.

1. **Get Cloudflare Pages → GitHub auto-deploy working.** Currently the project is Direct Upload type. The Cloudflare GitHub App was failing with intermittent backend 502s the night we shipped. Retry the integration; if it works, every commit to `main` deploys automatically. If not, document the workaround and check again in a week — these CF integration bugs usually heal.
2. **Add a favicon.** A simple 32×32 PNG of the gold "L" mark on charcoal. Inline as `<link rel="icon" type="image/svg+xml" href="data:...">` (we did this in the multi-page draft — see `about.html`) or upload a separate file.
3. **Add Open Graph + Twitter Card meta tags.** Use the hero copy and a hero screenshot or branded card image. The site currently looks blank when shared on LinkedIn / iMessage.
4. **Deploy the multi-page version.** Review the `legacyworks-deploy/` folder, update content with the founder's input, ship it. Update the nav to use real `/about`, `/story-starter`, etc. routes instead of the current `#tiers` anchor.
5. **Lightweight analytics.** Recommended: **Plausible** or **Cloudflare Web Analytics** (free, privacy-respecting, zero cookies). Avoid GA4 unless we have a specific reason.
6. **Newsletter signup.** Pick a provider (Beehiiv, ConvertKit, Buttondown) and embed a one-field form on the homepage and footer. Even before we have a newsletter — just collect the list.
7. **`/robots.txt` and `/sitemap.xml`** at the root for SEO basics. Both exist in the multi-page draft.
8. **Performance baseline.** Run Lighthouse + WebPageTest. Document baseline scores. Inline-CSS approach should already be fast, but verify.

---

## 9. Known issues / debt

- **Cloudflare Pages is Direct Upload type, not Git-connected.** Conversion isn't possible — you'd create a new Git-connected project and migrate. Acceptable since the current project has only one deployment of significance.
- **No CI / no tests.** This is fine for a static site, but if we add any JS logic, add at least basic build checks.
- **Hard-coded Calendly URL.** Five places. If the URL ever changes, find-and-replace in `index.html`. Not worth abstracting yet.
- **No staging environment.** Pages supports preview deployments for non-main branches once Git-connected — set that up when you do #1.
- **The single-page version has links that resolve to the homepage anchor.** Fine short-term, but `<a href="#tiers">About</a>` is misleading; the multi-page version (priority #4) fixes this.

---

## 10. Tools you'll use day-to-day

- **GitHub** (web or CLI — your call). The repo is small enough that the web editor is genuinely fine.
- **A code editor** — VS Code recommended. The HTML is editable by anyone.
- **Cloudflare dashboard** — for DNS, deployments, custom domains, analytics.
- **A zip tool** — built-in OS one is fine.
- **Claude / Cowork** — Mike works in Cowork mode. If you have access, use it. Excellent for "look at this HTML and add OG tags" / "find broken links" / "convert this folder into a zip the Cloudflare uploader will accept." If you don't, normal Claude.ai works for most of it.
- **Lighthouse** (Chrome DevTools tab) — for perf and accessibility checks.
- **A password manager** — 1Password / Bitwarden. All credentials live there.

---

## 11. Conventions & house rules

- **GitHub is the source of truth.** Never deploy something to Cloudflare that isn't first committed to `main`.
- **Small, descriptive commits.** *"Update tier copy"*, *"Add OG meta tags"*, *"Fix Calendly link in footer"*. No `wip` or `fix` alone.
- **Don't introduce a build step** without discussing with Mike. The simplicity is deliberate.
- **Don't add tracking / cookies / analytics that require consent** without checking. We're privacy-leaning.
- **No third-party scripts** without justification. Right now we load Google Fonts and that's it. Keep it tight.
- **All public-facing changes go to Mike for a quick review** before ship, until you've done five deploys.

---

## 12. Your first week

**Day 1 (call with Mike, ~60 min):**
- Walk through this doc and the systems map together.
- Confirm access to GitHub, Cloudflare, Calendly, 1Password.
- Push a tiny test commit (update the footer copyright year) end-to-end.
- Do one full Direct Upload deploy with Mike watching.

**Days 2–3:**
- Add a favicon. Ship it.
- Add OG + Twitter Card tags. Ship it.
- Try the Cloudflare → GitHub integration (priority #1). Document what works, what doesn't.

**Days 4–7:**
- Review the multi-page draft (`legacyworks-deploy/`). Note what works, what's broken, what's missing copy.
- Stand up analytics (Plausible or CF Web Analytics).
- Add a newsletter signup form (stub it if you haven't picked a provider yet).
- End of week: share a written status update with Mike — what shipped, what's blocked, what's next.

By end of week 1, the site should have a favicon, link previews, analytics, and either Git auto-deploy working or a documented reason it isn't.

---

## 13. Who to ask

- **Mike Linton** — Founder. `mike@aspirex.org`. Text for urgent stuff. Weekly check-in Friday afternoons (default).
- **The Founding Operator** (if hired) — your peer on the business side. They'll bring you customer feedback, partner requests, content updates.
- **Cloudflare Support** — accessible from the dashboard. Generally fast and helpful for actual platform issues.
- **GitHub Support** — for any repo-level issues. Rare.

---

## 14. Final note

The whole company is one HTML file and a Calendly link right now. Keep it that way until there's a real reason not to. Speed of iteration > sophistication of architecture. If anything in this doc is wrong, fix it in the repo — the doc lives next to the code.

Welcome aboard.

— Mike
