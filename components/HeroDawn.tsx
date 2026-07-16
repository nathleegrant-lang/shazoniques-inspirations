/**
 * First light.
 *
 * The brief asks for a hero image of sunrise, gentle light, hope — and warns
 * against obvious stock photography. So this is not a photograph. It is drawn,
 * from the logo outward.
 *
 * The mark already contains a four-point star. That star is the one figure
 * repeated here, above a horizon that is only just beginning to warm. Nothing in
 * this image was borrowed, licensed, or searched for; it is made of the same two
 * things the logo is made of — gold, and a great deal of dark.
 *
 * It is also, deliberately, almost nothing: a glow, a horizon, three stars. The
 * logo has to be the brightest object on the screen, and it is.
 *
 * A REAL PHOTOGRAPH CAN REPLACE THIS AT ANY TIME. Set `heroImage` in data/site.ts
 * to its path and the homepage uses it instead — no component changes. See
 * docs/design-language.md.
 */
export default function HeroDawn() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* The sun, still below the horizon. Warmth before light. */}
        <radialGradient id="dawn-glow" cx="50%" cy="88%" r="62%">
          <stop offset="0%" stopColor="#E2C254" stopOpacity="0.30" />
          <stop offset="28%" stopColor="#B29535" stopOpacity="0.16" />
          <stop offset="58%" stopColor="#8A6D22" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0B0A09" stopOpacity="0" />
        </radialGradient>

        {/* The horizon itself — a single line of light, no landscape, no cliché. */}
        <linearGradient id="dawn-horizon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B29535" stopOpacity="0" />
          <stop offset="30%" stopColor="#E2C254" stopOpacity="0.34" />
          <stop offset="50%" stopColor="#F6EABA" stopOpacity="0.52" />
          <stop offset="70%" stopColor="#E2C254" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#B29535" stopOpacity="0" />
        </linearGradient>

        {/* Night above, warming toward the horizon. */}
        <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0A09" />
          <stop offset="62%" stopColor="#0F0D0A" />
          <stop offset="100%" stopColor="#171308" />
        </linearGradient>

        <filter id="dawn-soften" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>

        <filter id="star-soften" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#dawn-sky)" />
      <rect width="1600" height="900" fill="url(#dawn-glow)" />

      {/* The horizon, blurred until it is barely a line at all. */}
      <rect
        x="0"
        y="789"
        width="1600"
        height="2.5"
        fill="url(#dawn-horizon)"
        filter="url(#dawn-soften)"
      />
      <rect x="0" y="790" width="1600" height="1" fill="url(#dawn-horizon)" opacity="0.75" />

      {/* The logo's own four-point star, three times, at three sizes. The largest
          breathes on the same slow cycle as the scroll cue: this is the only thing
          on the page that moves on its own, and it moves at the pace of a breath. */}
      <g fill="#F6EABA" filter="url(#star-soften)">
        <path
          d="M392 214 L399.5 244 L430 251.5 L399.5 259 L392 289 L384.5 259 L354 251.5 L384.5 244 Z"
          opacity="0.85"
          className="animate-breathe"
        />
        <path
          d="M1214 172 L1218.5 190 L1237 194.5 L1218.5 199 L1214 217 L1209.5 199 L1191 194.5 L1209.5 190 Z"
          opacity="0.45"
        />
        <path
          d="M1058 402 L1061 414 L1073 417 L1061 420 L1058 432 L1055 420 L1043 417 L1055 414 Z"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
