/**
 * The nine plates.
 *
 * Every reflection carries a "Suggested Colour Palette" from the tracker — nine
 * across the library. They are the reason 120 reflections need no photographs to
 * look considered.
 *
 * Version 3.0 brings them into the house. Earlier passes rendered each plate as a
 * pale wash of its named colour; on the restored dark identity, nine pale
 * rectangles would glow like light-boxes and shatter the calm. So every plate is
 * now the house itself: rich charcoal, gold rule, warm-white words — exactly the
 * devotional card in the brand reference. The nine palettes survive as the
 * faintest shift in the dark ground and in the temperature of the gold, so the
 * library still breathes rather than repeats, but no plate ever raises its voice.
 *
 * The reflection is always the brightest thing on the plate.
 *
 * When real artwork lands, drop BC-001.png into /public/images/reflections/ and
 * set `artwork` on the record. The plate steps aside.
 */

export interface PaletteTheme {
  /** Two stops for the plate's wash. */
  from: string;
  to: string;
  /** The reflection itself. */
  ink: string;
  /** Rule and monogram. */
  accent: string;
  /** Attribution. */
  muted: string;
  /** True when the plate is dark and carries light type. */
  dark: boolean;
}

export const PALETTES: Record<string, PaletteTheme> = {
  // Each plate is a dark charcoal ground with a gold rule and warm-white text.
  // The only variation is a faint shift in the ground and the gold's warmth —
  // enough that the wall of 120 never reads as identical, never as loud.
  "Warm Sunrise": {
    from: "#241E16", to: "#141210", ink: "#F1ECE2", accent: "#E2C254", muted: "#B9B2A4", dark: true,
  },
  "Golden Light": {
    from: "#241F13", to: "#14110A", ink: "#F3EEDD", accent: "#E7CB63", muted: "#BBB39A", dark: true,
  },
  "Morning Mist": {
    from: "#1B1F1C", to: "#101211", ink: "#EDEFEA", accent: "#D9BC5E", muted: "#AEB2A9", dark: true,
  },
  "Soft Blue": {
    from: "#171C21", to: "#0F1113", ink: "#E9EDF0", accent: "#D9BC5E", muted: "#A7AEB4", dark: true,
  },
  Cream: {
    from: "#221F18", to: "#13110C", ink: "#F3EEE2", accent: "#D9BC5E", muted: "#B8B1A2", dark: true,
  },
  "Earth Tones": {
    from: "#221C15", to: "#13100B", ink: "#F0E9DB", accent: "#D2A94E", muted: "#B6AC99", dark: true,
  },
  "Slate Grey": {
    from: "#1E1F21", to: "#111213", ink: "#EDEDEE", accent: "#D9BC5E", muted: "#ABABAD", dark: true,
  },
  "Deep Burgundy": {
    from: "#241619", to: "#140C0E", ink: "#F1E4E2", accent: "#E2C254", muted: "#BAA6A4", dark: true,
  },
  "Autumn Gold": {
    from: "#241D12", to: "#14100A", ink: "#F3EBD9", accent: "#E7C65C", muted: "#BBB097", dark: true,
  },
};

/** An unknown palette name falls back to Cream rather than breaking. */
export const DEFAULT_PALETTE: PaletteTheme = PALETTES.Cream;

export function paletteFor(name: string): PaletteTheme {
  return PALETTES[name] ?? DEFAULT_PALETTE;
}

export const PALETTE_NAMES = Object.keys(PALETTES);
