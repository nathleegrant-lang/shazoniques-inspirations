# The design language — Version 2.0

Version 1.1 established the architecture. Version 2.0 is about how the house *feels* to be in.

The test applied to every decision below: **would someone feel more hopeful after five minutes
here?** Where the answer was no, it changed.

---

## The logo leads

The supplied mark is not redesigned, recoloured, or reinterpreted. One production step was
applied: the flat black background was removed by flood-filling inward from the borders, so the
mark can sit on a light surface. The artwork itself is untouched — including the black text
*inside* the white tagline bar, which a naive black-key would have erased.

Two files:

- `public/images/brand/logo.png` — transparent, usable on any surface
- `public/images/brand/logo-on-black.png` — the original, unaltered

**Every gold in the site was sampled from the logo's own gradient**, not chosen to sit near it:

| | |
| --- | --- |
| `gold-deep` `#8A6D22` | text-safe on cream (4.5:1) |
| `gold` `#B29535` | the deep end of the mark's gradient |
| `gold-soft` `#E2C254` | its midpoint — the gold that reads on black |
| `gold-light` `#F6EABA` | its highlight |

The site inherits the mark. It does not approximate it.

---

## Two kinds of room

**Warm black** (`#0B0A09`) and **cream** (`#FAF5EA`), alternating.

The dark rooms are where the mark lives natively and where a single reflection can hold an entire
screen. The light rooms are where the reading happens. The header and footer are both warm black,
so every page is framed top and bottom the way a gallery frames a wall — and the logo never has a
contrast problem, on any page, at any scroll depth.

Gold is the thread between them. **It is never used for large areas** — only rules, small
capitals, and moments of light.

---

## The homepage is a sequence of rooms

Full-screen hero: the mark, the slogan, one sentence, one door. Nothing else. Then eight rooms,
each doing one thing, each given real air:

| | |
| --- | --- |
| One | Who we are |
| Two | Today's reflection *(dark)* |
| Three | Meet the authors |
| Four | Books |
| Five | Family devotions *(dark)* |
| Six | Education |
| Seven | Ideas |
| Eight | Community |

Nobody is asked to do anything until Room One has finished speaking.

**Room Three is equal by construction, not by promise.** Both authors get the same column width,
the same portrait size, the same weight of type. Neither can dominate the other by accident of who
sent a photograph first — which matters, because neither has sent one yet.

---

## Typography

**Cormorant Garamond** for display. A Garamond cut that only comes alive when it is set large,
light, and given air — which is the whole brief. It is never used small, because at small sizes a
light weight reads as weakness rather than elegance.

**Jost** for everything else. A geometric sans in the Futura lineage — 1927, so timeless rather
than trendy — and the closest thing to the wide-tracked capitals in the logo's own "INSPIRATION"
lockup. The `.lockup` class (11px, `0.32em` tracking) is the logo's typographic voice, reused.

---

## Motion

**Animations should almost disappear.** A 1.2-second opacity-and-16px settle, once, when a
section is first reached. It never replays on scroll back. Nothing bounces, nothing slides,
nothing spins.

Two safeguards:

- **`prefers-reduced-motion`** removes all of it.
- The hidden state is scoped to `html.js`, set by an inline script before first paint. **With
  JavaScript disabled, every section is simply visible.** The reveal is an enhancement, never a
  gate on reading.

The one continuous animation on the site is the hero's scroll cue, which breathes on a 4.5-second
cycle. That is the pace of a calm breath, and it is deliberate.

---

## Reflection pages are sacred spaces

No sidebar. No related-content grid. No newsletter box. No breadcrumbs.

A reflection is one or two sentences and it is asking the visitor to stop — so the page stops too.
What remains: the words (the largest thing on the screen), who wrote them, the book they came
from, a way to pass them on, and a door to the next one.

---

## The nine palettes, re-tuned

Every reflection carries a Suggested Colour Palette from the tracker. There are nine, and they
are the reason 120 reflections do not need 120 photographs to look considered.

**Version 2.0 re-tuned all nine.** The first pass rendered them as the spreadsheet literally
described them — saturated sunrise oranges, a bright burgundy. Held next to the logo they were
loud, and loud is the one thing this house is not.

Each palette is now a *whisper* of its colour over warm paper or warm dark. Warm Sunrise is still
unmistakably Warm Sunrise. It simply no longer raises its voice, and the reflection is always the
loudest thing on the plate.

---

## Collection personalities

Five collections, five moods — expressed with restraint. A single accent, a hairline, a label.
**Never a themed page.**

| Collection | Accent | Mood |
| --- | --- | --- |
| Breaking Chains | clay `#9A6455` | Warm, healing, gentle |
| Rooted | moss `#35543F` | Earth, nature, kingdom |
| Waiting for the Bridegroom | midnight `#1B2447` | Midnight, light, expectation |
| Faith Finds Home | morning `#B5813F` | Warm morning, ordinary beauty, purpose |
| Bits & Bites | slate `#3A3733` | Elegant, minimal, quiet wisdom |

The house is one house. Gold and cream hold it together.

---

## Contrast

Elegance never costs readability. Every text colour clears **WCAG AA** against the surface it sits
on — including the small capitals, which were darkened during this release specifically because
they did not.

| | |
| --- | --- |
| Body ink on cream | 14.8:1 |
| Soft ink on cream | 7.1:1 |
| Caption ink on cream | 4.8:1 |
| Gold labels on cream | 4.5:1 |
| Light ink on warm black | 15.6:1 |
| Gold on warm black | 11.4:1 |

