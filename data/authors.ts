import type { Author } from "@/lib/types";

/**
 * Biographies are migrated verbatim from the existing "About the Authors" page.
 *
 * Portraits are supplied and in place. Both were cropped to a 3:4 portrait frame;
 * Nathlee's was additionally lifted out of the decorative green mount it arrived
 * in. See docs/content-migration.md — her source file is small, and a higher
 * resolution original would visibly improve the Authors room.
 *
 * If a portrait is ever removed, AuthorPortrait falls back to a lettered monogram
 * rather than a broken image or a stock photograph.
 */
export const authors: Author[] = [
  {
    id: "nathlee-r-grant",
    name: "Nathlee R. Grant",
    slug: "nathlee-r-grant",
    title: "Founding Author",
    role: "Christian reflection, healing, motherhood, education and family",
    biography: [
      "Nathlee is an inspiring figure, embodying resilience, passion, and a commitment to transformation. Her journey from humble beginnings to becoming a beacon of hope in her family and community is a testament to her strength and character.",
      "With a diverse background in Information Technology, Education, and Leadership, Nathlee has utilized her skills and experiences to drive positive change in various projects and initiatives over nearly three decades. Her passion for transforming the world, particularly in the realm of parenting, reflects her deep-rooted desire to make a meaningful impact on society.",
      "Nathlee's dedication to the upliftment of her community underscores her noble nature and sense of responsibility towards others. Through her actions and example, she serves as a guiding light, not only for her own family members — Yonique, Zowayne, and Nathan — but for all who have the privilege of crossing paths with her.",
      "Her humility, as expressed in her acknowledgment of being a pilgrim on life's journey, speaks to her grounded perspective and spiritual depth. Nathlee's hope is that her footprints will lead others to believe, and that both they and God will find her faithful.",
    ],
    portrait: "/images/authors/nathlee-r-grant.jpg",
    focusAreas: [
      "Christian reflection",
      "Healing and redemption",
      "Motherhood and parenting",
      "Devotional writing",
      "Education",
      "Family development",
      "Community initiatives",
    ],
    storefront:
      "https://www.barnesandnoble.com/search?attributes.contributorId=29665898&contributorName=Nathlee%20R%20Grant",
  },
  {
    id: "zowayne-o-williams",
    name: "Zowayne O. Williams",
    slug: "zowayne-o-williams",
    title: "Founding Author",
    role: "Fiction, history, governance, law and social commentary",
    biography: [
      "Zowayne is a charismatic evangelical Christian who is passionate about the scriptures and teaching others of the Kingdom of God. He is a passionate leader, teacher, speaker, and writer.",
      "Zowayne has served in many capacities ranging from within the church to schools to local government and the corporate world. To his credit he has written books, plays, newspaper articles and sermons.",
      "Since his youth it has been clear that he was destined for greatness, drawing inspiration from the late Rev. Dr. Martin Luther King Jr. He is bold and outspoken, and stands convicted in whatever he believes.",
      "Zowayne has a passion for young children and a love for the elderly. His motto is 'learning from the past, moving forward to the future, while enhancing the present'.",
    ],
    portrait: "/images/authors/zowayne-o-williams.jpg",
    focusAreas: [
      "Fiction",
      "Political and civic thought",
      "Governance",
      "Constitutional ideas",
      "History",
      "Law and public policy",
      "Social commentary",
    ],
    storefront:
      "https://www.barnesandnoble.com/search?attributes.contributorId=29490147&contributorName=Zowayne%20O.%20Williams",
  },
];

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
