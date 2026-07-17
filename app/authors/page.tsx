import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { AuthorPortrait, BookCard, PageHeader } from "@/components/ui";
import { authors } from "@/data/authors";
import { booksByAuthor } from "@/data/books";
import { AUTHORS_INTRO } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Authors",
  description: "Nathlee R. Grant and Zowayne O. Williams — the two founding authors of Shazonique's Inspirations.",
  path: "/authors",
});

/**
 * Side by side, not stacked.
 *
 * v2.1 — the two authors now share a single row on desktop. This is not a layout
 * preference; it is the argument the page exists to make. Stacked, one name is
 * always above the other, and whoever is second reads as second. Side by side, in
 * columns of identical width, neither can lead.
 *
 * Their *content* stays entirely their own: separate biographies, separate focus
 * areas, separate catalogues, separate pages. Equal footing is not the same thing
 * as a merged identity, and the difference matters.
 */
export default function AuthorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Two founding authors"
        title="The authors"
        intro={AUTHORS_INTRO}
      />

      <section className="bg-cream px-6 py-24 sm:px-10" aria-label="The authors">
        <div className="mx-auto grid max-w-site gap-20 lg:grid-cols-2 lg:gap-16">
          {authors.map((author) => {
            const list = booksByAuthor(author.slug);
            return (
              <article key={author.slug} aria-labelledby={`a-${author.slug}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-56">
                    <AuthorPortrait author={author} />
                  </div>

                  <h2
                    id={`a-${author.slug}`}
                    className="mt-10 font-display text-3xl font-light"
                  >
                    <Link
                      href={`/authors/${author.slug}`}
                      className="transition-colors duration-500 ease-calm hover:text-gold-deep"
                    >
                      {author.name}
                    </Link>
                  </h2>

                  <p className="lockup mt-4 text-gold-deep/80">{author.title}</p>
                  <p className="mt-3 font-display text-base italic text-ink-faint">
                    {author.role}
                  </p>

                  <p className="mt-8 max-w-prose font-body font-light leading-relaxed text-ink-soft">
                    {author.biography[0]}
                  </p>

                  <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {author.focusAreas.map((f) => (
                      <li key={f} className="lockup text-ink-faint">
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/authors/${author.slug}`}
                    className="btn-gold mt-10"
                  >
                    Full profile
                  </Link>
                </div>

                {list.length > 0 && (
                  <>
                    <div className="mx-auto mt-20 rule" />
                    <h3 className="lockup mt-8 text-center text-ink-faint">
                      {list.length} {list.length === 1 ? "book" : "books"}
                    </h3>
                    <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3">
                      {list.map((b) => (
                        <li key={b.slug}>
                          <BookCard book={b} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
