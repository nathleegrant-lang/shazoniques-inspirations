import type { MetadataRoute } from "next";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { SITE } from "@/data/site";
import { reflections } from "@/lib/reflections";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/reflections",
    "/books",
    "/authors",
    "/devotions",
    "/education",
    "/ideas",
    "/arts-media",
    "/community",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: (path === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...reflections.map((r) => ({
      url: `${SITE.url}/reflections/${r.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...books.map((b) => ({
      url: `${SITE.url}/books/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...authors.map((a) => ({
      url: `${SITE.url}/authors/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
