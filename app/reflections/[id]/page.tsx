import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReflectionPlate from "@/components/ReflectionPlate";
import ShareRow from "@/components/ShareRow";
import { SITE } from "@/data/site";
import { getBook } from "@/data/books";
import { getReflection, neighbours, reflections } from "@/lib/reflections";
import { pageMetadata } from "@/lib/seo";

// Next 16: `params` is a Promise. It is awaited once at the top of each function.
interface Props {
  params: Promise<{ id: string }>;
}

/** Every reflection is a permanent, statically generated page. */
export function generateStaticParams() {
  return reflections.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = getReflection(id);
  if (!r) return { title: "Reflection not found" };

  return pageMetadata({
    title: r.title,
    description: r.text,
    path: `/reflections/${r.id}`,
    type: "article",
    authors: [r.author],
  });
}

export default async function ReflectionPage({ params }: Props) {
  const { id } = await params;
  const reflection = getReflection(id);
  if (!reflection) notFound();

  const { previous, next } = neighbours(reflection.id);
  const book = getBook(reflection.bookSlug);
  const url = `${SITE.url}/reflections/${reflection.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: reflection.text,
    spokenByCharacter: reflection.author,
    isPartOf: { "@type": "Book", name: reflection.book },
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/*
        A sacred space.

        Almost every piece of interface has been taken off this page. There is no
        sidebar, no related-content grid, no newsletter box, no breadcrumb trail.
        A reflection is one or two sentences long and it is asking the visitor to
        stop — so the page stops too. What remains: the words, who wrote them,
        where they came from, a way to pass them on, and a door to the next one.
      */}
      <article className="surface-read px-6 pb-28 pt-20 sm:px-10 sm:pt-28">
        <div className="mx-auto max-w-reflection">
          <p className="lockup text-center text-gold-deep/70">{reflection.code}</p>

          {/* The reflection. Nothing on this screen is louder. */}
          <blockquote className="mt-16 text-center font-display text-quote font-light italic leading-snug text-ink">
            {reflection.text}
          </blockquote>

          <div className="mx-auto mt-16 h-px w-16 bg-gold/40" />

          <div className="mt-10 text-center">
            <p className="font-body text-sm font-light tracking-wide text-ink-soft">
              {reflection.author}
            </p>
            {book ? (
              <Link
                href={`/books/${book.slug}`}
                className="mt-2 inline-block font-display text-base italic text-ink-faint transition-colors duration-500 ease-calm hover:text-gold-deep"
              >
                {reflection.book}
              </Link>
            ) : (
              <p className="mt-2 font-display text-base italic text-ink-faint">
                {reflection.book}
              </p>
            )}
            <p className="lockup mt-6 text-ink-faint/70">{reflection.chapter}</p>
          </div>
        </div>
      </article>

      {/* The plate, given the whole width of a quiet dark room to itself. */}
      <section className="bg-night px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-sm">
          <ReflectionPlate reflection={reflection} size="hero" priority />
        </div>
        <p className="mx-auto mt-10 max-w-md text-center font-body text-xs font-light leading-relaxed text-charcoal-faint">
          {reflection.background}
        </p>
      </section>

      {/* Pass it on — back on the house surface. */}
      <section className="bg-night-soft px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-reflection text-center">
          <p className="lockup text-gold-deep/80">Share this reflection</p>
          <div className="mt-10 flex justify-center">
            <ShareRow url={url} title={reflection.title} text={reflection.text} />
          </div>
        </div>
      </section>

      {/* The door to the next one. Two quiet doors, and the library between them. */}
      <nav
        aria-label="Reflections"
        className="border-t border-charcoal-line bg-night px-6 py-16 sm:px-10"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:justify-between">
          <div className="w-full text-center sm:w-1/3 sm:text-left">
            {previous && (
              <Link href={`/reflections/${previous.id}`} className="group inline-block">
                <span className="lockup text-charcoal-faint">Previous</span>
                <span className="mt-3 block font-display text-lg font-light italic text-ink-onNight transition-colors duration-500 ease-calm group-hover:text-gold-soft">
                  {previous.title}
                </span>
              </Link>
            )}
          </div>

          <Link
            href="/reflections"
            className="lockup text-charcoal-faint transition-colors duration-500 ease-calm hover:text-gold-soft"
          >
            All reflections
          </Link>

          <div className="w-full text-center sm:w-1/3 sm:text-right">
            {next && (
              <Link href={`/reflections/${next.id}`} className="group inline-block">
                <span className="lockup text-charcoal-faint">Next</span>
                <span className="mt-3 block font-display text-lg font-light italic text-ink-onNight transition-colors duration-500 ease-calm group-hover:text-gold-soft">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
