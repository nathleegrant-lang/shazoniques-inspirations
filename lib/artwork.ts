import type { Reflection } from "@/lib/types";

/**
 * FUTURE PREPARATION — Reflection Artwork
 *
 * Architecture only. No artwork exists yet (the tracker reports "Not Started"
 * for all 120 Breaking Chains records), so every reflection currently renders as
 * a typeset plate tinted from its own Suggested Colour Palette.
 *
 * This module is the single place that knows where artwork lives and what it is
 * called. When the images are produced, nothing else has to change.
 */

/** Where artwork files are served from. */
export const ARTWORK_DIR = "/images/reflections";

/**
 * The Brand Guide v2.0 file naming convention:
 *   Breaking Chains            BC-001.png
 *   Rooted                     RT-001.png
 *   Waiting for the Bridegroom WB-001.png
 *   Faith Finds Home           FFH-001.png
 *   Bits & Bites               BBW-001.png
 *
 * The prefix is carried in the reflection code itself, so this holds for every
 * collection without a lookup table.
 */
export function artworkPath(reflection: Reflection): string {
  return `${ARTWORK_DIR}/${reflection.artworkFile}`;
}

/**
 * The image to render, or null when there is none.
 *
 * `artwork` is set explicitly per record rather than inferred from the file
 * name, because a file sitting in the folder is not the same as a file that has
 * been approved for publication. Deliberately opting each record in prevents a
 * work-in-progress image from appearing on the live site.
 *
 * To publish artwork:
 *   1. Add the file:  public/images/reflections/BC-001.png
 *   2. Set the field: artwork: "/images/reflections/BC-001.png"
 */
export function artworkSrc(reflection: Reflection): string | null {
  return reflection.artwork ?? null;
}

/** True when a reflection still falls back to its typeset palette plate. */
export function usesFallbackPlate(reflection: Reflection): boolean {
  return artworkSrc(reflection) === null;
}
