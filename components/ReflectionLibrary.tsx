"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReflectionPlate from "@/components/ReflectionPlate";
import { filterReflections } from "@/lib/reflections";
import type { Reflection } from "@/lib/types";

interface Props {
  reflections: Reflection[];
  themes: string[];
  emotions: string[];
  books: string[];
  authors: string[];
}

const PAGE = 24;

export default function ReflectionLibrary({
  reflections,
  themes,
  emotions,
  books,
  authors,
}: Props) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("");
  const [emotion, setEmotion] = useState("");
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [shown, setShown] = useState(PAGE);

  const results = useMemo(
    () => filterReflections(reflections, { query, theme, emotion, book, author }),
    [reflections, query, theme, emotion, book, author],
  );

  const filtered = query || theme || emotion || book || author;

  function reset() {
    setQuery("");
    setTheme("");
    setEmotion("");
    setBook("");
    setAuthor("");
    setShown(PAGE);
  }

  function onChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setShown(PAGE);
    };
  }

  const selects = [
    { id: "book", label: "Book", value: book, set: setBook, options: books },
    { id: "author", label: "Author", value: author, set: setAuthor, options: authors },
    { id: "theme", label: "Theme", value: theme, set: setTheme, options: themes },
    { id: "emotion", label: "Emotion", value: emotion, set: setEmotion, options: emotions },
  ];

  return (
    <div>
      <div className="rounded-card border border-ink/10 bg-white/50 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <label
              htmlFor="reflection-search"
              className="eyebrow mb-1.5 block"
            >
              Keyword
            </label>
            <input
              id="reflection-search"
              type="search"
              value={query}
              onChange={onChange(setQuery)}
              placeholder="grace, chains, prayer…"
              className="w-full rounded-card border border-ink/15 bg-cream px-3 py-2 font-body text-sm text-ink placeholder:text-ink-faint/70 focus:border-ink"
            />
          </div>

          {selects.map((s) => (
            <div key={s.id}>
              <label htmlFor={s.id} className="eyebrow mb-1.5 block">
                {s.label}
              </label>
              <select
                id={s.id}
                value={s.value}
                onChange={onChange(s.set)}
                className="w-full rounded-card border border-ink/15 bg-cream px-3 py-2 font-body text-sm text-ink focus:border-ink"
              >
                <option value="">All</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p aria-live="polite" className="font-body text-sm text-ink-soft">
            {results.length} of {reflections.length} reflections
          </p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="font-body text-sm text-ink link-underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-12 rounded-card border border-dashed border-ink/20 p-12 text-center">
          <p className="font-display text-xl text-charcoal">
            No reflections match those filters
          </p>
          <p className="mx-auto mt-2 max-w-sm font-body text-sm text-ink-soft">
            Try a broader keyword, or clear a filter to widen the search.
          </p>
          <button type="button" onClick={reset} className="btn-secondary mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {results.slice(0, shown).map((r) => (
              <li key={r.id}>
                <Link
                  href={`/reflections/${r.id}`}
                  className="group block transition-transform hover:-translate-y-1"
                >
                  <ReflectionPlate reflection={r} />
                  <h3 className="mt-3 font-display text-base leading-snug text-charcoal group-hover:text-gold-deep">
                    {r.title}
                  </h3>
                  <p className="font-body text-xs text-ink-faint">
                    {r.theme} · {r.emotion}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {shown < results.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="btn-secondary"
              >
                Show more reflections
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
