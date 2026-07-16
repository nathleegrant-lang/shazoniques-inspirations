import type { Metadata } from "next";
import { SITE, SOCIAL_CARD } from "@/data/site";

/**
 * One place that builds page metadata.
 *
 * Canonical URLs, Open Graph, and Twitter cards are generated here rather than
 * hand-written on each page. That is the whole point: a canonical URL written by
 * hand on fourteen pages is fourteen chances to paste the wrong path, and a
 * duplicate or wrong canonical is worse for search than none at all.
 *
 * The canonical is deliberately NOT set in the root layout. A canonical in the
 * layout would be inherited by every page, telling search engines that /books,
 * /authors and /contact are all the same document. Each page declares its own.
 */

/** Absolute, canonical URL for a path. Always exactly one trailing form. */
export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE.url}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean.replace(/\/+$/, "")}`;
}

/** Absolute URL for an image that lives in /public. */
export function absoluteImage(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

export interface PageSeo {
  title: string;
  description: string;
  /** Site-root-relative, e.g. "/books" or "/books/breaking-chains". */
  path: string;
  /**
   * A page-specific social card, root-relative. Falls back to the branded card.
   * Every card in /images/branding is 1200x630 — the size Facebook, LinkedIn,
   * WhatsApp and X all expect.
   */
  image?: string | null;
  /** Articles (reflections) rather than site pages. */
  type?: "website" | "article" | "book" | "profile";
  /** Open Graph article/profile author names. */
  authors?: string[];
}

export function pageMetadata({
  title,
  description,
  path,
  image = null,
  type = "website",
  authors,
}: PageSeo): Metadata {
  const url = canonicalUrl(path);
  const card = absoluteImage(image ?? SOCIAL_CARD);

  const images = [
    {
      url: card,
      width: 1200,
      height: 630,
      alt: `${SITE.name} — ${SITE.slogan}`,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: type === "book" || type === "profile" ? "website" : type,
      url,
      siteName: SITE.name,
      title: `${title} · ${SITE.name}`,
      description,
      locale: SITE.locale,
      images,
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.name}`,
      description,
      images: [card],
    },
  };
}
