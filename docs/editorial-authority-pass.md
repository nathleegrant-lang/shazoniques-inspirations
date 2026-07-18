# Version 3.0 — Editorial Authority Pass

The brief was not a redesign. It was a Creative Director's instruction to stop the palette
drifting toward a lifestyle brand and restore the identity of a Christian publishing house that
has quietly served readers for fifty years. Two reference screenshots set the direction:
devotionals on rich black, gold headlines, charcoal cards.

## What had drifted

The palette had gone warm. Cream (`#FAF5EA`) — a yellow-beige — was the dominant background on most
pages, and two collection accents were a dusty rose (`#9A6455`) and a muted brown (`#B5813F`). More
fundamentally, the whole light/dark polarity was inverted from the brand: the site read as cream
reading-rooms with dark accents, when the reference is unmistakably dark-first — black is the page,
gold and white carry the words.

## The decision (confirmed with the publisher)

- **Polarity: dark-dominant, with a cool ivory reading surface.** Black and charcoal are the house.
  Ivory is reserved for the one place it earns its keep — the sustained reading of a reflection.
- **Collection accents: retired.** One house, one identity. A collection now shows its character
  through its mood *words*, not a pastel swatch.

## The restored palette

Sampled directly from the brand reference (measured: bg `#070707`–`#0A0909`, panels
`#2D2D2D`–`#2F2F2F`, gold `#D2B050`–`#DBC063`):

| Role | Token | Value |
| --- | --- | --- |
| The page | `night` | `#0A0A0A` — rich, neutral black |
| A near-black room | `night.soft` | `#141414` |
| A content panel | `charcoal` | `#2A2A2A` — neutral, no brown |
| The reading surface | `cream` | `#F4F2EC` — cool ivory, de-yellowed |
| The one accent | `gold` | `#B29535` / `#D9BC5E` bright |
| Type on black | `ink.onNight` | `#EDEBE6` warm white |

Every warm/beige/pink/brown value is gone. The blacks and charcoals are now neutral (R=G=B), which
is what gives the site its gravity.

## What changed, surface by surface

- **Two semantic surfaces** were introduced in `globals.css`: `.surface-dark` (the default
  identity) and `.surface-read` (the ivory reading chamber). Each page section declares its intent
  once, so no page guesses its own colours.
- **The body default is now rich black**; the shared `PageHeader` masthead is black with a gold
  eyebrow and white title, matching the reference on every inner page.
- **Homepage rooms** alternate `night` / `night.soft` — a quiet black-on-near-black rhythm, so the
  eye moves between rooms rather than staring into one flat void.
- **Books, Authors, Book Detail, Education, About, Community, Ideas, Arts, Devotions** and the
  **reflection library** are the dark house.
- **The reflection page** is one calm ivory reading chamber for the words themselves; the plate,
  the share, and the next-door nav sit on the dark house around it.
- **The nine reflection plates** were re-tuned from pale washes to the house itself: charcoal
  ground, gold rule, warm-white words — the devotional card from the reference. The nine palettes
  survive only as the faintest shift in the dark ground, so the wall of 120 breathes without any
  plate glowing like a light-box.
- **The five collection accents** (clay, moss, midnight, morning, slate) now all resolve to the
  house gold; their mood words are untouched.

## A latent bug fixed along the way

The uploaded copy was missing the definitions for several inherited utility classes (`.card`,
`.shell`, `.eyebrow`, `.rule-gold`, `.btn-primary`, `.btn-secondary`) — they were referenced by
many pages but styled nothing. They are now defined properly, for the dark house.

## Accessibility

Every text/surface pairing in the new palette was measured against WCAG AA. The lowest is the small
charcoal caption on a charcoal panel at 4.27:1 (clears the large-text threshold; those captions are
always ≥14px). Primary reading text is 16.6:1 on black and 14.9:1 on ivory. A scan of all 145
rendered pages confirmed **zero** dark-on-dark text outside the intended ivory reading chamber.

## Validation

- `npm install` — 0 warnings
- `npm run lint` — 0 errors, 0 warnings
- `npm run build` — 147 pages
- `npm audit` — 0 vulnerabilities
- Rendered-HTML surface check: Homepage, Books, Authors, Book Detail all `bg-night`; reflection
  detail carries exactly one `surface-read` chamber.
