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
      {/* FULL-WIDTH HERO — the black site header remains separate above this section */}
      <section className="relative isolate min-h-[42rem] overflow-hidden bg-[#17130d] text-white sm:min-h-[46rem] lg:min-h-[48rem]">
        <Image
          src="/images/home/shazonique-hero-lilies-books-cup.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] sm:object-[60%_center] lg:object-center"
        />

        {/* Darkens only the text area while preserving the sunlit room on the right. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.98)_0%,rgba(9,8,6,0.92)_28%,rgba(12,10,7,0.58)_46%,rgba(10,9,7,0.12)_67%,rgba(8,8,7,0.08)_100%)]" />
        <div className="absolute inset-0 bg-black/20 lg:bg-transparent" />

        <div className="relative mx-auto flex min-h-[42rem] max-w-[96rem] items-center px-6 py-16 sm:min-h-[46rem] sm:px-10 lg:min-h-[48rem] lg:px-14">
          <Reveal className="relative z-10 max-w-[42rem]">
            <p className="font-body text-xs font-extrabold uppercase tracking-[0.23em] text-[#e0b33c] sm:text-sm">
              Independent Christian Publishing
            </p>

            <h1 className="mt-6 font-display text-[clamp(3.8rem,7.2vw,7.4rem)] font-bold leading-[0.92] tracking-[-0.035em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              Shazonique&apos;s
              <br />
              Inspiration
            </h1>

            <p className="mt-7 max-w-xl font-display text-[clamp(1.45rem,2.25vw,2.25rem)] font-semibold leading-[1.28] text-white">
              Books that inspire.
              <br />
              Reflections that restore.
              <br />
              Truth that transforms.
            </p>

            <div className="mt-7 h-px w-36 bg-[#c89a28]" aria-hidden="true" />

            <p className="mt-7 max-w-xl font-body text-base font-normal leading-relaxed text-white/90 sm:text-lg">
              Faith-filled books, reflections, and resources created to encourage
              hearts, strengthen families, and inspire lives of purpose.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/books"
                className="inline-flex items-center justify-center rounded-md border border-[#dfb438] bg-[#dfb438] px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.15em] text-black transition hover:bg-[#f0c858]"
              >
                Explore our books
              </Link>

              <Link
                href={`/reflections/${today.id}`}
                className="inline-flex items-center justify-center rounded-md border border-[#d8ad35] bg-black/35 px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur-[2px] transition hover:bg-black/55"
              >
                Today&apos;s reflection
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED BOOKS — warm cream, with a clean boundary below the hero */}
      <section className="bg-[#f1e3cf] px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="font-body text-xs font-extrabold uppercase tracking-[0.22em] text-[#8c6412]">
                Begin your reading journey
              </p>
              <h2 className="mt-3 font-display text-[clamp(3rem,5vw,5rem)] font-bold leading-none text-[#17120b]">
                Featured Books
              </h2>
            </div>

            <Link
              href="/books"
              className="font-body text-xs font-extrabold uppercase tracking-[0.15em] text-[#704d0c] underline decoration-[#b78822] underline-offset-8"
            >
              View the full catalogue
            </Link>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4 lg:gap-x-10">
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
          <div className="absolute inset-0 bg-black/60" />
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
            <p className="font-body text-xs font-extrabold uppercase tracking-[0.22em] text-[#e0c274]">
              Today&apos;s reflection
            </p>

            <blockquote className="mt-7 font-display text-[clamp(2.2rem,4.4vw,4.8rem)] font-bold italic leading-[1.08] text-white">
              “{today.text}”
            </blockquote>

            <p className="mt-8 font-body text-base font-bold tracking-wide text-white">
              {today.author}
            </p>
            <p className="mt-2 font-body text-lg font-semibold italic text-white/75">
              {today.book}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href={`/reflections/${today.id}`}
                className="inline-flex items-center justify-center rounded-md border border-[#d9bb67] bg-[#d9bb67] px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-[#16120b] transition hover:bg-[#ebd38f]"
              >
                Read the reflection
              </Link>

              <Link
                href="/reflections"
                className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:border-white"
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
            <p className="font-body text-xs font-extrabold uppercase tracking-[0.22em] text-[#8b6718]">
              The people behind the pages
            </p>

            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-bold text-[#111111]">
              Our Founding Authors
            </h2>

            <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-semibold leading-relaxed text-[#333333]">
              Two writers united by one purpose: to create books that speak honestly,
              nurture faith, and leave readers changed.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            {authors.map((author, index) => (
              <Reveal key={author.slug} delay={index * 100}>
                <Link
                  href={`/authors/${author.slug}`}
                  className="group grid items-center gap-8 border-t-2 border-[#1a1a1a] pt-8 sm:grid-cols-[13rem_1fr]"
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
                    <p className="font-body text-xs font-extrabold uppercase tracking-[0.18em] text-[#8b6718]">
                      Founding author
                    </p>

                    <h3 className="mt-3 font-body text-3xl font-extrabold leading-tight text-[#111111]">
                      {author.name}
                    </h3>

                    <p className="mt-5 font-body text-xs font-extrabold uppercase tracking-[0.14em] text-[#704d0c]">
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
      <section className="bg-[#ededeb] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <p className="font-body text-xs font-extrabold uppercase tracking-[0.22em] text-[#806018]">
              Beyond the bookshelf
            </p>

            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-tight text-[#111111]">
              Resources for Learning, Family, and Community
            </h2>

            <p className="mt-6 max-w-3xl font-body text-lg font-semibold leading-relaxed text-[#333333]">
              Shazonique&apos;s Inspiration extends beyond books through educational
              tools, family-centred resources, and community initiatives.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {educationProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 90} as="article">
                <div className="h-full rounded-xl border border-black/15 bg-white p-9 shadow-[0_14px_36px_rgba(0,0,0,0.07)]">
                  <p className="font-body text-xs font-extrabold uppercase tracking-[0.18em] text-[#806018]">
                    Education
                  </p>

                  <h3 className="mt-5 font-body text-2xl font-extrabold leading-tight text-[#111111]">
                    {project.title}
                  </h3>

                  <p className="mt-5 font-body font-semibold leading-relaxed text-[#3a3a3a]">
                    {project.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/education"
              className="inline-flex items-center justify-center rounded-md border border-black bg-black px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-white"
            >
              Explore learning resources
            </Link>

            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-md border border-[#9b7a25] bg-transparent px-7 py-4 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-[#704d0c]"
            >
              Our community work
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-black px-6 py-20 text-center sm:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="font-body text-xs font-extrabold uppercase tracking-[0.24em] text-[#d8ba65]">
            Shazonique&apos;s Inspiration
          </p>

          <h2 className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] font-bold leading-tight text-white">
            Every meaningful journey begins with a page.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-semibold leading-relaxed text-white/80">
            Enter the collection and find the story, reflection, or resource meant
            for this season of your life.
          </p>

          <Link
            href="/books"
            className="mt-10 inline-flex items-center justify-center rounded-md border border-[#d8ba65] bg-[#d8ba65] px-8 py-4 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-black"
          >
            Browse the collection
          </Link>
        </Reveal>
      </section>
    </>
  );
}
