import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BookCard, PageHeader } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";

export const metadata: Metadata = pageMetadata({
  title: "Books & Publications",
  description:
    "Explore books and publications by Nathlee R. Grant and Zowayne O. Williams through Shazonique's Inspirations.",
  path: "/books",
});

export default function BooksPage() {
  const sharedBooks = books.filter((book) => book.authorSlugs.length > 1);

  return (
    <main className="overflow-hidden bg-night">
      <PageHeader
        eyebrow={`${books.length} titles · two founding authors`}
        title="Books & Publications"
        intro="Christian reflection and memoir, allegory and fiction, testimony, governance and wisdom. Explore the growing catalogue of Shazonique’s Inspirations."
      />

      {sharedBooks.length > 0 && (
        <section
          className="border-t border-gold/20 bg-night px-6 py-20 sm:px-10 sm:py-24"
          aria-labelledby="shared-books-heading"
        >
          <div className="mx-auto max-w-site">
            <div className="mx-auto max-w-2xl text-center">
              <p className="lockup text-gold-deep/80">Written together</p>

              <h2
                id="shared-books-heading"
                className="mt-5 font-display text-4xl font-light leading-tight text-ink-onNight sm:text-5xl"
              >
                Two Authors. One Story.
              </h2>

              <div className="mx-auto mt-7 rule" />

              <p className="mx-auto mt-7 max-w-xl font-body text-base font-light leading-8 text-ink-onNightSoft sm:text-lg">
                Publications created through the shared vision and voices of
                both founding authors.
              </p>
            </div>

            <ul className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-12">
              {sharedBooks.map((book) => (
                <li key={book.slug} className="min-w-0">
                  <BookCard book={book} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {authors.map((author, index) => {
        const authorBooks = books.filter(
          (book) =>
            book.authorSlugs.length === 1 &&
            book.authorSlugs.includes(author.slug),
        );

        if (authorBooks.length === 0) return null;

        return (
          <section
            key={author.slug}
            id={author.slug}
            aria-labelledby={`author-heading-${author.slug}`}
            className={`scroll-mt-24 border-t border-gold/20 px-6 py-20 sm:px-10 sm:py-24 ${
              index % 2 === 0 ? "bg-night" : "bg-night-soft"
            }`}
          >
            <div className="mx-auto max-w-site">
              <div className="grid items-end gap-10 border-b border-gold/20 pb-10 md:grid-cols-[minmax(0,1fr)_auto]">
                <div className="min-w-0">
                  <p className="lockup text-gold-deep/80">
                    {author.title || "Founding Author"}
                  </p>

                  <h2
                    id={`author-heading-${author.slug}`}
                    className="mt-4 break-normal font-display text-4xl font-light leading-tight text-ink-onNight sm:text-5xl lg:text-6xl"
                  >
                    {author.name}
                  </h2>

                  <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-ink-onNightSoft sm:text-lg">
                    {author.role}
                  </p>
                </div>

                <p className="lockup whitespace-nowrap text-charcoal-faint">
                  {authorBooks.length}{" "}
                  {authorBooks.length === 1 ? "title" : "titles"}
                </p>
              </div>

              <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {authorBooks.map((book) => (
                  <li key={book.slug} className="min-w-0">
                    <BookCard book={book} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </main>
  );
}
