/**
 * Tailwind v4 ships its own PostCSS plugin and includes vendor prefixing,
 * so autoprefixer is no longer a separate dependency.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
