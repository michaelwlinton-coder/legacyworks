# LegacyWorks — Team Onboarding

**For new team members joining the business side.**

Last updated: August 2026 · By: Mike Linton (Founder, mike@aspirex.org)

---

## Welcome

You're joining LegacyWorks at the point where the foundation is built and the company is ready to start finding customers. This doc covers why we exist, what we sell, everything that's actually been built so far, and where things stand today. Read it start to finish before your first call with Mike.

---

## 1. Why LegacyWorks exists

> *"The next generation should never have to wonder what their grandmother sounded like."*
> — the reason this company exists.

Every family has a story. Most of those stories will be lost forever — not because anyone stopped caring, but because the moment to capture them never quite came, and then it was too late.

Ninety-nine million Americans are 55 or older. The tools to capture a life have never been better — better cameras, better software, cheaper storage. What's missing isn't technology. It's a clear, beautiful, accessible way for a family to actually sit down and do it.

**Our mission:** we believe the most universal human need is to be remembered. We believe every life is worth a film. We believe a hardcover legacy book matters more than another year-end gift.

**Who we serve:**
- Adult children and grandchildren who want to capture a parent or grandparent's story before it's too late.
- Aging individuals who want to leave a legacy on their own terms.
- Funeral homes, hospices, retirement communities, and estate/wealth advisors who want to offer families something more meaningful than what they currently provide.
- Family historians and genealogists who have the names and dates but not the voice behind them.

**Three principles guide every project:**
1. **Emotional depth over slick production.** The best legacy films aren't the ones with the prettiest color grading — they're the ones that captured the moment your grandmother laughed about something she'd never told anyone before.
2. **Formats families actually use.** A two-hour interview tape sitting on a hard drive is not a legacy. We deliver short films, shareable episodes, hardcover books, and highlight reels.
3. **Premium without pretension.** The craft of a documentary studio, the warmth of a family album. Premium, but never cold.

From founder Mike Linton: *"LegacyWorks is the company I wish had existed for my own family. We're building it now so the next generation never has to wonder."*

---

## 2. What we sell — the three tiers

LegacyWorks meets families at every budget, from a $895 DIY kit to a $100,000 commissioned documentary. All three tiers deliver the same underlying promise — a preserved voice, on film, kept forever — at different levels of involvement and craft.

| Tier | Price | What it is |
|---|---|---|
| **Story Starter** | $895 (includes a free tested filming kit — camera, mic, light, hub — for the first 50 founding families) | Do-it-yourself. 52 guided interview questions across life chapters, a tested equipment guide, step-by-step recording & editing tutorials, AI editing workflow (Descript/CapCut/Riverside), a story-structure template, and access to a private community. The family films it themselves. |
| **Story Keeper** | $2,500–$4,995 | Coached, done-for-you. A trained Story Coach runs 6–8 weekly interviews. LegacyWorks handles all editing. Family receives a video series, a professionally designed hardcover Life Story Book, a USB keepsake, and a 15–20 min Legacy Highlight Film. Founding families also get extra hardcover copies, complimentary photo restoration, and priority scheduling. |
| **Story Legacy** | $25,000–$100,000 | The cinematic commission. A dedicated Producer + Creative Director, a 45–90 minute feature-length documentary, multiple production visits over 3–6 months, original music scoring, interviews with family/friends/colleagues, a premium hardcover Legacy Book, and a private screening. We take on only a limited number of these per year. |

A **Partners program** exists for funeral homes, hospices, retirement communities, and estate/wealth advisors to refer families in exchange for a revenue share — we handle everything, they make the introduction.

---

## 3. Everything that's built (as of this doc)

The site has grown well past a single page. Here's the full current state, live at **legacyworks.studio**.

### The core site
- **Homepage** — mission framing, the "why now" case, all three tiers laid out with pricing, a link to the tier-matching quiz.
- **Story Starter / Story Keeper / Story Legacy** — full sales pages for each tier, each with its own pricing, comparison tables, and founding-member incentives.
- **About** — the mission/vision page quoted above, plus a founder's note from Mike.
- **Family Historians** — a page built specifically for the genealogy/family-tree audience, arguing that a recorded voice is a primary source records alone can't give you.
- **How We Preserve**, **Link to Family Tree**, **Contact**, **Privacy**, **Terms** — supporting pages.

### Conversion & lead-gen
- **Quiz** — a short interactive quiz that matches a visitor to the right tier based on how hands-on they want to be, their timeline, and their budget.
- **Gift** — a dedicated flow for buying LegacyWorks as a gift (milestone birthdays, anniversaries, retirement, etc.), including a printable gift certificate.
- **Free Guide** — a lead magnet: "10 Questions to Ask Before It's Too Late," a free PDF guide with the questions families most regret never asking.
- **Partners** — the referral-partner pitch described above.
- **Order** — the Story Starter checkout confirmation page.

