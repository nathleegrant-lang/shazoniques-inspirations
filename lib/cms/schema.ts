import type { Book, Reflection } from "@/lib/types";

/**
 * FUTURE PREPARATION — CMS
 *
 * Architecture only. There is no admin route, no authentication, and no write
 * path in Version 1.1. Content is edited by changing a file in `data/` and
 * pushing to GitHub, which for a handful of changes a year is faster and safer
 * than any admin panel.
 *
 * This module describes *what would be editable* and which fields must never be
 * silently invented — the rule the whole project is built on. A future admin
 * form is generated from this description; it is not hand-written, so the form
 * and the content model cannot drift apart.
 */

export type FieldKind = "text" | "longtext" | "list" | "number" | "url" | "image" | "select";

export interface FieldSchema {
  /** Must be a real key on the model, enforced by the types below. */
  name: string;
  label: string;
  kind: FieldKind;
  /** false means the field may legitimately be empty — the page omits the block. */
  required: boolean;
  help?: string;
}

/** Keys of T, so a typo in `name` is a compile error rather than a runtime surprise. */
type FieldsOf<T> = ReadonlyArray<FieldSchema & { name: Extract<keyof T, string> }>;

export const REFLECTION_FIELDS: FieldsOf<Reflection> = [
  { name: "code", label: "Reflection ID", kind: "text", required: true, help: "BC-001. The prefix sets the collection." },
  { name: "title", label: "Title", kind: "text", required: true },
  { name: "text", label: "Reflection", kind: "longtext", required: true, help: "One to three sentences. The quote is the hero." },
  { name: "chapter", label: "Chapter", kind: "text", required: true },
  { name: "theme", label: "Theme", kind: "text", required: true },
  { name: "emotion", label: "Emotion", kind: "text", required: true },
  { name: "background", label: "Suggested background", kind: "longtext", required: false },
  { name: "palette", label: "Suggested colour palette", kind: "select", required: true, help: "Drives the fallback plate. See lib/palettes.ts." },
  { name: "tags", label: "Tags", kind: "list", required: false },
  { name: "priority", label: "Priority", kind: "number", required: false, help: "0–5, from the tracker's star rating." },
  { name: "artwork", label: "Artwork", kind: "image", required: false, help: "Leave empty to keep the typeset plate." },
  { name: "publishedDate", label: "Published", kind: "text", required: false },
];

export const BOOK_FIELDS: FieldsOf<Book> = [
  { name: "title", label: "Title", kind: "text", required: true },
  { name: "subtitle", label: "Subtitle", kind: "text", required: false },
  { name: "slug", label: "URL slug", kind: "text", required: true },
  { name: "authorSlugs", label: "Authors", kind: "list", required: true, help: "Two entries for a co-authored book." },
  { name: "cover", label: "Cover", kind: "image", required: false, help: "Empty renders the typeset fallback, never a broken image." },
  { name: "description", label: "Description", kind: "longtext", required: false, help: "Leave empty rather than inventing copy. The page omits the block." },
  { name: "excerpt", label: "Excerpt", kind: "longtext", required: false },
  { name: "genre", label: "Genre", kind: "text", required: true },
  { name: "themes", label: "Themes", kind: "list", required: false },
  { name: "status", label: "Status", kind: "select", required: true, help: "published | forthcoming" },
];

/**
 * The editorial rule, stated once, in code.
 *
 * A field that is not `required` may be empty, and an empty field renders as
 * nothing. It must never be filled with placeholder or generated prose.
 */
export const NEVER_FABRICATE = true as const;
