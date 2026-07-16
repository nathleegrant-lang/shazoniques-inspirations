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
 * This is expressed with restraint: a single accent colour and a mood, used for a
 * hairline, a label, a hover. Never a themed page, never a wash of colour. The
 * house is one house, and gold and cream hold it together.
 */

export interface CollectionMood {
  /** The one accent. Subtle earth tones only — never a loud colour. */
  accent: string;
  /** Three words. They are used as a caption, so they must read as English. */
  mood: string;
}

const MOODS: Record<string, CollectionMood> = {
  "breaking-chains": {
    accent: "#9A6455", // clay
    mood: "Warm healing",
  },
  rooted: {
    accent: "#35543F", // moss
    mood: "Nature. Kingdom.",
  },
  "waiting-for-the-bridegroom": {
    accent: "#1B2447", // midnight
    mood: "Expectation. Hope.",
  },
  "faith-finds-home": {
    accent: "#B5813F", // warm morning
    mood: "Belonging. Warmth.",
  },
  "bits-and-bites": {
    accent: "#3A3733", // quiet slate
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
