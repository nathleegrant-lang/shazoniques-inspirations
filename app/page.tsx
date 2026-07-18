import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReflectionPlate from "@/components/ReflectionPlate";
import { BookCard } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { SITE, collections, projectsIn } from "@/data/site";
import { reflectionForDate } from "@/lib/reflections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.slogan}`,
  description: SITE.description,
  path: "/",
});

const FEATURED = [
  "breaking-chains",
  "the-kings-the-legacy-begins",
  "quotes-from-and-for-life",
  "oscar-the-great",
];

function RoomLabel({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`lockup ${tone === "dark" ? "text-gold/70" : "text-gold-deep/80"}`}>
      {children}
    </p>
  );
}

export default function HomePage() {
  const today = reflectionForDate();
  const featured = FEATURED.map((slug) =>
    books.find((b) => b.slug === slug),
  ).filter((b): b is (typeof books)[number] => Boolean(b));
  const liveCollections = collections.filter((c) => c.live);
  const education = projectsIn("Education").slice(0, 3);
  const community = projectsIn("Community");

  return (
    <>
      {/* Homepage hero: the header carries the logo, so the centre is reserved
          for the name and the three-part promise only. */}
      <section className="relative flex min-h-[30rem] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_90%,rgba(178,149,53,0.12),transparent_42%),linear-gradient(180deg,#090909_0%,#0b0a09_58%,#17130c_100%)] px-6 py-24 text-center sm:min-h-[34rem] lg:min-h-[38rem]">
        <span aria-hidden className="absolute left-[9%] top-[27%] text-5xl text-gold-light/80 blur-[0.5px] sm:text-7xl">✦</span>
        <span aria-hidden className="absolute right-[17%] top-[20%] text-2xl text-gold-light/65 blur-[1px] sm:text-4xl">✦</span>
        <span aria-hidden className="absolute right-[11%] bottom-[20%] text-2xl text-gold-light/60 blur-[1px] sm:text-4xl">✦</span>

        <div className="relative mx-auto max-w-5xl animate-settle">
          <h1 className="font-display text-[clamp(2.6rem,6vw,5.3rem)] font-light tracking-[0.14em] text-ink-onNight sm:tracking-[0.18em]">
            Shazonique&rsquo;s Inspirations
          </h1>
          <p className="mx-auto mt-7 max-w-4xl font-body text-[clamp(1rem,1.8vw,1.45rem)] font-light text-gold-soft">
            Books that inspire. Reflections that restore. Truth that transforms.
          </p>
        </div>
      </section>

      {/* Founding authors — equal scale, real supplied portraits, one shared mission. */}
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,#111111_0%,#0b0a09_100%)] px-6 py-16 text-ink-onNight sm:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[88rem] items-center gap-12 lg:grid-cols-[minmax(14rem,1fr)_minmax(24rem,1.5fr)_minmax(14rem,1fr)] lg:gap-10">
          {authors.map((author, index) => (
            <article
              key={author.slug}
              className={`${index === 1 ? "lg:col-start-3" : "lg:col-start-1"} flex flex-col items-center text-center ${index === 1 ? "lg:row-start-1" : ""}`}
            >
              <Link href={`/authors/${author.slug}`} className="group">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-gold/80 bg-night shadow-[0_0_0_6px_rgba(178,149,53,0.05)] sm:h-52 sm:w-52">
                  <Image
                    src={author.portrait ?? ""}
                    alt={`Portrait of ${author.name}`}
                    fill
                    sizes="208px"
                    className="object-cover transition-transform duration-700 ease-calm group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="mt-6 font-display text-3xl font-light text-gold-soft transition-colors duration-500 group-hover:text-gold-light">
                  {author.name}
                </h2>
                <p className="mt-3 font-body text-xs uppercase tracking-wide text-gold-soft/90">
                  Founding Author
                </p>
                <div className="mx-auto mt-4 h-px w-16 bg-gold/70" />
              </Link>
            </article>
          ))}

          <div className="text-center lg:col-start-2 lg:row-start-1">
            <div className="flex items-center justify-center gap-4 text-gold-soft">
              <span className="h-px w-20 bg-gold/60" />
              <p className="font-body text-xs uppercase tracking-[0.22em]">Our Founding Authors</p>
              <span className="h-px w-20 bg-gold/60" />
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-light">
              Two Writers. One Mission.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-ink-onNightSoft sm:text-lg">
              We write to inspire hearts, strengthen families, and illuminate the path of faith, purpose, and transformation.
            </p>
            <Link href="/authors" className="btn-gold-on-night mt-9">
              Meet the authors
            </Link>
          </div>
        </div>
      </section>

      {/* Today’s reflection remains part of the homepage, beneath the approved
          opening composition. */}
      <section className="room bg-night">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel tone="dark">Today&rsquo;s Reflection</RoomLabel>
          </Reveal>

          <Reveal
            delay={120}
            className="mx-auto mt-16 grid max-w-5xl items-center gap-16 lg:grid-cols-[minmax(0,22rem)_1fr]"
          >
            <div className="mx-auto w-full max-w-sm">
              <ReflectionPlate reflection={today} size="hero" priority />
            </div>

            <div className="text-center lg:text-left">
              <blockquote className="font-display text-quote font-light italic leading-snug text-ink-onNight">
                &ldquo;{today.text}&rdquo;
              </blockquote>

              <p className="mt-10 font-body text-sm font-light tracking-wide text-ink-onNightSoft">
                {today.author}
              </p>
              <p className="mt-1 font-display text-base italic text-ink-onNight-faint">
                {today.book}
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link href={`/reflections/${today.id}`} className="btn-gold-on-night">
                  Sit with this reflection
                </Link>
                <Link
                  href="/reflections"
                  className="inline-flex items-center px-2 py-4 font-body text-xs uppercase tracking-wide text-ink-onNight-faint transition-colors duration-500 ease-calm hover:text-gold-soft"
                >
                  Reflection library
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Four — Books ───────────────────────────────────────────────── */}
      <section className="room bg-night-soft">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel>Room Four</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">The books</h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light text-ink-onNightSoft">
              Fiction, faith, family, and the shape of a just society — from both
              authors, and once, from both together.
            </p>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4">
            {featured.map((book, i) => (
              <Reveal key={book.slug} delay={i * 90}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 text-center">
            <Link href="/books" className="btn-gold">
              The whole catalogue
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Room Five — Family Devotions ────────────────────────────────────── */}
      <section className="room bg-night">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel tone="dark">Room Five</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light text-ink-onNight">
              Family devotions
            </h2>
            <div className="mx-auto mt-10 h-px w-16 bg-gold/40" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-onNightSoft">
              Devotionals, quiet quotes, and audio-visual pieces — made to be read
              together, around a table, at the end of a day.
            </p>
            <div className="mt-12">
              <Link href="/devotions" className="btn-gold-on-night">
                Come and sit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Six — Education ────────────────────────────────────────────── */}
      <section className="room bg-night-soft">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel>Room Six</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">Education</h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light text-ink-onNightSoft">
              Free study platforms and teaching resources for Jamaican students and
              the people who teach them.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            {education.map((project, i) => (
              <Reveal key={project.id} delay={i * 100} as="article">
                <div className="h-full border border-charcoal-line bg-night p-10 text-center transition-colors duration-700 ease-calm hover:border-gold/40">
                  <h3 className="font-display text-2xl font-light">
                    {project.title}
                  </h3>
                  <p className="mt-5 font-body text-sm font-light leading-relaxed text-ink-onNightSoft">
                    {project.summary}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 text-center">
            <Link href="/education" className="btn-gold">
              All resources
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Room Seven — Ideas ──────────────────────────────────────────────── */}
      <section className="room bg-night">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel>Room Seven</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">
              Ideas &amp; essays
            </h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-onNightSoft">
              Civic thought, faith, and the questions that do not resolve in a
              paragraph. A room still being furnished.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/ideas" className="btn-gold">
                Look inside
              </Link>
              <Link
                href="/arts-media"
                className="inline-flex items-center px-2 py-4 font-body text-xs uppercase tracking-wide text-charcoal-faint transition-colors duration-500 ease-calm hover:text-gold-deep"
              >
                Arts &amp; Media
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Eight — Community ──────────────────────────────────────────── */}
      <section className="room bg-night-soft">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel>Room Eight</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">Community</h2>
            <div className="mx-auto mt-10 rule" />
            {community[0] && (
              <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-onNightSoft">
                {community[0].summary}
              </p>
            )}
            <div className="mt-12">
              <Link href="/community" className="btn-gold">
                {community[0]?.title ?? "Our community work"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The way out ──────────────────────────────────────────────────────
          The collections, named quietly — a promise of what is still being written. */}
      <section className="room bg-night">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-4xl text-center">
            <RoomLabel tone="dark">The collections</RoomLabel>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {collections.map((c) => (
                <li
                  key={c.id}
                  className={`font-display text-xl font-light italic ${
                    c.live ? "text-ink-onNight" : "text-ink-onNight-faint"
                  }`}
                >
                  {c.name}
                </li>
              ))}
            </ul>
            <p className="mt-12 font-body text-xs font-light tracking-wide text-ink-onNight-faint">
              {liveCollections.length} of {collections.length} open. The rest are
              being written.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
