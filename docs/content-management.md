# Managing content

Everything lives in `data/`. You should not need to open a component to change what the site
says.

---

## Add a book

Open `data/books.ts` and add an entry to the `books` array.

```ts
{
  id: "new-book",
  title: "The Title",
  subtitle: "The Subtitle" | null,
  slug: "the-title",                       // becomes /books/the-title
  authorSlugs: ["zowayne-o-williams"],     // both slugs if co-authored
  cover: "/images/covers/the-title.png" | null,
  description: "…" | null,                 // null = the page omits the block
  excerpt: "…" | null,
  genre: "Fiction",
  themes: ["Faith", "Courage"],
  purchaseLinks: [
    { label: "Barnes & Noble", url: "https://…", format: "ebook" },
  ],
  status: "published",                     // or "forthcoming"
  collection: null,                        // or a collection id
}
```

**A missing cover is fine.** Set `cover: null` and the page renders a typeset fallback plate
instead of a broken image.

**A missing description is fine.** Set it to `null`. The page omits that section. Never fill it
with placeholder copy — an empty block is honest, invented copy is not.

**No purchase links yet?** Leave the array empty. The page falls back to the author's Barnes &
Noble storefront automatically.

Drop the cover at `public/images/covers/<slug>.png`. Portrait, transparent background.

---

## Add a reflection

Reflections are generated from the tracker spreadsheet, not written by hand.

```bash
python3 scripts/reflections_from_xlsx.py path/to/Tracker.xlsx > data/reflections.ts
```

The script reads the columns named in the Brand Guide's Asset Library Standard and writes
typed records. Edit the spreadsheet; regenerate; commit the result.

To add reflection **artwork**, drop `BC-001.png` into `public/images/reflections/` and set the
record's `artwork` field to that path. Until then the reflection renders as a plate tinted from
its own Suggested Colour Palette.

---

## Add a new collection

Say the *Rooted* library is ready.

1. **Register it** in `data/site.ts` → `COLLECTIONS`:

   ```ts
   { id: "rooted", name: "Rooted", theme: "Identity • Kingdom • Worship • Abiding",
     palette: "Forest Green", prefix: "RT", live: true, book: "rooted" }
   ```

2. **Convert its tracker** with the same script, then concatenate the records into
   `data/reflections.ts`, setting `collection: "rooted"` and `bookSlug: "rooted"`.

3. **If it introduces a new colour palette**, add it to `lib/palettes.ts`. Nine palettes are
   defined; an unknown name falls back to Cream rather than breaking.

That is the whole job. The daily rotation, the filters, the facets, the search index and the
sitemap all derive from the data — they extend themselves. **The rotation cycle lengthens
automatically**: 120 reflections cycle every four months; 240 cycle every eight.

---

## Add an author

`data/authors.ts`. Then add the slug to `AuthorSlug` in `lib/types.ts` — TypeScript will then
tell you every place that needs updating, which is the point.

---

## Change links, projects, and section copy

`data/site.ts` holds the site name, slogan, external project links (#RaiseThemRight, the PEP
platforms, the devotions site), the Google Forms, and the collection registry.

Change the slogan in exactly one place and it changes everywhere — but note that **the slogan
is fixed brand, not editable copy**. It reads *Heart's Home of Hope*. Nothing else.