### The equipment guide
A detailed, standalone guide (`story-starter-equipment-tiers.html`) covering four budget levels of DIY filming gear (Good/Better/Best/Pro — from "use your phone" to a Sony ZV-1 II cinema setup), each with a full setup-instructions section. **Every piece of gear now has a real, verified video tutorial embedded** showing exactly how to set it up.

### Social proof
A real family's story (filmed with their permission) is used as proof-of-concept across the site — a featured piece on the Story Keeper page plus placements on the homepage and the Family Historians page. **Note:** these video embeds are currently switched off (commented out, not deleted) at Mike's request — the surrounding page copy and layout are unaffected, the videos just aren't playing publicly right now.

### The survey-to-archive capture system
A separate, fully working lead-capture funnel — live at **legacyworks-capture.pages.dev**, not yet linked from the main site:
- A **survey** where a visitor can write down what they know about a loved one's story, free, no commitment.
- This automatically generates a **private archive page** for that family, showing what they wrote — and, more importantly, showing what's *missing* (their voice, their face on film, their photographs) as the natural next step into paying for Story Keeper or Story Legacy.
- An **admin dashboard** where leads can be reviewed, flagged urgent, and tracked by how many times a family has reopened their archive (a real buying signal — someone who reopens it five times is ready for a call).

This is fully built and tested end-to-end but **not yet connected to the main site** — nothing currently links a visitor from legacyworks.studio into the survey.

---

## 4. What's NOT done yet (be honest about this with anyone asking)

- **The capture system isn't linked from the main site.** It exists and works, but no nav link or CTA points to it yet.
- **Email isn't wired up.** The newsletter signup (footer, every page) and the free-guide PDF delivery both show a "success" message on submit, but no email actually goes out yet — that needs a provider (Mailchimp/ConvertKit/similar) connected.
- **Some checkout links are placeholders.** Not every "buy" button points at a real, live payment page yet.
- **Social-proof videos are switched off** (see above) — deliberate, not a bug.

---

## 5. How a customer moves through this today

1. They land on the homepage (or a tier page, or the equipment guide, via search/social/referral).
2. They either explore a specific tier directly, take the **quiz** to get matched, or start the free **survey** to begin writing down what they know.
3. Every path leads to **"Book a Call"** — a discovery call is how every sale currently starts.
4. Partners (funeral homes, advisors) refer families directly, which also routes to a discovery call.

There is currently no self-serve checkout for the higher tiers (Keeper, Legacy) — those are relationship sales that start with a call. Story Starter is the one tier designed to be bought directly online.

---

## 6. Systems & access you'll likely need

| System | What it's for | Ask Mike for access |
|---|---|---|
| **Calendly** | Where every "Book a Call" CTA sends people | Yes, if you'll be handling bookings |
| **legacyworks-capture admin dashboard** | Viewing/managing leads from the survey funnel | Yes, if you're doing follow-up/sales |
| **aspireX Gmail** (`mike@aspirex.org`) | Outbound email | Maybe, depending on your role |
| **The website itself** | Read it, use it, know it cold | No login needed — it's public |

If your role touches code, deployments, or the technical backend, that's a different (and separate) onboarding — ask Mike, and he'll route you to the technical documentation instead.

---

## 7. Brand voice, quick reference

- **Tone:** warm, unhurried, emotionally direct — never salesy or urgent-sounding, even when there's real urgency (aging parents, limited time).
- **Visual identity:** charcoal + cream + gold. Serif display type (Cormorant Garamond) for emotional headlines, clean sans-serif (Inter) for everything functional.
- **The line that captures it best:** *"Capture. Preserve. Remember."*
- Copy leans on specific, human detail over abstraction — "the sound of their laugh telling a story you'd never heard" rather than "preserve memories."

---

## 8. Your first two weeks

**Week 1:**
- Read this doc, then the site itself — every tier page, the quiz, the gift flow, the equipment guide.
- Get a walkthrough call with Mike covering the current pipeline and where leads actually come from today.
- Sit in on (or listen to a recording of) a discovery call if one is happening.

**Week 2:**
- Understand the gap between "what's built" (Section 3) and "what's live for customers" (the capture system isn't linked yet, email isn't wired) — these are likely your first real priorities.
- Start whatever your actual role is: outreach, partner development, content, sales follow-up.

---

## 9. Who to ask

- **Mike Linton** — Founder. `mike@aspirex.org`. Owns brand, pricing, and final say on anything customer-facing.
- Anything technical (deploys, the codebase, the Cloudflare/D1 backend) routes through Mike to whoever owns that side — this doc intentionally doesn't cover it.

Welcome aboard.

— Mike
