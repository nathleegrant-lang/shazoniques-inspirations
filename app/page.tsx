import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReflectionPlate from "@/components/ReflectionPlate";
import { Logo } from "@/components/Logo";
import { AuthorPortrait, BookCard } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import HeroDawn from "@/components/HeroDawn";
import { AUTHORS_INTRO, HERO_IMAGE, SITE, collections, projectsIn } from "@/data/site";
import { reflectionForDate } from "@/lib/reflections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.slogan}`,
  description: SITE.description,
  path: "/",
});

/**
 * The house.
 *
 * The homepage is not a page of sections. It is a sequence of rooms, and the
 * visitor walks through them. Each room does one thing, is given real air above
 * and below, and hands the visitor onward through a single quiet door.
 *
 * Light and dark alternate on purpose. The dark rooms are where the mark lives
 * and where one reflection can hold the whole screen; the light rooms are where
 * the reading happens. Nobody is asked to do anything until Room One has
 * finished speaking.
 */

/** A balanced selection — never a one-author carousel. */
const FEATURED = [
  "breaking-chains",
  "the-kings-the-legacy-begins",
  "quotes-from-and-for-life",
  "oscar-the-great",
];

/** The small capitals that name each room. Structure that encodes something true. */
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
      {/* ── The Hero ────────────────────────────────────────────────────────
          The emotional entrance. The mark, the name, the slogan, one sentence,
          one door. Nothing else on the screen, and a great deal of air around it.

          Behind it: first light. Not a photograph — a drawn dawn built from the
          logo's own gold and its own four-point star, so the hero cannot look
          like anyone else's website. A real photograph can replace it at any time
          by setting HERO_IMAGE in data/site.ts. */}
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden bg-night px-6 py-24 text-center">
        {HERO_IMAGE ? (
          <>
            <Image
              src={HERO_IMAGE}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* The logo must remain the brightest object on the screen. */}
            <div aria-hidden className="absolute inset-0 bg-night/70" />
          </>
        ) : (
          <HeroDawn />
        )}

        <div className="relative flex flex-col items-center">
          <div className="animate-settle">
            <Logo size="lg" priority />
          </div>

          <h1
            className="mt-16 animate-settle font-display text-4xl font-light tracking-wide text-ink-onNight sm:text-5xl"
            style={{ animationDelay: "220ms" }}
          >
            {SITE.name}
          </h1>

          <p
            className="mt-6 animate-settle font-display text-hero font-light italic text-gold-soft"
            style={{ animationDelay: "380ms" }}
          >
            {SITE.slogan}
          </p>

          <p
            className="mt-12 max-w-2xl animate-settle font-body text-lead font-light leading-relaxed text-ink-onNightSoft"
            style={{ animationDelay: "560ms" }}
          >
            Where books inspire, reflections encourage, ideas flourish, and hope
            finds a home.
          </p>

          <div className="mt-14 animate-settle" style={{ animationDelay: "740ms" }}>
            <Link href="/reflections" className="btn-gold-on-night">
              Read today&rsquo;s reflection
            </Link>
          </div>
        </div>

        {/* A quiet invitation downward. It breathes, slowly, and does nothing else. */}
        <div
          aria-hidden
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-breathe"
        >
          <div className="h-14 w-px bg-gradient-to-b from-transparent to-gold/50" />
        </div>
      </section>

      {/* ── Room One — Who we are ──────────────────────────────────────────── */}
      <section className="room bg-cream-shell">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel>Room One</RoomLabel>
            <h1 className="mt-8 font-display text-room font-light">
              A place to breathe
            </h1>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
              Shazonique&rsquo;s Inspirations was founded by two Jamaican authors,{" "}
              <Link href="/authors/nathlee-r-grant" className="link-underline">
                Nathlee R. Grant
              </Link>{" "}
              and{" "}
              <Link href="/authors/zowayne-o-williams" className="link-underline">
                Zowayne O. Williams
              </Link>
              . It exists because words can heal, stories can restore, and truth can
              set people free.
            </p>
            <p className="mx-auto mt-6 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
              Books, reflections, family devotions, education, civic thought. One
              house, many rooms. Stay as long as you like.
            </p>
            <div className="mt-12">
              <Link href="/about" className="btn-gold">
                Our purpose
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Two — Today's Reflection ───────────────────────────────────
          A dark room. One reflection, held. This is the heart of the house, so
          it is given more air than anything else in it. */}
      <section className="room bg-night">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel tone="dark">Room Two · Today</RoomLabel>
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
              <p className="mt-1 font-display text-base italic text-charcoal-faint">
                {today.book}
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link href={`/reflections/${today.id}`} className="btn-gold-on-night">
                  Sit with this reflection
                </Link>
                <Link
                  href="/reflections"
                  className="inline-flex items-center px-2 py-4 font-body text-xs uppercase tracking-wide text-charcoal-faint transition-colors duration-500 ease-calm hover:text-gold-soft"
                >
                  All 120
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Three — Meet the Authors ───────────────────────────────────
          Two columns, identical in every dimension: same width, same portrait
          size, same weight of type. Equality here is structural, not a promise. */}
      <section className="room bg-cream">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel>Room Three</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">
              Meet the authors
            </h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
              {AUTHORS_INTRO}
            </p>
          </Reveal>

          <div className="mt-20 grid gap-16 md:grid-cols-2">
            {authors.map((author, i) => (
              <Reveal key={author.slug} delay={i * 140} as="article">
                <Link
                  href={`/authors/${author.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-56">
                    <AuthorPortrait author={author} />
                  </div>
                  <h3 className="mt-10 font-display text-3xl font-light transition-colors duration-500 ease-calm group-hover:text-gold-deep">
                    {author.name}
                  </h3>
                  <p className="lockup mt-4 text-gold-deep/80">{author.title}</p>
                  <p className="mt-3 font-display text-base italic text-ink-faint">
                    {author.role}
                  </p>
                  <p className="mt-8 max-w-sm font-body text-base font-light leading-relaxed text-ink-soft">
                    {author.biography[0]}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Room Four — Books ───────────────────────────────────────────────── */}
      <section className="room bg-cream-shell">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel>Room Four</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">The books</h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light text-ink-soft">
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
      <section className="room bg-cream">
        <div className="room-inner">
          <Reveal className="text-center">
            <RoomLabel>Room Six</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">Education</h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light text-ink-soft">
              Free study platforms and teaching resources for Jamaican students and
              the people who teach them.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            {education.map((project, i) => (
              <Reveal key={project.id} delay={i * 100} as="article">
                <div className="h-full border border-ink/10 bg-cream-shell p-10 text-center transition-colors duration-700 ease-calm hover:border-gold/40">
                  <h3 className="font-display text-2xl font-light">
                    {project.title}
                  </h3>
                  <p className="mt-5 font-body text-sm font-light leading-relaxed text-ink-soft">
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
      <section className="room bg-cream-shell">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel>Room Seven</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">
              Ideas &amp; essays
            </h2>
            <div className="mx-auto mt-10 rule" />
            <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
              Civic thought, faith, and the questions that do not resolve in a
              paragraph. A room still being furnished.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/ideas" className="btn-gold">
                Look inside
              </Link>
              <Link
                href="/arts-media"
                className="inline-flex items-center px-2 py-4 font-body text-xs uppercase tracking-wide text-ink-faint transition-colors duration-500 ease-calm hover:text-gold-deep"
              >
                Arts &amp; Media
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Room Eight — Community ──────────────────────────────────────────── */}
      <section className="room bg-cream">
        <div className="room-inner">
          <Reveal className="mx-auto max-w-3xl text-center">
            <RoomLabel>Room Eight</RoomLabel>
            <h2 className="mt-8 font-display text-room font-light">Community</h2>
            <div className="mx-auto mt-10 rule" />
            {community[0] && (
              <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
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
                    c.live ? "text-ink-onNight" : "text-charcoal-faint"
                  }`}
                >
                  {c.name}
                </li>
              ))}
            </ul>
            <p className="mt-12 font-body text-xs font-light tracking-wide text-charcoal-faint">
              {liveCollections.length} of {collections.length} open. The rest are
              being written.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
