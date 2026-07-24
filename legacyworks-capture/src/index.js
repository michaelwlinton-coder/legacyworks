/* ============================================================================
   LEGACYWORKS — WORKER API
   Runs on Cloudflare Workers, talks to a D1 database.

   ROUTES
     POST /api/submit           survey submission -> creates archive, returns link
     GET  /api/family/:slug     data for one archive page (public, no PII)
     POST /api/event            log a view / share / tier click
     GET  /api/admin/leads      all submissions (protected by ADMIN_KEY)
     PATCH /api/admin/lead/:id  update status/notes (protected)

   SECURITY NOTES
     - Archive slugs are random and unguessable; the archive endpoint never
       returns the submitter's email or internal notes.
     - Admin routes require the ADMIN_KEY secret in an x-admin-key header.
     - Basic per-IP rate limiting on submit to stop spam floods.
   ============================================================================ */

const JSON_HEADERS = { "Content-Type": "application/json" };

/* --- helpers ------------------------------------------------------------ */

function cors(env) {
  const origin = env.ALLOWED_ORIGIN || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-admin-key",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data, status, env) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { ...JSON_HEADERS, ...cors(env) },
  });
}

function bad(msg, env, status) {
  return json({ ok: false, error: msg }, status || 400, env);
}

/** Unguessable, readable slug: "eleanor-k4m2xq" */
function makeSlug(subjectName) {
  const base = String(subjectName || "family")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")[0]
    .slice(0, 14) || "family";
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789"; // no look-alikes
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let tail = "";
  for (const b of bytes) tail += alphabet[b % alphabet.length];
  return `${base}-${tail}`;
}

function clean(v, max) {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max || 2000);
}

function isEmail(s) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
}

const nowIso = () => new Date().toISOString();

/* --- rate limiting (best-effort, per IP per hour) ----------------------- */
async function rateLimited(env, ip) {
  if (!env.RATE_LIMIT) return false;          // KV binding optional
  const key = `rl:${ip}:${new Date().toISOString().slice(0, 13)}`;
  const current = parseInt((await env.RATE_LIMIT.get(key)) || "0", 10);
  if (current >= 10) return true;
  await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 3700 });
  return false;
}

/* --- routes ------------------------------------------------------------- */

