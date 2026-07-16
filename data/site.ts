import type { Collection, Devotional, Project } from "@/lib/types";

/**
 * One sentence, introducing both authors together. It lives here rather than in a
 * page so the homepage and /authors can never drift apart on what the ministry is.
 */
export const AUTHORS_INTRO =
  "Two Jamaican writers, equal founders of one house — writing to inspire faith, " +
  "wisdom, healing, thoughtful leadership, and purposeful living through the shared " +
  "ministry of Shazonique's Inspirations.";

/**
 * The hero backdrop.
 *
 * null = the drawn dawn (components/HeroDawn.tsx) — original artwork, no stock
 * photography, built from the logo's own star and gold.
 *
 * To use a real photograph instead, drop it in /public/images/brand/ and set this
 * to its path, e.g. "/images/brand/hero.jpg". Nothing else changes. Choose warmth
 * and light over literal sunrises; the logo must stay the brightest thing on screen.
 */
export const HERO_IMAGE: string | null = null;

/**
 * The branded Open Graph / Twitter card. 1200x630 — the size Facebook, LinkedIn,
 * WhatsApp and X all expect. Built from the official logo, so the branding on a
 * shared link is the real mark rather than a re-typeset imitation.
 *
 * Pages with their own artwork (books, authors) have their own card in the same
 * folder; everything else falls back to this one. See lib/seo.ts.
 */
export const SOCIAL_CARD = "/images/branding/shazonique-social-card.jpg";

export const SITE = {
  name: "Shazonique's Inspirations",
  slogan: "Heart's Home of Hope",
  description:
    "The publishing home of Nathlee R. Grant and Zowayne O. Williams — reflections, books, family devotions, education and community from Jamaica.",
  url: "https://www.shazoniquesinspirations.com",
  locale: "en_JM",
} as const;

/** Brand Guide v2.0 — collection identities. `live` gates what appears in the library. */
export const collections: Collection[] = [
  {
    id: "breaking-chains",
    name: "Breaking Chains",
    theme: "Healing · Redemption · Motherhood · Restoration",
    palette: "Warm Sunrise · Burgundy · Cream",
    prefix: "BC",
    live: true,
    book: "breaking-chains",
  },
  {
    id: "rooted",
    name: "Rooted",
    theme: "Identity · Kingdom · Worship · Abiding",
    palette: "Forest Green · Earth Tones · Soft Cream",
    prefix: "RT",
    live: false,
    book: null,
  },
  {
    id: "waiting-for-the-bridegroom",
    name: "Waiting for the Bridegroom",
    theme: "Readiness · Faithfulness · Hope",
    palette: "Midnight Blue · Gold · White",
    prefix: "WB",
    live: false,
    book: null,
  },
  {
    id: "faith-finds-home",
    name: "Faith Finds Home",
    theme: "Everyday Faith · Purpose · Belonging",
    palette: "Warm Amber · Sage · Morning Light",
    prefix: "FFH",
    live: false,
    book: null,
  },
  {
    id: "bits-and-bites",
    name: "Bits & Bites of Truth and Wisdom",
    theme: "Wisdom · Character · Leadership · Daily Living",
    palette: "White · Charcoal · Gold",
    prefix: "BBW",
    live: false,
    book: "bits-and-bites-of-truth-and-wisdom",
  },
];

const DEVOTIONS_BASE =
  "https://sites.google.com/view/shazonques-inspiration-devot";

/**
 * The existing Family Devotions site publishes each devotion as an image, so
 * there is no body text to migrate. These records preserve every link and the
 * original grouping; the text can be brought across whenever it is supplied.
 */
export const devotionals: Devotional[] = [
  ...Array.from({ length: 9 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `dev-${n}`,
      title: `Devotion ${n}`,
      summary: "A family devotion from the Shazonique table.",
      group: "Devotionals" as const,
      externalUrl: `${DEVOTIONS_BASE}/devotionals/dev-${n}`,
    };
  }),
  {
    id: "gems-of-greatness",
    title: "Gems of Greatness",
    summary: "A quote series on character, courage and calling.",
    group: "Quotes",
    externalUrl: `${DEVOTIONS_BASE}/quotes/gems-of-greatness`,
  },
  {
    id: "the-vine-virtue",
    title: "The Vine & Virtue",
    summary: "A quote series on abiding and the fruit it produces.",
    group: "Quotes",
    externalUrl: `${DEVOTIONS_BASE}/quotes/the-vine-virtue`,
  },
  {
    id: "aud-vis-01",
    title: "Audio Visual 01",
    summary: "A recorded family devotion.",
    group: "Audio Visuals",
    externalUrl: `${DEVOTIONS_BASE}/audio-visuals/aud_vis-01`,
  },
  {
    id: "aud-vis-02",
    title: "Audio Visual 02",
    summary: "A recorded family devotion.",
    group: "Audio Visuals",
    externalUrl: `${DEVOTIONS_BASE}/audio-visuals/aud_vis-02`,
  },
];

export const DEVOTIONS_HOME = `${DEVOTIONS_BASE}/home`;

export const projects: Project[] = [
  {
    id: "grade-5-pep",
    title: "Grade 5 PEP Study Platform",
    category: "Education",
    owner: "Nathlee R. Grant",
    summary:
      "Practice papers, performance tasks and marked feedback for Grade 5 students preparing for the Primary Exit Profile.",
    image: "/images/education/grade-5-pep.png",
    externalUrl: "https://grade-5-pep.vercel.app/",
    status: "live",
  },
  {
    id: "grade-4-pep",
    title: "Grade 4 PEP Study Platform",
    category: "Education",
    owner: "Nathlee R. Grant",
    summary:
      "Language Arts and Mathematics practice built for Grade 4 learners, with instant marking and progress tracking.",
    image: "/images/education/grade-4-pep.png",
    externalUrl: "https://grade-4-pep.vercel.app/",
    status: "live",
  },
  {
    id: "grade-6-pep",
    title: "Grade 6 PEP Study Platform",
    category: "Education",
    owner: "Nathlee R. Grant",
    summary:
      "Exit-year preparation for Grade 6 students. In development — the study platform will follow the Grade 4 and Grade 5 pattern.",
    image: "/images/education/grade-6-pep.png",
    // TODO(content): add the URL once the Grade 6 platform is live.
    externalUrl: null,
    status: "in-development",
  },
  {
    id: "teaching-your-child",
    title: "Teaching Your Child",
    category: "Education",
    owner: "Nathlee R. Grant",
    summary:
      "A resource for parents supporting learning at home.",
    image: "/images/education/teaching-your-child.png",
    externalUrl: null,
    status: "in-development",
  },
  {
    id: "raise-them-right",
    title: "#RaiseThemRight",
    category: "Community",
    owner: "Nathlee R. Grant",
    summary:
      "A public awareness initiative connecting Jamaican families with community support partners — because no parent should have to raise a child alone.",
    image: null,
    externalUrl: "https://raise-them-right.vercel.app/",
    status: "live",
  },
];

export const FORMS = {
  commentToAuthor: "https://forms.gle/ScrDkY5oYjT3jXeV8",
  reviewABook: "https://forms.gle/21A8RrQnvUL3XLS87",
} as const;

export const EXTERNAL = {
  legacySite: "https://sites.google.com/view/shazonique/home",
  devotionsSite: DEVOTIONS_HOME,
} as const;

export function projectsIn(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}
