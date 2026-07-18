import Image from "next/image";
import Link from "next/link";
import { authors } from "@/data/authors";
import type { Author, Book } from "@/lib/types";

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
      {eyebrow && <p className="lockup font-bold text-gold-soft">{eyebrow}</p>}
      <h2 className="mt-6 font-display text-room font-semibold">{title}</h2>
      <div className="rule mt-8" />
      {children && (
        <p className="mt-8 font-body text-lead font-medium leading-relaxed text-ink-onNightSoft">
          {children}
        </p>
      )}
    </div>
  );
}

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
    <header className="bg-night px-6 pb-20 pt-24 text-center sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="lockup font-bold text-gold-soft">{eyebrow}</p>
        <h1 className="mt-8 font-display text-room font-semibold text-ink-onNight">
          {title}
        </h1>
        <div className="mx-auto mt-10 rule" />
        {intro && (
          <p className="mx-auto mt-10 max-w-prose font-body text-lead font-medium leading-relaxed text-ink-onNightSoft">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

function authorNames(book: Book): string {
  return book.authorSlugs
    .map((slug) => authors.find((author) => author.slug === slug)?.name ?? slug)
    .join(" & ");
}

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
      <span className="lockup font-bold text-gold/70">Cover coming</span>
      <span className="font-display text-xl font-semibold leading-tight text-ink-onNight">
        {book.title}
      </span>
      <span className="font-body text-[0.68rem] font-semibold tracking-wide text-charcoal-faint">
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

        <h3 className="mt-7 font-body text-base font-extrabold leading-snug text-[#17120b] transition-colors duration-500 ease-calm group-hover:text-[#8a6415] sm:text-lg">
          {book.title}
        </h3>
      </Link>

      {book.subtitle && (
        <p className="mt-2 font-body text-sm font-semibold italic leading-snug text-[#51483d]">
          {book.subtitle}
        </p>
      )}

      <p className="mt-4 font-body text-[0.7rem] font-extrabold uppercase tracking-[0.13em] text-[#75531a]">
        {authorNames(book)}
      </p>

      <Link
        href={`/books/${book.slug}`}
        className="mt-4 inline-block font-body text-[0.7rem] font-extrabold uppercase tracking-[0.15em] text-[#805b11]"
      >
        View book →
      </Link>
    </article>
  );
}

export function AuthorPortrait({
  author,
  className = "",
}: {
  author: Author;
  className?: string;
}) {
  const initials = author.name
    .split(" ")
    .filter((word) => word.length > 1 && !word.endsWith("."))
    .map((word) => word[0])
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
      <span className="font-display text-5xl font-semibold tracking-wide text-gold-soft/80">
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
      className="link-underline font-body text-sm font-semibold text-ink-onNight"
    >
      {children}
    </a>
  );
}
