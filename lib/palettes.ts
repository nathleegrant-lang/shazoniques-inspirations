/**
 * The nine palettes.
 *
 * Every reflection in the tracker carries a "Suggested Colour Palette". There
 * are exactly nine across the Breaking Chains library, and they are the reason
 * the collection does not need 120 photographs to look considered.
 *
 * Version 2.0 re-tunes all nine. The first pass rendered them as the spreadsheet
 * literally described — saturated sunrise oranges, a bright burgundy. Held next
 * to the logo they were loud, and loud is the one thing this house is not. Each
 * palette is now a *whisper* of its colour over warm paper or warm dark: the
 * hue is still unmistakably Warm Sunrise or Deep Burgundy, but it never raises
 * its voice, and the reflection is always the loudest thing on the plate.
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
  "Warm Sunrise": {
    from: "#FBF3E6",
    to: "#EBD3B4",
    ink: "#4A3524",
    accent: "#A9793C",
    muted: "#7C6144",
    dark: false,
  },
  "Golden Light": {
    from: "#FDF6E4",
    to: "#EEDCAF",
    ink: "#463A1C",
    accent: "#8A6D22",
    muted: "#75633A",
    dark: false,
  },
  "Morning Mist": {
    from: "#F4F5F1",
    to: "#D9DED6",
    ink: "#333A31",
    accent: "#5E6E58",
    muted: "#5B6157",
    dark: false,
  },
  "Soft Blue": {
    from: "#F1F4F6",
    to: "#D2DDE4",
    ink: "#2C3A44",
    accent: "#4F6B7C",
    muted: "#516069",
    dark: false,
  },
  Cream: {
    from: "#FDFAF3",
    to: "#F0E7D4",
    ink: "#3E3729",
    accent: "#8A6D22",
    muted: "#6D6455",
    dark: false,
  },
  "Earth Tones": {
    from: "#F2E9DC",
    to: "#D2BEA3",
    ink: "#3F3427",
    accent: "#7A5C3C",
    muted: "#645440",
    dark: false,
  },
  "Slate Grey": {
    from: "#2E3134",
    to: "#191B1D",
    ink: "#EDEAE3",
    accent: "#E2C254",
    muted: "#A7A9A6",
    dark: true,
  },
  "Deep Burgundy": {
    from: "#3A2028",
    to: "#1A1013",
    ink: "#F1E6DC",
    accent: "#E2C254",
    muted: "#C3A79C",
    dark: true,
  },
  "Autumn Gold": {
    from: "#F7EBD5",
    to: "#DFC08A",
    ink: "#4A3A1E",
    accent: "#8E6A22",
    muted: "#75603A",
    dark: false,
  },
};

/** An unknown palette name falls back to Cream rather than breaking. */
export const DEFAULT_PALETTE: PaletteTheme = PALETTES.Cream;

export function paletteFor(name: string): PaletteTheme {
  return PALETTES[name] ?? DEFAULT_PALETTE;
}

export const PALETTE_NAMES = Object.keys(PALETTES);
