# Content migration notes

Sources migrated:

- `sites.google.com/view/shazonique` — Home, Inspirations, About the Authors, Stores, More
- `sites.google.com/view/shazonques-inspiration-devot` — Family Devotions
- `Breaking_Chains_Reflection_Asset_Library_Tracker.xlsx` — 120 reflection records
- `Shaz_Site.zip` — 13 cover and education images

---

## Content preserved

**Author biographies.** Both bios are carried over in full from *About the Authors*, lightly
re-paragraphed for reading on screen. No wording was rewritten. Nathlee's bio retains the
family names (Yonique, Zowayne, Nathan) and the pilgrim image that closes it. Zowayne's
retains his motto and the Martin Luther King Jr. reference.

**Book descriptions and excerpts.** Every description on the old *Stores* page and every
excerpt on the old *Inspirations* page is preserved verbatim on the relevant book page.

**Purchase links.** All 25 retailer links from the *Stores* page are preserved and grouped by
format (paperback / ebook). The Barnes & Noble contributor storefronts for both authors are
preserved as catalogue links.

**The three L.I.F.E. quotes** from the *Inspirations* page, with their original attribution
(one to Zowayne, one to Nathlee, one to both).

**Reflection library.** All 120 records converted field-for-field. Text, titles, themes,
emotions, chapters, tags, and priorities are unchanged.

**Google Forms.** "Comment to Author" and "Review a Book" both survive, on `/contact`.

**The slogan.** *Heart's Home of Hope* — carried through from the devotions site, where it
already appeared in the closing line of the welcome text.

---

## Content reorganized

**The old home page was a book-review page.** Its heading was "SHAZONIQUE'S BOOK REVIEWS" and
its purpose was to funnel visitors to a review form. That is now one call to action on
`/contact`, not the identity of the site. The new homepage leads with the daily reflection and
gives both authors equal footing, per Blueprint §5.

**"Inspirations" is dissolved.** The old page mixed excerpts, quotes, and covers in one scroll.
Excerpts now live on their own book pages, where they belong; the quotes moved to the *Quotes
From and For L-I-F-E* book page.

**"Stores" is dissolved.** A page of raw retailer links is not a destination. Every link now
sits on the book it sells, and `/books` is a proper catalogue with author and genre filters.

**Author bios were split.** One combined page became `/authors` plus a dedicated page each.

**Devotions became an index.** See the confirmation section below.

**Repetition removed.** The "Comment to Author / About the Author / Stores" link triplet was
repeated on every page of the old site. It appears once now, in the footer.

---

## Links retained

| Link | Now lives on |
| --- | --- |
| Comment to Author (Google Form) | `/contact` |
| Review a Book (Google Form) | `/contact`, `/books` |
| Nathlee's Barnes & Noble storefront | `/authors/nathlee-r-grant` |
| Zowayne's Barnes & Noble storefront | `/authors/zowayne-o-williams` |
| All 25 retailer links | Individual book pages |
| Family Devotions site | `/devotions` |
| #RaiseThemRight | `/community` |
| Grade 4 PEP | `/education` |
| Grade 5 PEP | `/education` |

---

## Links broken or uncertain

**One link on the old Stores page is broken.** Under *Breaking Chains → paperback*, a link
labelled as an Amazon listing actually points to a Blogger post-edit URL
(`blogger.com/u/5/blog/post/edit/...`). That is a private authoring URL — it would have shown
visitors a Google login screen. **It has been dropped, not migrated.**

**Two Indigo/Chapters links point at the same product** under different store names (Square One
and Bramalea City Centre / Niagara Pen Centre). Both are kept, but they may be duplicates worth
pruning.

**Video content is not migrated.** The old site embedded five Google Drive `.mp4` files
(`BOOK COLLECTIONS.mp4`, `booksigning.mp4`, `Breaking Chains Speech.mp4`, `A Mother's Journey
Ad.mp4`) and one YouTube video (`pjIjZA6N7HE`). Drive-hosted video is not a durable web asset —
it needs a real host. The YouTube video can be embedded on `/arts-media` as soon as you confirm
you want it there.

---

## Content that still needs confirmation

**1. Five books have no description and no direct retailer link.**

*The Conspiracy*, *What the Devil Meant for Evil*, *Pack from Snowy Valley* (Zowayne);
*Bits and Bites of Truth and Wisdom*, *Heaven Met Me* (Nathlee).

Covers exist for all five. Nothing else does. Their pages currently show the cover, the title,
the author, and a link to that author's Barnes & Noble storefront — a real destination, not a
dead "coming soon" button. **Their `description` and `excerpt` fields are `null` and the page
omits those blocks entirely rather than showing invented copy.**

Send a description and a retailer link for each and they will read exactly like the other five.

**2. *The Kings' — The Legacy Begins* has no cover image.**

It is the one book with a full set of retailer links and no artwork. The page currently renders
a typeset fallback plate reading "Cover coming". Drop the file at
`public/images/covers/the-kings-the-legacy-begins.png` and it will appear automatically — the
path is already wired.

**3. Whether the five undocumented books are actually published.**

They are currently marked `status: "published"`. If any of them is not yet released, change it
to `"forthcoming"` in `data/books.ts` and the badge and storefront link will adjust.

**4. The family devotions are images, not text.**

Every page on the devotions site (DEV 01–09, Gems of Greatness, The Vine & Virtue, AUD_VIS
01–02) is a single graphic with no extractable text. There was nothing to migrate. `/devotions`
is therefore an index that names all thirteen and links out to the existing site.

To bring them in properly, the underlying text is needed. Once it exists, `/devotions/[id]`
becomes a real route and the devotionals join the reflection system.

**5. Grade 6 PEP.**

A cover image exists; no URL was supplied. It is listed on `/education` as in development. If
it is live, add the URL to `data/site.ts`.

**6. Author portraits — supplied, with one caveat.**

Both portraits are in place at `public/images/authors/` and both author records point at them.

Each was cropped to the 3:4 frame the layout expects. **Nathlee's arrived inside a decorative
green mount** — a tilted photo-frame graphic on a white page — so the photograph was lifted out of
it first, and the mount, the white border, and the drop shadow were all removed.

**The caveat is resolution, and it matters.** Her source file is 228 x 179 pixels *including* the
mount; the photograph inside it is roughly 118 x 158. The Authors room displays portraits at 224
pixels wide, and on a high-density screen that means her image is being enlarged well past its
native size. It is exported at 300 x 400 — an honest 2.5x — with light sharpening, rather than
inflated to match Zowayne's file and pretending to detail that was never captured.

Zowayne's source is 626 x 578 and needed no such rescue. It is exported at 600 x 800.

**The consequence:** side by side, his portrait is sharp and hers is soft. The Authors room is
built to argue that these two founders are equals, and a visible difference in image quality
quietly argues the opposite. **A higher-resolution original of Nathlee's photograph — ideally the
file it was cropped from, before it was placed in the green frame — would fix this in one step.**
Drop it in and re-export; nothing in the code changes.

**7. Arts & Media has no content yet.****7. Arts & Media has no content yet.**

Blueprint §4 marks it Phase 2, but the homepage's *Explore the House* grid links to it, so the
route exists rather than sending visitors to a 404. It currently states plainly what will live
there. Same for `/ideas`.