async function handleSubmit(request, env) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (await rateLimited(env, ip)) {
    return bad("Too many submissions. Please try again later.", env, 429);
  }

  let body;
  try { body = await request.json(); }
  catch { return bad("Invalid request body.", env); }

  // honeypot: bots fill hidden fields
  if (clean(body.website)) return json({ ok: true, slug: "ignored" }, 200, env);

  const submitterName = clean(body.submitter_name, 120);
  const submitterEmail = clean(body.submitter_email, 200);
  const subjectName = clean(body.subject_name, 120);

  if (!submitterName) return bad("Please tell us your name.", env);
  if (!isEmail(submitterEmail)) return bad("Please enter a valid email address.", env);
  if (!subjectName) return bad("Please tell us who this story is about.", env);

  const urgencyText = clean(body.urgency, 500);
  const isUrgent = urgencyText ? 1 : 0;

  // unique slug (retry on the astronomically unlikely collision)
  let slug = null;
  for (let i = 0; i < 5; i++) {
    const candidate = makeSlug(subjectName);
    const hit = await env.DB.prepare("SELECT 1 FROM families WHERE slug = ?")
      .bind(candidate).first();
    if (!hit) { slug = candidate; break; }
  }
  if (!slug) return bad("Could not create your archive. Please try again.", env, 500);

  await env.DB.prepare(`
    INSERT INTO families (
      slug, submitter_name, submitter_email, relationship,
      subject_name, subject_called, birth_place, birth_year, places_lived,
      life_work, turning_points, proudest,
      story_always_told, story_heard_once, last_question, never_forget,
      urgency, is_urgent, visibility, status, created_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).bind(
    slug, submitterName, submitterEmail, clean(body.relationship, 80),
    subjectName, clean(body.subject_called, 80), clean(body.birth_place, 160),
    clean(body.birth_year, 40), clean(body.places_lived, 400),
    clean(body.life_work, 1000), clean(body.turning_points, 2000), clean(body.proudest, 1000),
    clean(body.story_always_told, 3000), clean(body.story_heard_once, 3000),
    clean(body.last_question, 2000), clean(body.never_forget, 2000),
    urgencyText, isUrgent, "private", "new", nowIso()
  ).run();

  return json({ ok: true, slug, url: `/a/${slug}` }, 201, env);
}

async function handleGetFamily(slug, env) {
  const row = await env.DB.prepare(`
    SELECT slug, relationship, subject_name, subject_called, birth_place,
           birth_year, places_lived, life_work, turning_points, proudest,
           story_always_told, story_heard_once, last_question, never_forget,
           visibility, created_at
    FROM families WHERE slug = ?
  `).bind(slug).first();

  if (!row) return bad("Archive not found.", env, 404);
  // deliberately excludes submitter email, notes, status, urgency
  return json({ ok: true, family: row }, 200, env);
}

async function handleEvent(request, env) {
  let body;
  try { body = await request.json(); } catch { return bad("Bad body.", env); }
  const slug = clean(body.slug, 80);
  const type = clean(body.event_type, 40);
  if (!slug || !type) return bad("Missing fields.", env);
  await env.DB.prepare(
    "INSERT INTO events (slug, event_type, detail, created_at) VALUES (?,?,?,?)"
  ).bind(slug, type, clean(body.detail, 200), nowIso()).run();
  return json({ ok: true }, 200, env);
}

function adminOk(request, env) {
  const key = request.headers.get("x-admin-key");
  return env.ADMIN_KEY && key === env.ADMIN_KEY;
}

async function handleAdminLeads(request, env) {
  if (!adminOk(request, env)) return bad("Unauthorized.", env, 401);
  const { results } = await env.DB.prepare(`
    SELECT f.id, f.slug, f.submitter_name, f.submitter_email, f.relationship,
           f.subject_name, f.urgency, f.is_urgent, f.status, f.notes, f.created_at,
           (SELECT COUNT(*) FROM events e WHERE e.slug = f.slug AND e.event_type='view') AS views
    FROM families f
    ORDER BY f.is_urgent DESC, f.created_at DESC
    LIMIT 500
  `).all();
  return json({ ok: true, leads: results || [] }, 200, env);
}

async function handleAdminUpdate(request, env, id) {
  if (!adminOk(request, env)) return bad("Unauthorized.", env, 401);
  let body;
  try { body = await request.json(); } catch { return bad("Bad body.", env); }
  const status = clean(body.status, 40);
  const notes = clean(body.notes, 4000);
  await env.DB.prepare(
    "UPDATE families SET status = COALESCE(?, status), notes = COALESCE(?, notes), updated_at = ? WHERE id = ?"
  ).bind(status, notes, nowIso(), id).run();
  return json({ ok: true }, 200, env);
}

/* --- entry point -------------------------------------------------------- */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(env) });
    }

    try {
      if (path === "/api/submit" && request.method === "POST") {
        return await handleSubmit(request, env);
      }
      if (path.startsWith("/api/family/") && request.method === "GET") {
        return await handleGetFamily(decodeURIComponent(path.split("/")[3] || ""), env);
      }
      if (path === "/api/event" && request.method === "POST") {
        return await handleEvent(request, env);
      }
      if (path === "/api/admin/leads" && request.method === "GET") {
        return await handleAdminLeads(request, env);
      }
      if (path.startsWith("/api/admin/lead/") && request.method === "PATCH") {
        return await handleAdminUpdate(request, env, path.split("/")[4]);
      }
      if (path === "/api/health") {
        return json({ ok: true, time: nowIso() }, 200, env);
      }
      return bad("Not found.", env, 404);
    } catch (err) {
      console.error("Worker error:", err && err.message);
      return bad("Something went wrong. Please try again.", env, 500);
    }
  },
};
