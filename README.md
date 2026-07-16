# Shazonique's Inspirations

**Heart's Home of Hope**

The digital home of Shazonique's Inspirations — a publishing and creative ministry founded by
**Nathlee R. Grant** and **Zowayne O. Williams**, equal founding authors.

It exists to serve readers through books, reflections, education, family devotions, civic
thought, creative writing, and resources that inspire faith, hope, wisdom, and purposeful
living.

**Version 2.3 — SEO Final Polish**

---

## Contents

- [The design language](#the-design-language)
- [Installation](#installation)
- [Build](#build)
- [Deployment](#deployment)
- [Folder structure](#folder-structure)
- [Reflection data](#reflection-data)
- [Content editing](#content-editing)
- [Future Supabase migration](#future-supabase-migration)
- [Quality gates](#quality-gates)

---

## The design language

Full detail in **`docs/design-language.md`**. In short:

**The logo leads.** The supplied mark is not redesigned, recoloured, or reinterpreted. Every gold
in the site was sampled from its own gradient (deep `#B29535` → mid `#E2C254` → light `#F6EABA`),
so the site inherits the mark rather than approximating it.

**The house has rooms.** The homepage is a sequence of eight rooms, not a stack of sections. Warm
black and cream alternate: the dark rooms are where the mark lives and where one reflection can
hold a whole screen; the light rooms are where the reading happens.

**Nothing shouts.** No loud colour, no bounce, no spin. Motion is a 1.2-second settle, once, and
it is switched off entirely for anyone whose system asks for reduced motion.

**Reflection pages are sacred spaces.** No sidebar, no related grid, no newsletter box. The
words, who wrote them, where they came from, a way to share, and a door to the next one.

**Whitespace is part of the design** — and so is contrast. Every text colour clears WCAG AA
against the surface it sits on. Elegance never costs readability.

---

## Installation

**Requires Node 20.9 or newer.** Check with `node -v`.

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

There are no environment variables, no database, no API keys, and no paid services. The site
runs entirely on typed local data. `.env.example` documents variables that only become relevant
if you later implement Supabase or email — the site builds and runs with that file absent.

### Stack

| | |
| --- | --- |
| Next.js | 16.2 (App Router, Turbopack) |
| React | 19.2 |
| TypeScript | 6.0 |
| Tailwind CSS | 4.3 |
| ESLint | 9.39 (flat config) |

**On version pinning.** TypeScript 7 and ESLint 10 are published, but neither is compatible with
this toolchain yet: Next 16 cannot detect TypeScript 7 and aborts the build, and the ESLint
plugins bundled inside `eslint-config-next` declare support only up to ESLint 9. The versions
above are the newest that install with **zero peer conflicts and zero npm warnings**. Revisit
when `eslint-config-next` widens its peer ranges.

---

## Build

```bash
npm run build      # production build — must pass before deploying
npm start          # serve the production build locally
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm audit          # must report 0 vulnerabilities
```

The build statically generates **147 pages**, including all 120 reflections, 10 book pages, and
2 author pages. If that number falls, content has been lost — investigate before deploying.

---

## Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Shazonique's Inspirations v2.1"
git branch -M main
git remote add origin https://github.com/<you>/shazoniques-inspirations.git
git push -u origin main
```

### 2. Deploy on Vercel

1. **vercel.com → Add New → Project**, and import the repository.
2. Vercel detects Next.js. **Change nothing.**
3. **No environment variables are required.**
4. **Deploy.**

Every push to `main` redeploys. Every pull request gets a preview URL.

### 3. Set the domain

**Project → Settings → Domains.** Vercel supplies the DNS records.

Then set `SITE.url` in `data/site.ts` to the live domain. **Do not skip this.** It is what
`sitemap.xml`, `robots.txt`, canonical URLs, and every social preview card are built from. Left
unchanged, shared links will point at the placeholder domain.

### 4. After launch

- Submit `https://<domain>/sitemap.xml` to Google Search Console.
- Share one reflection link on WhatsApp and Facebook; confirm the preview card renders.

### Rollback

**Vercel → Deployments → last good build → Promote to Production.** Instant.

---

## Folder structure

```
shazoniques-inspirations/
├── app/                    Routes (App Router) — one folder per page
│   ├── page.tsx            Home — daily reflection, both authors
│   ├── reflections/        Library, filters, and /reflections/bc-001 … bc-120
│   ├── books/              Catalogue and one page per book
│   ├── authors/            Both authors, equal weight
│   ├── devotions/          Family Devotions index
│   ├── education/          PEP platforms and teaching resources
│   ├── ideas/              Ideas & Essays
│   ├── arts-media/         Arts & Media
│   ├── community/          #RaiseThemRight and community work
│   ├── contact/            Google Forms — comment, review a book
│   ├── about/              The ministry and its purpose
│   ├── sitemap.ts          Generated from the data — never hand-edited
│   └── robots.ts
│
├── components/             Shared UI
│   └── ReflectionPlate.tsx The signature element (see below)
│
├── data/                   ALL CONTENT LIVES HERE
│   ├── reflections.ts      120 records, generated from the tracker
│   ├── books.ts            10 books + every purchase link
│   ├── authors.ts          Both biographies
│   └── site.ts             Name, slogan, external links, collections
│
├── lib/
│   ├── types.ts            Content models — shaped as future Supabase tables
│   ├── reflections.ts      Daily rotation, filtering, facets
│   ├── palettes.ts         The nine colour palettes from the tracker
│   ├── artwork.ts          <- prepared: Reflection Artwork
│   ├── content-source.ts   <- prepared: Supabase
│   ├── cms/schema.ts       <- prepared: CMS
│   └── email/              <- prepared: Email Reflections
│
├── public/images/
│   ├── covers/             Book covers
│   ├── education/          Education artwork
│   ├── authors/            Portraits (awaiting files)
│   └── reflections/        Artwork (awaiting files)
│
├── scripts/
│   └── reflections_from_xlsx.py   Tracker spreadsheet -> TypeScript
│
└── docs/
    ├── content-migration.md     What moved, what changed, what's outstanding
    ├── content-management.md    How to add books, reflections, collections
    ├── deployment.md            Deployment in detail
    ├── future-supabase-plan.md  The migration, table by table
    └── roadmap.md               The four prepared seams
```

**To change content, edit `data/`.** You should never need to open a component to add a book, a
reflection, or a link.

---

## Reflection data

120 reflections from the *Breaking Chains* asset library, converted **verbatim** from the
tracker spreadsheet. Every field is a column in that sheet. Nothing is invented.

Each has a permanent page: `/reflections/bc-001` through `/reflections/bc-120`.

### The daily rotation

One reflection is featured each day. The rotation is a **pure function of the calendar date**
(`lib/reflections.ts` → `reflectionForDate`). No database, no cron job, no randomness — the
build, the server, and any cache all agree on "today", and a given date always yields the same
reflection.

With 120 records the library cycles roughly every four months. **Adding a collection lengthens
the cycle automatically.** No logic changes.

### Regenerating from the spreadsheet

```bash
pip install openpyxl
python3 scripts/reflections_from_xlsx.py Breaking_Chains_Tracker.xlsx > data/reflections.ts
```

Edit the spreadsheet, regenerate, commit. Do not hand-edit `data/reflections.ts`.

### Artwork

No artwork exists yet — the tracker reports "Not Started" for all 120 records. Rather than ship
120 identical grey placeholders, each reflection renders as a **typeset plate tinted from its
own Suggested Colour Palette** (`lib/palettes.ts`). There are nine palettes, so the library
reads as designed on day one.

To publish a real image:

1. Add the file — `public/images/reflections/BC-001.png`
2. Set the field — `artwork: "/images/reflections/BC-001.png"`

The photograph replaces the plate. Nothing else changes. Opting each record in explicitly means
a work-in-progress file sitting in the folder can never appear on the live site.

---

## Content editing

Full detail in **`docs/content-management.md`**. The rules that matter:

**Never fabricate.** A field with no confirmed content stays `null`, and the page omits that
block. An empty section is honest; invented prose is not. This applies to descriptions,
excerpts, quotes, statistics, and reviews alike.

**Missing assets degrade gracefully, never break.**

- A book with no cover renders a typeset fallback plate — never a broken image.
- A book with no purchase links falls back to that author's Barnes & Noble storefront — a real
  destination, not a dead button.
- An author with no portrait renders a monogram plate. (Both portraits are now supplied.)
- A reflection with no artwork renders its palette plate.

**Both authors are equal founders.** Nathlee's work is never filed under Zowayne's name, nor his
under hers. *Quotes From and For L-I-F-E* is co-authored and appears under both.

**The slogan is fixed brand, not editable copy.** It reads *Heart's Home of Hope*. Nothing else.

---

## Future Supabase migration

Full plan in **`docs/future-supabase-plan.md`**.

Version 1.1 uses typed local data on purpose: it is fast, free, has no failure mode, and needs
no secrets. **Move to a database when a real need appears** — publishing a reflection without a
developer, scheduling ahead, or tracking artwork production from a browser. Not before.

The architecture is already prepared. `lib/types.ts` was shaped as Supabase tables, and
`lib/content-source.ts` defines a `ContentSource` interface. Today the only implementation is
`localSource`, backed by `data/`. To migrate:

1. Create the tables and import `data/`.
2. Implement `ContentSource` against Supabase.
3. Change **one assignment** in `lib/content-source.ts`.

No page and no component is touched. The interface methods are already `async`, so the swap is
not a breaking change.

**Keep static rendering.** Do not turn the site into a client-side app to get a database — use
server components with `export const revalidate = 3600`.

---

## Quality gates

Every one of these passes on this release. Run them before any deploy.

```
npm install        0 warnings, 0 peer conflicts
npm run build      compiles, 147 static pages
npm run lint       0 errors, 0 warnings
npm run typecheck  0 errors
npm audit          0 vulnerabilities
```

### Content checks

- [ ] Every book is attributed to the correct author.
- [ ] No book shows a description, excerpt, or statistic the authors did not write.
- [ ] Every purchase link opens a real, live product page.
- [ ] Reflection text matches the tracker word for word.
- [ ] Both authors appear on the homepage with equal weight.
- [ ] The slogan reads exactly **Heart's Home of Hope**.
- [ ] Today's reflection renders, and its permanent page resolves.
- [ ] The mobile menu opens and closes.
- [ ] No broken images anywhere.

---

## Still outstanding

Listed in full in `docs/content-migration.md`. The two that matter:

- **Nathlee's portrait is low resolution.** It is in place and it works, but her source
  file is small — see `docs/content-migration.md`. A higher-resolution original would
  visibly improve the Authors room.
- **Five books have no description.** *The Conspiracy*, *What the Devil Meant for Evil*, *Pack
  from Snowy Valley*, *Bits and Bites of Truth and Wisdom*, *Heaven Met Me*. Their pages show
  the cover, title, author, and the author's storefront — and omit the description rather than
  invent one.

Also: *The Kings' — The Legacy Begins* has no cover image, and the Family Devotions exist only
as graphics on the old Google Site, with no extractable text.
