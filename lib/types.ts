/**
 * Core content models — Blueprint v1.0 §12.
 * These shapes are deliberately close to what a Supabase table would return,
 * so Phase 5 can swap the data source without touching components.
 */

export type AuthorSlug = "nathlee-r-grant" | "zowayne-o-williams";

export interface Author {
  id: string;
  name: string;
  slug: AuthorSlug;
  /** Both are Founding Authors. Identical by design — neither outranks the other. */
  title: string;
  /** What this author writes about. Distinct per author; never merged. */
  role: string;
  biography: string[];
  portrait: string | null;
  focusAreas: string[];
  storefront: string | null;
}

export type BookStatus = "published" | "forthcoming";

export interface PurchaseLink {
  label: string;
  url: string;
  format: "paperback" | "ebook" | "storefront";
}

export interface Book {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  authorSlugs: AuthorSlug[];
  cover: string | null;
  description: string | null;
  excerpt: string | null;
  genre: string;
  themes: string[];
  /**
   * ISBN, when there is one. null for every title today — none was supplied, and
   * an ISBN is not something that can be guessed. Book schema emits it only when
   * it is present, so filling this in is the whole job.
   */
  isbn: string | null;
  purchaseLinks: PurchaseLink[];
  status: BookStatus;
  collection: string | null;
}

export interface Reflection {
  id: string;
  code: string;
  title: string;
  text: string;
  author: string;
  authorSlug: AuthorSlug;
  collection: string;
  book: string;
  bookSlug: string;
  chapter: string;
  theme: string;
  emotion: string;
  background: string;
  palette: string;
  tags: string[];
  priority: number;
  artwork: string | null;
  artworkFile: string;
  publishedDate: string | null;
}

export interface Collection {
  id: string;
  name: string;
  theme: string;
  palette: string;
  prefix: string;
  live: boolean;
  book: string | null;
}

export interface Devotional {
  id: string;
  title: string;
  summary: string;
  group: "Devotionals" | "Quotes" | "Audio Visuals";
  externalUrl: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Education" | "Community" | "Arts & Media";
  owner: string;
  summary: string;
  image: string | null;
  externalUrl: string | null;
  status: "live" | "in-development";
}
