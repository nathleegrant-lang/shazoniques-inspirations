import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BookCard, PageHeader } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";

export const metadata: Metadata = pageMetadata({
  title: "Books & Publications",
  description: "The complete catalogue of Shazonique's Inspirations — Christian reflection, fiction, testimony, governance and wisdom from Nathlee R. Grant and Zowayne O. Williams.",
  path: "/books",
});

/**
 * Two shelves, not one catalogue.
 *
 * A single continuous grid of ten covers says "bookstore". Two shelves, each
 * belonging to a named founding author, says "publishing house" — which is what
 * this is. The section ids are the anchors the navigation menu links to.
 *
 * The book both authors wrote together is given its own shelf first, because it
 * is the clearest statement the catalogue can make about what this house is.
 */
export default function BooksPage() {
  const shared = books.filter((b) => b.authorSlugs.length > 1);

  return (
    <>
      <PageHeader
        eyebrow={`${books.length} titles · two founding authors`}
        title="Books & Publications"
        intro="Christian reflection and memoir, allegory and fiction, testimony, governance and wisdom. Everything published under Shazonique's Inspirations."
      />

      {shared.length > 0 && (
        <section className="bg-cream px-6 py-24 sm:px-10" aria-labelledby="together">
          <div className="mx-auto max-w-room">
            <div className="text-center">
              <p className="lockup text-gold-deep/80">Written together</p>
              <h2 id="together" className="mt-8 font-display text-room font-light">
                Both authors, one book
              </h2>
              <div className="mx-auto mt-10 rule" />
            </div>
            <ul className="mx-auto mt-16 grid max-w-xs grid-cols-1">
              {shared.map((b) => (
                <li key={b.slug}>
                  <BookCard book={b} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {authors.map((author, i) => {
        const list = books.filter((b) => b.authorSlugs.includes(author.slug));
        if (list.length === 0) return null;

        return (
          <section
            key={author.slug}
            id={author.slug}
            aria-labelledby={`h-${author.slug}`}
            className={`scroll-mt-24 px-6 py-24 sm:px-10 ${
              i % 2 === 0 ? "bg-cream-shell" : "bg-cream"
            }`}
          >
            <div className="mx-auto max-w-room">
              <div className="text-center">
                <p className="lockup text-gold-deep/80">{author.title}</p>
                <h2
                  id={`h-${author.slug}`}
                  className="mt-8 font-display text-room font-light"
                >
                  {author.name}
                </h2>
                <div className="mx-auto mt-10 rule" />
                <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
                  {author.role}
                </p>
                <p className="lockup mt-8 text-ink-faint">
                  {list.length} {list.length === 1 ? "title" : "titles"}
                </p>
              </div>

              <ul className="mt-20 grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((b) => (
                  <li key={b.slug}>
                    <BookCard book={b} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}
