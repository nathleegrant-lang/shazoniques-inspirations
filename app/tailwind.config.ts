import type { Config } from "tailwindcss";

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
        night: {
          DEFAULT: "#0A0A0A",
          soft: "#141414",
          raised: "#1C1C1C",
        },
        charcoal: {
          DEFAULT: "#2A2A2A",
          soft: "#333333",
          line: "#3A3A3A",
          faint: "#8C8C8C",
        },
        cream: {
          DEFAULT: "#F4F2EC",
          deep: "#E9E6DD",
          shell: "#FBFAF6",
        },
        gold: {
          deep: "#8A6D22",
          DEFAULT: "#B29535",
          soft: "#D9BC5E",
          light: "#F0DFA6",
        },
        ink: {
          DEFAULT: "#1E1E1E",
          soft: "#4A4A4A",
          faint: "#6B6B6B",
          onNight: "#EDEBE6",
          onNightSoft: "#B0AFAB",
        },
        collection: {
          DEFAULT: "#B29535",
        },
      },

      fontFamily: {
        display: [
          '"Playfair Display"',
          "Baskerville",
          '"Times New Roman"',
          "serif",
        ],
        body: [
          '"Source Sans 3"',
          "Arial",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },

      fontSize: {
        hero: [
          "clamp(3.5rem, 7vw, 7rem)",
          { lineHeight: "0.92", letterSpacing: "-0.035em" },
        ],
        room: [
          "clamp(2.4rem, 4.4vw, 4.25rem)",
          { lineHeight: "1.04", letterSpacing: "-0.025em" },
        ],
        quote: [
          "clamp(1.75rem, 3.6vw, 3rem)",
          { lineHeight: "1.26", letterSpacing: "-0.012em" },
        ],
        lead: ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.65" }],
      },

      letterSpacing: {
        lockup: "0.24em",
        wide: "0.16em",
      },

      maxWidth: {
        prose: "62ch",
        site: "78rem",
        reflection: "44rem",
      },

      spacing: {
        "room-y": "clamp(6rem, 14vh, 11rem)",
      },

      borderRadius: { card: "2px" },

      boxShadow: {
        plate:
          "0 1px 2px rgba(11,10,9,0.04), 0 24px 60px -32px rgba(11,10,9,0.35)",
        lift:
          "0 2px 6px rgba(11,10,9,0.05), 0 36px 80px -40px rgba(11,10,9,0.45)",
      },

      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },

      keyframes: {
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
        settle:
          "settle 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        breathe: "breathe 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
