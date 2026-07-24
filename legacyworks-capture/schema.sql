-- ============================================================================
-- LEGACYWORKS — DATABASE SCHEMA (Cloudflare D1 / SQLite)
--
-- Run once to create the tables:
--   npx wrangler d1 execute legacyworks --remote --file=./schema.sql
--
-- Two tables:
--   families  — one row per survey submission = one archive page
--   events    — a simple log (who viewed what, when) so you can see engagement
-- ============================================================================

DROP TABLE IF EXISTS families;
DROP TABLE IF EXISTS events;

CREATE TABLE families (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,

  -- the URL: legacyworks.studio/a/<slug>  (unguessable)
  slug              TEXT    NOT NULL UNIQUE,

  -- who filled the survey (the lead)
  submitter_name    TEXT    NOT NULL,
  submitter_email   TEXT    NOT NULL,
  relationship      TEXT,              -- "daughter", "grandson"...

  -- who the story is about
  subject_name      TEXT    NOT NULL,
  subject_called    TEXT,              -- what the family calls them
  birth_place       TEXT,
  birth_year        TEXT,
  places_lived      TEXT,

  -- their life
  life_work         TEXT,
  turning_points    TEXT,              -- free text, may hold several
  proudest          TEXT,

  -- the emotional core (these drive the page)
  story_always_told TEXT,
  story_heard_once  TEXT,
  last_question     TEXT,
  never_forget      TEXT,

  -- qualifying
  urgency           TEXT,              -- health / milestone / none
  is_urgent         INTEGER DEFAULT 0, -- 1 if they flagged urgency (for your follow-up list)

  -- housekeeping
  visibility        TEXT    DEFAULT 'private',  -- 'private' | 'public'
  status            TEXT    DEFAULT 'new',      -- new | contacted | customer | archived
  notes             TEXT,                       -- your internal notes
  created_at        TEXT    NOT NULL,
  updated_at        TEXT
);

CREATE INDEX idx_families_slug    ON families(slug);
CREATE INDEX idx_families_created ON families(created_at DESC);
CREATE INDEX idx_families_urgent  ON families(is_urgent, created_at DESC);

-- simple engagement log: did they open their archive? how often?
CREATE TABLE events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL,
  event_type  TEXT NOT NULL,     -- 'view' | 'share_copy' | 'tier_click'
  detail      TEXT,
  created_at  TEXT NOT NULL
);

CREATE INDEX idx_events_slug ON events(slug, created_at DESC);
