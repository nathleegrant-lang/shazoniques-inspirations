import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { reflections } from "@/data/reflections";
import type { Author, Book, Reflection } from "@/lib/types";

/**
 * FUTURE PREPARATION — Supabase and CMS
 *
 * Architecture only. Nothing here talks to a database, and Version 1.1 ships
 * with no database, no secrets, and no runtime dependencies.
 *
 * This module is the **seam**. Every page reads content through a ContentSource
 * rather than importing `data/` directly. Today the only implementation is
 * `localSource`, which reads the typed files in `data/`. When Supabase arrives,
 * a `supabaseSource` implements the same interface and one line changes here —
 * no page and no component is touched.
 *
 * The methods are async on purpose. They do not need to be today, but making
 * them async now means the swap to a real database is not a breaking change.
 * See docs/future-supabase-plan.md.
 */

export interface ContentSource {
  readonly name: string;
  getReflections(): Promise<Reflection[]>;
  getBooks(): Promise<Book[]>;
  getAuthors(): Promise<Author[]>;
}

/** The Version 1.1 source: typed local files. Fast, free, and cannot go down. */
export const localSource: ContentSource = {
  name: "local",
  async getReflections() {
    return reflections;
  },
  async getBooks() {
    return books;
  },
  async getAuthors() {
    return authors;
  },
};

/**
 * The active source. To move to Supabase, implement ContentSource against it and
 * change this one assignment.
 */
export const source: ContentSource = localSource;
