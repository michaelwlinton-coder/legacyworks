# LegacyWorks Capture System — Setup

A survey that captures a family's written story, generates them a private archive
page showing what's still missing, and pitches the three tiers.

**Files**

| File | What it is |
|---|---|
| `schema.sql` | Database tables |
| `src/index.js` | The API (Cloudflare Worker) |
| `wrangler.toml` | Worker config |
| `public/survey.html` | The survey people fill in |
| `public/archive.html` | Their generated archive page |
| `public/admin.html` | Your lead dashboard |
| `public/_redirects` | Makes `/a/<slug>` work |

---

## Part 1 — The API (about 20 minutes)

Do these in a terminal, in this folder.

**1. Log in to Cloudflare**
```
npx wrangler login
```

**2. Create the database**
```
npx wrangler d1 create legacyworks
```
It prints a `database_id`. Copy it into `wrangler.toml` where it says
`PASTE_YOUR_DATABASE_ID_HERE`.

**3. Create the tables**
```
npx wrangler d1 execute legacyworks --remote --file=./schema.sql
```

**4. Set your admin password**
```
npx wrangler secret put ADMIN_KEY
```
Type any long random password. **Save it somewhere** — it's how you log into
the leads dashboard.

**5. Deploy**
```
npx wrangler deploy
```
It prints your API address, something like
`https://legacyworks-api.michael-w-linton.workers.dev`. **Copy it.**

**6. Check it works** — open that address with `/api/health` on the end.
You should see `{"ok":true,...}`.

---

## Part 2 — The pages (about 10 minutes)

**1. Put your API address into the three pages.**
In `survey.html`, `archive.html`, and `admin.html`, find this line near the
bottom and replace the URL with the one from step 5:
```js
const API_BASE = "https://legacyworks-api.michael-w-linton.workers.dev";
```

**2. Upload the `public` folder to Cloudflare Pages.**
Either add these files to your main site repo, or create a new Pages project
and upload the folder. The `_redirects` file must go with them — it's what
makes `/a/<slug>` links work.

**3. Test the whole flow:**
- Visit `/survey.html` and fill it in
- You should land on a success page with a link
- Open that link — you should see the archive with the gaps and tiers
- Visit `/admin.html`, enter your admin key, and see the lead

---

## Part 3 — Lock it down (5 minutes, do before sharing widely)

**Restrict the API to your site.** In `wrangler.toml` change:
```toml
ALLOWED_ORIGIN = "https://legacyworks.studio"
```
then `npx wrangler deploy` again.

**Add rate limiting** (stops spam floods):
```
npx wrangler kv namespace create RATE_LIMIT
```
Paste the id into `wrangler.toml`, uncomment the `kv_namespaces` block, deploy again.

---

## How you'll actually use it

1. Someone fills in the survey
2. They immediately get their private archive link
3. You see them in `/admin.html` — **urgent leads sort to the top**, and you can
   see how many times they've opened their archive
4. You follow up. Someone who opened theirs five times is ready to talk.

**Set status as you go**: new → contacted → customer.

---

## What this does NOT do yet

**It doesn't email them the link.** The success page shows it and says "we've
also emailed this" — that line is currently a promise you have to keep by hand,
so either send it manually, or remove that line until email is wired up.
Automatic email needs a sending service (MailerLite/Resend) and a verified
domain — that's the next piece of work.

**Archives are private-by-obscurity.** The slug is unguessable and the page is
noindex, but anyone with the link can read it. That's fine for family sharing —
just don't describe it to people as "secure".
