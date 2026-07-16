# Future: Supabase

Version 1 uses typed local data on purpose. It is fast, free, has no failure mode, and needs no
secrets. **Move to a database when — and only when — a real need appears:** you want to publish
a reflection without a developer, schedule ahead, or track artwork production from a browser.

The content models in `lib/types.ts` were shaped to be Supabase tables. That is the whole
migration strategy.

## Tables

| Table | Columns |
| --- | --- |
| `authors` | id, name, slug, role, biography (text[]), portrait, focus_areas (text[]), storefront |
| `books` | id, title, subtitle, slug, cover, description, excerpt, genre, themes (text[]), status, collection_id |
| `book_authors` | book_id, author_id — a join table, because *Quotes From and For L-I-F-E* has two authors |
| `purchase_links` | id, book_id, label, url, format |
| `collections` | id, name, theme, palette, prefix, live, book_id |
| `reflections` | id, code, title, text, author_id, collection_id, book_id, chapter, theme, emotion, background, palette, tags (text[]), priority, artwork, published_date |
| `devotionals` | id, title, summary, group, external_url, body |
| `projects` | id, title, category, owner, summary, image, external_url, status |

Everything is public read. Only the admin writes.

## The migration, in order

**1. Move the data, keep the shapes.** Create the tables, import `data/*.ts`. The `Reflection`
interface stays exactly as it is.

**2. Swap the data source, not the components.** Every component imports from `lib/reflections.ts`,
never from `data/` directly. That indirection is the seam. Change:

```ts
import { reflections } from "@/data/reflections";
```

…to a Supabase query in that one file. **No component changes.** Keep the functions
(`reflectionForDate`, `filterReflections`, `neighbours`) — make them `async`.

**3. Then, and only then, schedule.** Add a `scheduled_date` column. `reflectionForDate`
becomes: look for a reflection scheduled today; if none, fall back to the existing deterministic
rotation. **Keep the fallback.** It means a missed schedule never leaves the homepage empty.

**4. Admin last.** Supabase Auth, one row in an `admins` table, a protected `/admin` route.
Editing reflections, uploading artwork, flipping production statuses — the exact columns the
tracker spreadsheet already has.

## Keep static rendering

Do not turn the site into a client-side app to get a database. Use server components and
`revalidate`:

```ts
export const revalidate = 3600;
```

The site stays static and fast; content refreshes hourly. Use `revalidatePath("/")` from the
admin when you need an instant update.

## What not to do

**Do not migrate to Supabase to solve a problem you do not have.** If the only thing you want is
a new book on the site four times a year, editing `data/books.ts` and pushing to GitHub is
faster, cheaper, and cannot go down.
