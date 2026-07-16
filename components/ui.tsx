import Image from "next/image";
import Link from "next/link";
import { authors } from "@/data/authors";
import type { Author, Book } from "@/lib/types";

/**
 * The furniture of the house.
 *
 * Everything here is quiet. Nothing shouts, nothing bounces, nothing competes
 * with the words it is holding. Where an asset is missing, the fallback is
 * designed rather than apologetic — a typeset plate, never a broken image and
 * never a grey box.
 */

/** A heading inside a room. The label states a fact, not a slogan. */
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-prose">
      {eyebrow && <p className="lockup text-gold-deep/80">{eyebrow}</p>}
      <h2 className="mt-6 font-display text-room font-light">{title}</h2>
      <div className="rule mt-8" />
      {children && (
        <p className="mt-8 font-body text-lead font-light leading-relaxed text-ink-soft">
          {children}
        </p>
      )}
    </div>
  );
}

/**
 * The threshold of an inner page.
 *
 * Centred, generously spaced, and followed by nothing but air. A visitor should
 * know where they are and feel no hurry to move on.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="bg-cream-shell px-6 pb-20 pt-24 text-center sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="lockup text-gold-deep/80">{eyebrow}</p>
        <h1 className="mt-8 font-display text-room font-light">{title}</h1>
        <div className="mx-auto mt-10 rule" />
        {intro && (
          <p className="mx-auto mt-10 max-w-prose font-body text-lead font-light leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

function authorNames(book: Book): string {
  return book.authorSlugs
    .map((s) => authors.find((a) => a.slug === s)?.name ?? s)
    .join(" & ");
}

/**
 * A cover may not exist yet. Rather than a broken image, render a typeset spine
 * — it keeps the grid even and still tells the reader what the book is.
 */
export function BookCover({ book }: { book: Book }) {
  if (book.cover) {
    return (
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={book.cover}
          alt={`Front cover of ${book.title} by ${authorNames(book)}`}
          fill
          sizes="(max-width: 640px) 45vw, 240px"
          className="object-contain object-bottom drop-shadow-[0_18px_36px_rgba(11,10,9,0.28)]"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[2/3] w-full flex-col justify-between border border-gold/25 bg-night p-6 shadow-plate">
      <span className="lockup text-gold/60">Cover coming</span>
      <span className="font-display text-xl font-light leading-tight text-ink-onNight">
        {book.title}
      </span>
      <span className="font-body text-[0.65rem] font-light tracking-wide text-charcoal-faint">
        {authorNames(book)}
      </span>
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group text-center">
      <Link href={`/books/${book.slug}`} className="block">
        <div className="transition-transform duration-700 ease-calm group-hover:-translate-y-1.5">
          <BookCover book={book} />
        </div>
        <h3 className="mt-8 font-display text-xl font-light leading-snug transition-colors duration-500 ease-calm group-hover:text-gold-deep">
          {book.title}
        </h3>
      </Link>
      {book.subtitle && (
        <p className="mt-2 font-display text-sm italic text-ink-faint">
          {book.subtitle}
        </p>
      )}
      <p className="lockup mt-4 text-ink-faint">{authorNames(book)}</p>
    </article>
  );
}

/**
 * No portraits have been supplied. Until they are, each author is given a
 * monogram plate — the same plate, at the same size, for both. Neither author
 * can visually dominate the other by accident of who sent a photograph first.
 */
export function AuthorPortrait({
  author,
  className = "",
}: {
  author: Author;
  className?: string;
}) {
  const initials = author.name
    .split(" ")
    .filter((w) => w.length > 1 && !w.endsWith("."))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (author.portrait) {
    return (
      <div className={`relative aspect-[3/4] w-full overflow-hidden ${className}`}>
        <Image
          src={author.portrait}
          alt={`Portrait of ${author.name}`}
          fill
          sizes="(max-width: 640px) 60vw, 260px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[3/4] w-full items-center justify-center border border-gold/25 bg-night shadow-plate ${className}`}
      role="img"
      aria-label={`${author.name} — portrait to come`}
    >
      <span className="font-display text-5xl font-light tracking-wide text-gold-soft/80">
        {initials}
      </span>
    </div>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline font-body text-sm font-light text-ink"
    >
      {children}
    </a>
  );
}
