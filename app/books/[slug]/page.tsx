import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReflectionPlate from "@/components/ReflectionPlate";
import { BookCard, BookCover, PageHeader } from "@/components/ui";
import { getAuthor } from "@/data/authors";
import { books, getBook, relatedBooks } from "@/data/books";
import { SITE } from "@/data/site";
import { getCollection, moodFor } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";
import { reflections } from "@/lib/reflections";

// Next 16: `params` is a Promise. It is awaited once at the top of each function.
interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book not found" };

  const bookAuthors = book.authorSlugs
    .map((a) => getAuthor(a)?.name)
    .filter((n): n is string => Boolean(n));

  // Every book with a cover has its own 1200x630 card; the rest fall back to the
  // branded card. No description is invented — if the book has none, the
  // catalogue line is used, which states only facts already on the page.
  const card = book.cover ? `/images/branding/book-${book.slug}.jpg` : null;

  return pageMetadata({
    title: book.title,
    description:
      book.description ??
      `${book.title} — ${book.genre} by ${bookAuthors.join(" & ")}, published by ${SITE.name}.`,
    path: `/books/${book.slug}`,
    image: card,
    type: "book",
    authors: bookAuthors,
  });
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const bookAuthors = book.authorSlugs
    .map((s) => getAuthor(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const related = reflections
    .filter((r) => r.bookSlug === book.slug)
    .slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${SITE.url}/books/${book.slug}#book`,
    name: book.title,
    ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
    // Authors reference the Person nodes on their own pages, so the graph joins
    // up instead of restating a second, competing copy of each author.
    author: bookAuthors.map((a) => ({
      "@type": "Person",
      "@id": `${SITE.url}/authors/${a.slug}#person`,
      name: a.name,
    })),
    // Every optional field is emitted ONLY when the data actually has it.
    // Nothing here is invented: no ISBN is guessed, no description is written.
    ...(book.description ? { description: book.description } : {}),
    ...(book.cover ? { image: `${SITE.url}${book.cover}` } : {}),
    ...(book.isbn ? { isbn: book.isbn } : {}),
    genre: book.genre,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
    },
    url: `${SITE.url}/books/${book.slug}`,
  };

  const alsoRead = relatedBooks(book, 3);
  const collection = getCollection(book.collection);
  const mood = moodFor(book.collection);

  const paperbacks = book.purchaseLinks.filter((l) => l.format === "paperback");
  const ebooks = book.purchaseLinks.filter((l) => l.format === "ebook");
  const stores = book.purchaseLinks.filter((l) => l.format === "storefront");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader eyebrow={book.genre} title={book.title} />

      <article className="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div>
          <BookCover book={book} />
        </div>

        <div>
          {book.subtitle && (
            <p className="font-display text-2xl italic text-gold">
              {book.subtitle}
            </p>
          )}

          <p className="mt-3 font-body text-sm uppercase tracking-wider text-charcoal-faint">
            {bookAuthors.map((a, i) => (
              <span key={a.slug}>
                {i > 0 && <span className="mx-2 text-gold">&amp;</span>}
                <Link href={`/authors/${a.slug}`} className="link-underline">
                  {a.name}
                </Link>
              </span>
            ))}
          </p>

          {/* The collection's personality, stated once and quietly: a hairline in
              the collection's own accent, its name, and its mood. Never a themed
              page — gold and cream still hold the house together. */}
          {collection && mood && (
            <div className="mt-10">
              <div
                className="h-px w-16"
                style={{ backgroundColor: mood.accent, opacity: 0.7 }}
              />
              <p className="lockup mt-5" style={{ color: mood.accent }}>
                {collection.name}
              </p>
              <p className="mt-2 font-display text-base italic text-charcoal-faint">
                {mood.mood}
              </p>
            </div>
          )}

          {book.description ? (
            <p className="mt-8 max-w-prose font-body text-lg leading-relaxed text-ink-onNightSoft">
              {book.description}
            </p>
          ) : (
            <p className="mt-8 max-w-prose font-body text-charcoal-faint">
              A full description of this book is being prepared. In the meantime
              you can find it at the retailers below.
            </p>
          )}

          {book.excerpt && (
            <blockquote className="mt-10 border-l-2 border-gold/50 py-2 pl-6">
              <p className="eyebrow">From the book</p>
              <p className="mt-3 max-w-prose font-display text-lg leading-relaxed text-ink-onNight">
                {book.excerpt}
              </p>
            </blockquote>
          )}

          {book.themes.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {book.themes.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-charcoal-line px-3 py-1 font-body text-xs text-charcoal-faint"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          <section className="mt-12" aria-labelledby="buy">
            <h2 id="buy" className="font-display text-2xl">
              Where to buy
            </h2>
            <div className="rule-gold mt-4" />

            {[
              { label: "Paperback", links: paperbacks },
              { label: "eBook", links: ebooks },
              { label: "All retailers", links: stores },
            ]
              .filter((g) => g.links.length > 0)
              .map((g) => (
                <div key={g.label} className="mt-6">
                  <p className="eyebrow">{g.label}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !px-4 !py-2"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section
          className="border-t border-charcoal-line bg-night-soft py-16"
          aria-labelledby="related"
        >
          <div className="shell">
            <p className="eyebrow">
              {reflections.filter((r) => r.bookSlug === book.slug).length}{" "}
              reflections drawn from this book
            </p>
            <h2 id="related" className="mt-2 font-display text-2xl">
              Reflections from {book.title}
            </h2>
            <div className="rule-gold mt-4" />

            <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/reflections/${r.id}`} className="group block">
                    <ReflectionPlate reflection={r} />
                    <h3 className="mt-3 font-display text-base group-hover:text-gold-deep">
                      {r.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/reflections" className="btn-secondary mt-10">
              Browse the reflection library
            </Link>
          </div>
        </section>
      )}

      {/* Related books. Never a guess: the same reflection collection first, then
          the same author's shelf, then anything the two founders wrote together. */}
      {alsoRead.length > 0 && (
        <section
          className="bg-night px-6 py-24 sm:px-10"
          aria-labelledby="also-read"
        >
          <div className="mx-auto max-w-site">
            <div className="text-center">
              <p className="lockup text-gold-deep/80">Related books</p>
              <h2
                id="also-read"
                className="mt-8 font-display text-room font-light"
              >
                You might also read
              </h2>
              <div className="mx-auto mt-10 rule" />
            </div>

            <ul className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3">
              {alsoRead.map((b) => (
                <li key={b.slug}>
                  <BookCard book={b} />
                </li>
              ))}
            </ul>

            <div className="mt-20 text-center">
              <Link href="/books" className="btn-gold">
                The whole catalogue
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
