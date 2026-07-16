import { reflections } from "@/data/reflections";
import type { Reflection } from "@/lib/types";

export { reflections };

/**
 * Deterministic daily selection.
 *
 * The rotation is a pure function of the calendar date, so the server, the
 * build output and any future edge cache all agree on "today" without a
 * database, and the same day always yields the same reflection. Phase 5 can
 * replace this with Supabase-driven scheduling by swapping this one function.
 *
 * With 120 records the library cycles roughly every four months. Adding a
 * collection lengthens the cycle automatically — no logic change needed.
 */

const EPOCH = Date.UTC(2024, 0, 1);
const DAY = 86_400_000;

/** Days elapsed since the epoch, in UTC, ignoring clock time. */
export function dayIndex(date: Date = new Date()): number {
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return Math.floor((utc - EPOCH) / DAY);
}

export function reflectionForDate(date: Date = new Date()): Reflection {
  const i = ((dayIndex(date) % reflections.length) + reflections.length) %
    reflections.length;
  return reflections[i];
}

export function getReflection(id: string): Reflection | undefined {
  return reflections.find((r) => r.id === id.toLowerCase());
}

export function neighbours(id: string): {
  previous: Reflection | null;
  next: Reflection | null;
} {
  const i = reflections.findIndex((r) => r.id === id.toLowerCase());
  if (i === -1) return { previous: null, next: null };
  return {
    previous: i > 0 ? reflections[i - 1] : null,
    next: i < reflections.length - 1 ? reflections[i + 1] : null,
  };
}

/** Facets, derived from the data rather than hard-coded, so new books extend them for free. */
function unique(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export const themes = unique(reflections.map((r) => r.theme));
export const emotions = unique(reflections.map((r) => r.emotion));
export const books = unique(reflections.map((r) => r.book));
export const authors = unique(reflections.map((r) => r.author));

export interface ReflectionFilter {
  query?: string;
  theme?: string;
  emotion?: string;
  book?: string;
  author?: string;
}

export function filterReflections(
  all: Reflection[],
  f: ReflectionFilter,
): Reflection[] {
  const q = f.query?.trim().toLowerCase();
  return all.filter((r) => {
    if (f.theme && r.theme !== f.theme) return false;
    if (f.emotion && r.emotion !== f.emotion) return false;
    if (f.book && r.book !== f.book) return false;
    if (f.author && r.author !== f.author) return false;
    if (!q) return true;
    const haystack = [r.code, r.title, r.text, r.theme, r.emotion, r.chapter, ...r.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

/** Used by the homepage "Latest from Shazonique" strip. */
export function featuredReflections(count: number, exclude?: string): Reflection[] {
  return reflections
    .filter((r) => r.priority >= 5 && r.id !== exclude)
    .slice(0, count);
}
