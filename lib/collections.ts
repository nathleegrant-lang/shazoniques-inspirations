import { collections } from "@/data/site";
import type { Collection } from "@/lib/types";

/**
 * Each collection has a personality.
 *
 * The five collections are not five categories on a shelf — they are five
 * different rooms to be in. Breaking Chains is warm and gentle, because it is a
 * book about healing and it must never feel clinical. Waiting for the Bridegroom
 * is midnight with one lamp lit, because that is literally the parable. Rooted is
 * earth. Faith Finds Home is a warm morning. Bits & Bites is quiet and spare.
 *
 * v3.0 — the per-collection pastel accents (clay, moss, midnight, morning, slate)
 * are RETIRED. One house, one identity: gold on charcoal. A collection now shows
 * its character through its MOOD WORDS alone — language, not a colour swatch. Every
 * accent below is the house gold, kept as a field only so existing callers still work.
 */

export interface CollectionMood {
  /** Retired as a differentiator — always the house gold now. Kept for callers. */
  accent: string;
  /** Three words. They are used as a caption, so they must read as English. */
  mood: string;
}

const MOODS: Record<string, CollectionMood> = {
  "breaking-chains": {
    accent: "#B29535", // house gold (pastel retired)
    mood: "Warm healing",
  },
  rooted: {
    accent: "#B29535", // house gold (pastel retired)
    mood: "Nature. Kingdom.",
  },
  "waiting-for-the-bridegroom": {
    accent: "#B29535", // house gold (pastel retired)
    mood: "Expectation. Hope.",
  },
  "faith-finds-home": {
    accent: "#B29535", // house gold (pastel retired)
    mood: "Belonging. Warmth.",
  },
  "bits-and-bites": {
    accent: "#B29535", // house gold (pastel retired)
    mood: "Minimal. Elegant. Quiet wisdom.",
  },
};

/** Gold is the house accent — the fallback for anything not in a collection. */
export const HOUSE_ACCENT = "#B29535";

export function moodFor(collectionId: string | null): CollectionMood | null {
  if (!collectionId) return null;
  return MOODS[collectionId] ?? null;
}

export function accentFor(collectionId: string | null): string {
  return moodFor(collectionId)?.accent ?? HOUSE_ACCENT;
}

export function getCollection(id: string | null): Collection | null {
  if (!id) return null;
  return collections.find((c) => c.id === id) ?? null;
}
