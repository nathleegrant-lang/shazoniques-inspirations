# Roadmap — the four prepared seams

Version 1.1 **prepares** the architecture for four things and **implements none of them**. That
is deliberate. Each seam below is real, typed, compiling code — not pseudo-code, not a stub that
breaks the build. Each one turns a future feature from a rewrite into an edit.

---

## 1. Reflection Artwork

**Prepared.** `lib/artwork.ts`, `public/images/reflections/`

The naming convention from Brand Guide v2.0 (`BC-001.png`, `RT-001.png`, `WB-001.png`,
`FFH-001.png`, `BBW-001.png`) lives in one module. `ReflectionPlate` resolves every image
through it.

**To turn on:** add the file, set `artwork` on the record. Per record, so a work-in-progress
image sitting in the folder can never leak onto the live site.

**Why not now:** the tracker reports "Not Started" for all 120 records. Until images exist, each
reflection renders a typeset plate tinted from its own Suggested Colour Palette.

---

## 2. Supabase

**Prepared.** `lib/content-source.ts`, `lib/types.ts`, `docs/future-supabase-plan.md`

`ContentSource` is the interface. `localSource` is the only implementation, backed by `data/`.
Its methods are already `async`, so a real database is not a breaking change.

**To turn on:** create the tables, implement `ContentSource` against Supabase, change one
assignment. No page or component changes.

**Why not now:** a database that serves the same 120 records to every visitor buys nothing and
adds a failure mode, a bill, and a secret to manage.

---

## 3. CMS

**Prepared.** `lib/cms/schema.ts`

Describes what is editable, which fields are required, and — critically — which may be empty. A
future admin form is **generated from this description**, so the form and the content model
cannot drift apart.

**To turn on:** Supabase Auth, an `admins` table, a protected `/admin` route rendering the
schema.

**Why not now:** editing `data/books.ts` and pushing to GitHub is faster than any admin panel
for a handful of changes a year — and it cannot go down. Build the CMS when someone who does not
use Git needs to publish.

**Depends on:** Supabase.

---

## 4. Email Reflections

**Prepared.** `lib/email/reflection-email.ts`

`buildReflectionEmail()` is a pure function: give it a reflection, get back subject, preheader,
plain text, and HTML. No side effects, testable today. `Subscriber` models double opt-in and a
one-click unsubscribe token, because retrofitting consent is painful and shipping without it is
worse.

**To turn on:**
1. A `subscribers` table.
2. A provider (Resend, Postmark, SendGrid) and its API key.
3. A scheduled route: `reflectionForDate()` → `buildReflectionEmail()` → `send()`.

Step 3 is roughly twenty lines, because the hard part — what the message actually says — is
already written.

**Why not now:** sending mail means a provider, a bill, a deliverability reputation, and a legal
obligation around consent and unsubscribes. That is a real commitment, not a feature toggle.

**Depends on:** Supabase (for the subscriber list).

---

## Suggested order

1. **Artwork** — no dependencies, biggest visible gain.
2. **Author portraits and the five missing book descriptions** — not engineering, just content,
   and the site is visibly incomplete without them.
3. **Supabase** — only once scheduling or non-developer publishing is genuinely needed.
4. **CMS**, then **Email** — both build on Supabase.
