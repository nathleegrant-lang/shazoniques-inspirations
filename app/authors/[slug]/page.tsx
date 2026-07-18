import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReflectionPlate from "@/components/ReflectionPlate";
import { AuthorPortrait, BookCard, PageHeader } from "@/components/ui";
import { authors, getAuthor } from "@/data/authors";
import { booksByAuthor } from "@/data/books";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { reflections } from "@/lib/reflections";

// Next 16: `params` is a Promise. It is awaited once at the top of each function.
interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Author not found" };

  const card = author.portrait
    ? `/images/branding/author-${author.slug}.jpg`
    : null;

  return pageMetadata({
    title: author.name,
    description: `${author.name} — ${author.title}, ${SITE.name}. ${author.role}.`,
    path: `/authors/${author.slug}`,
    image: card,
    type: "profile",
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const catalogue = booksByAuthor(author.slug);
  const featured = catalogue.slice(0, 4);
  const authorReflections = reflections
    .filter((r) => r.authorSlug === author.slug)
    .slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.title,
    description: author.biography[0],
    url: `${SITE.url}/authors/${author.slug}`,
    knowsAbout: author.focusAreas,
    // Only fields the site can actually verify. No credentials, no birthplace,
    // no awards — none of that is in the data, so none of it is claimed.
    ...(author.portrait ? { image: `${SITE.url}${author.portrait}` } : {}),
    ...(author.storefront ? { sameAs: [author.storefront] } : {}),
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader eyebrow={author.title} title={author.name} intro={author.role} />

      <section className="shell grid gap-12 py-16 lg:grid-cols-[260px_1fr]">
        <div>
          <AuthorPortrait author={author} className="h-72 w-full" />
          {author.storefront && (
            <a
              href={author.storefront}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-5 w-full"
            >
              All books by {author.name.split(" ")[0]}
            </a>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl">Biography</h2>
          <div className="rule-gold mt-4" />
          <div className="mt-6 max-w-prose space-y-4">
            {author.biography.map((p, i) => (
              <p key={i} className="font-body text-lg leading-relaxed text-ink-onNightSoft">
                {p}
              </p>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl">Themes &amp; focus</h2>
          <div className="rule-gold mt-4" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {author.focusAreas.map((f) => (
              <li
                key={f}
                className="rounded-full border border-charcoal-line bg-charcoal px-3 py-1 font-body text-sm text-ink-onNightSoft"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="border-t border-charcoal-line bg-charcoal/40 py-16" aria-labelledby="featured">
          <div className="shell">
            <p className="eyebrow">Featured work</p>
            <h2 id="featured" className="mt-2 font-display text-2xl">
              Selected books
            </h2>
            <div className="rule-gold mt-4" />
            <ul className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {featured.map((b) => (
                <li key={b.slug}>
                  <BookCard book={b} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="shell py-16" aria-labelledby="catalogue">
        <p className="eyebrow">
          {catalogue.length} {catalogue.length === 1 ? "title" : "titles"}
        </p>
        <h2 id="catalogue" className="mt-2 font-display text-2xl">
          Complete catalogue
        </h2>
        <div className="rule-gold mt-4" />
        <ul className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {catalogue.map((b) => (
            <li key={b.slug}>
              <BookCard book={b} />
            </li>
          ))}
        </ul>
      </section>

      {authorReflections.length > 0 && (
        <section className="shell border-t border-charcoal-line py-16" aria-labelledby="refl">
          <p className="eyebrow">
            {reflections.filter((r) => r.authorSlug === author.slug).length} reflections
          </p>
          <h2 id="refl" className="mt-2 font-display text-2xl">
            Reflections by {author.name.split(" ")[0]}
          </h2>
          <div className="rule-gold mt-4" />
          <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {authorReflections.map((r) => (
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
            Browse all reflections
          </Link>
        </section>
      )}
    </>
  );
}