---

## Mobile

The mobile menu is not a shrunken desktop menu. Each destination gets a full line, a serif face at
24px, and enough room to be tapped without care. Rooms keep their vertical air on small screens
(`clamp(6rem, 14vh, 11rem)`) because air is the design, and removing it on a phone would remove
the point.

---

# Version 2.1 — the four refinements

## Homepage

The hero now carries five things and nothing else: the mark, the name, the slogan, one sentence,
one door.

> Where books inspire, reflections encourage, ideas flourish, and hope finds a home.

**The hero image is drawn, not photographed.** The brief asked for sunrise, gentle light, and hope,
and warned against obvious stock photography — so `components/HeroDawn.tsx` is original SVG: a
horizon only just beginning to warm, and the logo's *own four-point star*, repeated three times at
three sizes. Nothing was licensed, borrowed, or searched for. It is made of the same two things
the logo is made of: gold, and a great deal of dark.

It is also deliberately almost nothing, because **the logo has to be the brightest object on the
screen**, and it is.

**To use a real photograph instead:** drop it in `/public/images/brand/` and set `HERO_IMAGE` in
`data/site.ts` to its path. The homepage switches automatically and dims it behind a warm-black
scrim so the mark still leads. No component changes.

## Navigation

Nine flat links became **six doors**. Not one route was removed — every destination is still one
or two clicks away.

| Door | Behind it |
| --- | --- |
| Reflections | — |
| Books | All books · Nathlee's · Zowayne's |
| Authors | Both authors · Nathlee R. Grant · Zowayne O. Williams |
| Explore | Devotions · Education · Ideas · Arts & Media · Community |
| About | — |
| Contact | — |

The grouping itself now says what the navigation should say: **both founding authors are named in
the menu**, each with their own books and their own page.

**Dropdown behaviour:** click to open (works for touch and keyboard alike), `aria-expanded` and
`aria-haspopup` set, **Escape** closes, a click anywhere outside closes, and selecting an item
closes it. On mobile nothing is nested — everything is laid open, so there is no hunting and no
double-tap.

## Authors

**Side by side on desktop, not stacked.** This is not a layout preference; it is the argument the
page exists to make. Stacked, one name is always above the other, and whoever is second reads as
second. In two columns of identical width, neither can lead.

Both are titled **Founding Author** — the same words, the same size, the same colour.

Their *content* stays entirely their own: separate biographies, separate focus areas, separate
catalogues, separate pages. **Equal footing is not a merged identity**, and the difference matters.

One shared sentence introduces them, and it lives in `data/site.ts` (`AUTHORS_INTRO`) rather than
in a page, so the homepage and `/authors` can never drift apart on what the ministry is.

## Books

**Two shelves, not one catalogue.** A single continuous grid of ten covers says *bookstore*. Two
shelves, each belonging to a named founding author, says *publishing house*.

The book both authors wrote together — *Quotes From and For L-I-F-E* — gets its own shelf first,
because it is the clearest statement the catalogue can make about what this house is. It then
appears again on both authors' shelves, because it is genuinely both of theirs.

Each book page now carries: cover · description · reflection collection (where applicable) · where
to buy · **related books**.

**"Related" means something real, never a guess.** `relatedBooks()` orders by: books in the same
reflection collection, then the rest of that author's shelf, then anything co-authored. It never
invents a connection the data does not support, and never returns the book you are already reading.

Collection moods were re-worded to the v2.1 brief: Breaking Chains *warm healing*; Rooted *nature,
kingdom*; Waiting for the Bridegroom *expectation, hope*; Faith Finds Home *belonging, warmth*;
Bits & Bites *minimal, elegant, quiet wisdom*.

## Untouched

Reflection Library, reflection pages, Family Devotions, Education, Ideas & Essays, Community,
Contact, and the architecture — exactly as approved in v2.0.

---

# Version 2.3 — SEO final polish

**Social cards are built from the logo, not re-typeset.** Thirteen 1200×630 cards live in
`/public/images/branding/`: one branded default, one per book with a cover, one per author. Each is
the warm-black field with the hero's single-lamp glow, the artwork on the left, and the **official
mark** on the right — so a link shared to WhatsApp or Facebook carries the real logo, not an
approximation of it.

**Canonicals are generated, never hand-written.** `lib/seo.ts` → `pageMetadata()` builds the
canonical, Open Graph, and Twitter card for every page from one function. Fourteen hand-written
canonical URLs would be fourteen chances to paste the wrong path, and a wrong canonical is worse
for search than none.

The canonical is deliberately **not** set in the root layout. A canonical there is inherited by
every page, which would tell Google that `/books`, `/authors`, and `/contact` are all the same
document.

**The 404 carries no canonical and is `noindex`.** It is not a document.

**One graph, joined by `@id`.** Organization and WebSite are declared once, in the layout, with
stable `@id`s. Person (author pages), Book (book pages), and Quotation (reflections) reference
those ids rather than restating them. A duplicate standalone Organization node — present on every
page since v1.1 — was found during validation and removed.

**ISBN is modelled but empty.** `Book.isbn` is `null` for all ten titles because none was supplied.
The schema emits it only when it exists. Filling in the field is the entire job; no code changes.

**Validated, not assumed.** All 145 rendered pages were parsed: 143 unique canonicals, zero
duplicates, zero missing Open Graph images, zero incomplete Twitter cards, 276 JSON-LD blocks all
parsing, exactly one Organization node per page, and every `og:image` URL absolute and resolving to
a real file.
