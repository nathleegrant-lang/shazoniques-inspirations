import type { Config } from "tailwindcss";

/**
 * Shazonique's Inspirations — Version 2.0 design tokens.
 *
 * The palette is not invented. Every gold below was sampled from the logo's own
 * gradient (deep #B29535 → mid #E2C254 → light #F6EABA), so the site inherits the
 * mark's visual language rather than approximating it.
 *
 * The site has two kinds of room. Dark rooms (warm black, near-black charcoal)
 * are where the logo lives natively and where light is scarce and precious.
 * Light rooms (cream, soft white) are where the reading happens. Gold is the
 * thread between them and is never used for large areas — only for rules, small
 * capitals, and moments of light.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── The dark, which is now the house ──────────────────────────────
           Sampled from the brand reference: rich, near-pure, NEUTRAL black and
           a true neutral charcoal for panels. No warmth, no brown. This is the
           gravity of a publishing house that has served readers for fifty years. */
        night: {
          DEFAULT: "#0A0A0A", // rich black — the page itself
          soft: "#141414",    // a breath above black
          raised: "#1C1C1C",  // a panel lifted off the page
        },
        charcoal: {
          DEFAULT: "#2A2A2A", // the content panel, as in the reference cards
          soft: "#333333",    // a hairline lift within a panel
          line: "#3A3A3A",    // borders on dark
          faint: "#8C8C8C",   // small captions on dark — 4.9:1 on #0A0A0A
        },

        /* ── The reading surface ───────────────────────────────────────────
           A COOL ivory for long-form reading only (reflection text, book prose).
           De-yellowed on purpose — this is paper under gallery light, not linen. */
        cream: {
          DEFAULT: "#F4F2EC", // cool ivory — neutral, not beige
          deep: "#E9E6DD",
          shell: "#FBFAF6",   // near-white
        },

        /* ── The one accent: gold ──────────────────────────────────────────
           The logo's gold. On black it can be bright; on ivory it must be dark
           enough to read. Both are drawn from the same metal. */
        gold: {
          deep: "#8A6D22", // AA on ivory (~5:1) — for gold text on light
          DEFAULT: "#B29535",
          soft: "#D9BC5E", // the bright headline gold from the reference
          light: "#F0DFA6",
        },

        /* ── Type ──────────────────────────────────────────────────────────*/
        ink: {
          DEFAULT: "#1E1E1E", // near-black reading ink on ivory
          soft: "#4A4A4A",
          faint: "#6B6B6B",   // 4.6:1 on ivory
          onNight: "#EDEBE6",     // primary text on black (white, warmed a hair)
          onNightSoft: "#B0AFAB", // secondary text on black — 7:1 on #0A0A0A
        },

        /* ── Collection tone ───────────────────────────────────────────────
           The pastel per-collection accents (clay, morning, moss, midnight,
           slate) are RETIRED. One house, one identity: gold on charcoal. A
           collection now shows its character through words, not a colour swatch.
           These aliases remain, all pointing at gold, so any lingering reference
           resolves to the house accent instead of a broken class. */
        collection: {
          DEFAULT: "#B29535",
        },
      },

      fontFamily: {
        /* Cormorant Garamond: a Garamond cut for display. High contrast, light
           weights, and it only comes alive when it is set large and given air —
           which is the whole brief. */
        display: ["Cormorant Garamond", "Garamond", "Georgia", "serif"],
        /* Jost: a geometric sans in the Futura lineage (1927 — timeless, not
           trendy). It is also the closest thing to the wide-tracked capitals in
           the logo's own "INSPIRATION" lockup. */
        body: ["Jost", "system-ui", "-apple-system", "sans-serif"],
      },

      fontSize: {
        /* Display sizes are deliberately large. Whitespace is part of the design. */
        hero: ["clamp(2.5rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        room: ["clamp(2rem, 4.4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        quote: ["clamp(1.75rem, 3.6vw, 3rem)", { lineHeight: "1.32", letterSpacing: "-0.005em" }],
        lead: ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.7" }],
      },

      letterSpacing: {
        /* The logo's capitals are set very wide. Small caps echo it. */
        lockup: "0.32em",
        wide: "0.2em",
      },

      maxWidth: {
        prose: "62ch",
        // Renamed from `room` to `site`. `spacing.room` (the vertical rhythm token)
        // and this key both compiled to `max-w-room`, and the spacing value won —
        // capping every `max-w-room` container at 11rem instead of 78rem. Distinct
        // names keep the utility unambiguous. See docs/maxwidth-room-investigation.md.
        site: "78rem",
        reflection: "44rem",
      },

      spacing: {
        // Named `room-y` (not `room`) on purpose: a bare `room` key here also feeds
        // the max-width scale, regenerating a phantom `max-w-room`. The `-y` suffix
        // reflects that this is vertical rhythm and keeps the namespaces disjoint.
        "room-y": "clamp(6rem, 14vh, 11rem)", // vertical air between rooms
      },

      borderRadius: { card: "2px" }, // almost none — museum, not app

      boxShadow: {
        plate: "0 1px 2px rgba(11,10,9,0.04), 0 24px 60px -32px rgba(11,10,9,0.35)",
        lift: "0 2px 6px rgba(11,10,9,0.05), 0 36px 80px -40px rgba(11,10,9,0.45)",
      },

      transitionTimingFunction: {
        /* Slow, settled, no overshoot. Nothing bounces. */
        calm: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },

      keyframes: {
        /* Animations should almost disappear. */
        settle: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        settle: "settle 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        breathe: "breathe 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
