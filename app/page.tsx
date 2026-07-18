import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { BookCard } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { projectsIn, SITE } from "@/data/site";
import { reflectionForDate } from "@/lib/reflections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.slogan}`,
  description: SITE.description,
  path: "/",
});

const FEATURED_BOOKS = [
  "breaking-chains",
  "the-kings-the-legacy-begins",
  "quotes-from-and-for-life",
  "oscar-the-great",
];

export default function HomePage() {
  const today = reflectionForDate();

  const featuredBooks = FEATURED_BOOKS.map((slug) =>
    books.find((book) => book.slug === slug),
  ).filter((book): book is (typeof books)[number] => Boolean(book));

  const educationProjects = projectsIn("Education").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white">
        <div className="mx-auto grid min-h-[42rem] max-w-[92rem] items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-14 lg:py-24">
          <Reveal>
            <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-[#9b7a25]">
              Independent Christian Publishing
            </p>

            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-[#111111]">
              Shazonique&apos;s Inspiration
            </h1>

            <p className="mt-7 max-w-2xl font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-tight text-[#1b1b1b]">
              Books that inspire. Reflections that restore. Truth that transforms.
            </p>

            <p className="mt-7 max-w-2xl font-body text-lg font-medium leading-relaxed text-[#363636]">
              Faith-filled books, reflections, and resources created to encourage
              hearts, strengthen families, and inspire lives of purpose.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/books"
                className="inline-flex items-center justify-center rounded-md border border-black bg-black px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#242424]"
              >
                Explore our books
              </Link>

              <Link
                href={`/reflections/${today.id}`}
                className="inline-flex items-center justify-center rounded-md border border-[#b9953f] bg-white px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-[#7a5b16] transition hover:bg-[#f6f2e8]"
              >
                Today&apos;s reflection
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-[#f4f4f4] shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
              <Image
                src="/images/home/shazonique-hero-lilies-books-cup.png"
                alt="Lilies, a cup, books, and warm light"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="flex flex-col gap-6 border-b border-black/15 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#9b7a25]">
                Featured titles
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-none text-[#111111]">
                Begin your reading journey
              </h2>
            </div>

            <Link
              href="/books"
              className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#735512] underline decoration-[#b9953f] underline-offset-8"
            >
              View the full catalogue
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4 lg:gap-x-10">
            {featuredBooks.map((book, index) => (
              <Reveal key={book.slug} delay={index * 80}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S REFLECTION */}
      <section className="relative overflow-hidden border-y border-[#2a2419] bg-[#12100d] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/home/shazonique-reflection-candle-bible.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto grid max-w-[84rem] items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[22rem_1fr] lg:px-14 lg:py-28">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-xl border border-[#d6b864]/45 shadow-[0_25px_55px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/home/shazonique-reflection-book-feather.png"
                alt="Today's Reflection journal with feather"
                fill
                sizes="352px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#e0c274]">
              Today&apos;s reflection
            </p>

            <blockquote className="mt-7 font-display text-[clamp(2.2rem,4.4vw,4.8rem)] font-semibold italic leading-[1.08] text-white">
              “{today.text}”
            </blockquote>

            <p className="mt-8 font-body text-sm font-semibold tracking-wide text-white/85">
              {today.author}
            </p>
            <p className="mt-1 font-display text-xl font-medium italic text-white/70">
              {today.book}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href={`/reflections/${today.id}`}
                className="inline-flex items-center justify-center rounded-md border border-[#d9bb67] bg-[#d9bb67] px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-[#16120b] transition hover:bg-[#ebd38f]"
              >
                Read the reflection
              </Link>

              <Link
                href="/reflections"
                className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-white"
              >
                Reflection library
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOUNDING AUTHORS */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[84rem]">
          <Reveal className="text-center">
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#9b7a25]">
              The people behind the pages
            </p>

            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold text-[#111111]">
              Our founding authors
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-medium leading-relaxed text-[#3a3a3a]">
              Two writers united by one purpose: to create books that speak honestly,
              nurture faith, and leave readers changed.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            {authors.map((author, index) => (
              <Reveal key={author.slug} delay={index * 100}>
                <Link
                  href={`/authors/${author.slug}`}
                  className="group grid items-center gap-8 border-t-2 border-black pt-8 sm:grid-cols-[13rem_1fr]"
                >
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[13rem] overflow-hidden rounded-lg bg-[#e6e6e6] shadow-[0_14px_34px_rgba(0,0,0,0.12)]">
                    {author.portrait ? (
                      <Image
                        src={author.portrait}
                        alt={`Portrait of ${author.name}`}
                        fill
                        sizes="208px"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6 text-center font-body text-sm font-bold text-black/50">
                        Portrait coming soon
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#9b7a25]">
                      Founding author
                    </p>

                    <h3 className="mt-3 font-display text-4xl font-semibold text-[#111111]">
                      {author.name}
                    </h3>

                    <p className="mt-5 font-body text-xs font-bold uppercase tracking-[0.14em] text-[#735512]">
                      Read the author profile →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-[#efefec] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#8e6d1f]">
              Beyond the bookshelf
            </p>

            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-tight text-[#111111]">
              Resources for learning, family, and community
            </h2>

            <p className="mt-6 max-w-3xl font-body text-lg font-medium leading-relaxed text-[#373737]">
              Shazonique&apos;s Inspiration extends beyond books through educational
              tools, family-centred resources, and community initiatives.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {educationProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 90} as="article">
                <div className="h-full rounded-xl border border-black/15 bg-white p-9 shadow-[0_14px_36px_rgba(0,0,0,0.07)]">
                  <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-[#8e6d1f]">
                    Education
                  </p>

                  <h3 className="mt-5 font-display text-3xl font-semibold text-[#111111]">
                    {project.title}
                  </h3>

                  <p className="mt-5 font-body font-medium leading-relaxed text-[#444444]">
                    {project.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/education"
              className="inline-flex items-center justify-center rounded-md border border-black bg-black px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white"
            >
              Explore learning resources
            </Link>

            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-md border border-[#9b7a25] bg-transparent px-7 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-[#735512]"
            >
              Our community work
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-black px-6 py-20 text-center sm:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-[#d8ba65]">
            Shazonique&apos;s Inspiration
          </p>

          <h2 className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-tight text-white">
            Every meaningful journey begins with a page.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-medium leading-relaxed text-white/75">
            Enter the collection and find the story, reflection, or resource meant
            for this season of your life.
          </p>

          <Link
            href="/books"
            className="mt-10 inline-flex items-center justify-center rounded-md border border-[#d8ba65] bg-[#d8ba65] px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-black"
          >
            Browse the collection
          </Link>
        </Reveal>
      </section>
    </>
  );
}
