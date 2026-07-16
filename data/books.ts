import type { Book } from "@/lib/types";

/**
 * Every purchase link below was taken from the existing Shazonique's Inspiration
 * "Stores" page or supplied directly. Nothing here is invented.
 *
 * Where a title has no individual retailer link yet, it falls back to the
 * author's Barnes & Noble contributor storefront — a real, working destination
 * rather than a dead "coming soon" button.
 *
 * Descriptions marked `null` are awaiting copy from the authors; the book page
 * simply omits that block rather than showing filler. See
 * docs/content-migration.md → "Content that still needs confirmation".
 */

const NATHLEE_STORE =
  "https://www.barnesandnoble.com/search?attributes.contributorId=29665898&contributorName=Nathlee%20R%20Grant";
const ZOWAYNE_STORE =
  "https://www.barnesandnoble.com/search?attributes.contributorId=29490147&contributorName=Zowayne%20O.%20Williams";

export const books: Book[] = [
  {
    id: "breaking-chains",
    title: "Breaking Chains",
    subtitle: "A Mother's Journey to Healing and Redemption",
    slug: "breaking-chains",
    authorSlugs: ["nathlee-r-grant"],
    cover: "/images/covers/breaking-chains.png",
    description:
      "\"Stop that you stupid child. Why would you even do that! You are just like my mother!\" Angry words often slip from the lips of angry parents, but I posit to you that there is a fuel deeper than anger which often breaks the bonds between mother and child. Come journey with me on a path to deliverance from the unseen beast of Emotional Abuse.",
    excerpt:
      "My heart harboured the weight of negativity, particularly towards my mother. As I relentlessly pursued the negatives, I failed to acknowledge the positive aspects of my mother's character. It was a darkness fueled by my selective focus on her flaws, rendering me blind to the positives she brought to my life as she performed countless acts of kindness and love that I had overlooked. Consumed by bitterness and hatred, I fixated on the negative actions and words that manifested from her, overshadowing even moments of joy. I found it impossible to recognize the love that existed and was ignorant that it sought expression beneath the surface.",
    genre: "Christian memoir",
    isbn: null,
    themes: ["Healing", "Redemption", "Motherhood", "Emotional abuse", "Grace"],
    purchaseLinks: [
      {
        label: "Amazon",
        format: "paperback",
        url: "https://www.amazon.sg/Breaking-Chains-Mothers-Journey-Redemption/dp/B0CXMM5MJP",
      },
      {
        label: "Barnes & Noble",
        format: "paperback",
        url: "https://www.barnesandnoble.com/w/breaking-chains-nathlee-r-grant/1145031104?ean=9798224126897",
      },
      {
        label: "Powell's Books",
        format: "paperback",
        url: "https://www.powells.com/book/breaking-chains-9798224305872",
      },
      {
        label: "Indigo Chapters",
        format: "paperback",
        url: "https://shopsquareone.com/shop/product/breaking-chains-by-nathlee-r-grant-paperback-indigo-chapters-indigobooks-43ea14",
      },
      {
        label: "Booktopia",
        format: "ebook",
        url: "https://www.booktopia.com.au/breaking-chains-nathlee-r-grant/ebook/9798224038756.html",
      },
      {
        label: "Vivlio",
        format: "ebook",
        url: "https://shop.vivlio.com/product/9798224038756_9798224038756_10020/breaking-chains-a-mothers-journey-to-healing-and-redemption",
      },
      {
        label: "Smashwords",
        format: "ebook",
        url: "https://www.smashwords.com/profile/view/Nathlee_R._Grant",
      },
      {
        label: "bol.com",
        format: "ebook",
        url: "https://www.bol.com/nl/nl/p/breaking-chains-a-mother-s-journey-to-healing-and-redemption/9300000175047485/",
      },
      {
        label: "IBS",
        format: "ebook",
        url: "https://www.ibs.it/breaking-chains-mother-s-journey-ebook-inglese-nathlee-r-grant/e/9798224038756",
      },
    ],
    status: "published",
    collection: "breaking-chains",
  },
  {
    id: "the-kings-the-legacy-begins",
    title: "The Kings' — The Legacy Begins",
    subtitle: null,
    slug: "the-kings-the-legacy-begins",
    authorSlugs: ["zowayne-o-williams"],
    // Cover pending. Drop the file at the path below and change `cover` to it.
    // Naming convention: /images/covers/the-kings-the-legacy-begins.png
    cover: null,
    description:
      "A classic story of redemption, salvation and a navigation through life's circumstances, including death. Embark on this remarkable journey with the Kings', a family who had everything and watched it fall apart because of a string of poor decisions, and see how the sovereign hand of God weaves that string into a beautiful story. The story I have written may be fictional, but it doesn't make it any less true, and it may be the story just for you.",
    excerpt:
      "David was a pretty poor guy, born to a low income family. His dad was always busy and hardly home, but his mom spent a lot of time with him and instilled in him the values of a good Christian man. These values, however, never went far with young David. Nevertheless, he loved music. He had a gift for harps and other string instruments as well as pianos and keyboards.",
    genre: "Inspirational fiction",
    isbn: null,
    themes: ["Redemption", "Family", "Legacy", "Salvation"],
    purchaseLinks: [
      {
        label: "Barnes & Noble",
        format: "ebook",
        url: "https://www.barnesandnoble.com/w/the-kings-the-legacy-begins-zowayne-o-williams/1143166410?ean=2940167127869",
      },
      {
        label: "Apple Books",
        format: "ebook",
        url: "https://books.apple.com/us/book/the-kings-the-legacy-begins/id6446051745",
      },
      {
        label: "Rakuten Kobo",
        format: "ebook",
        url: "https://www.kobo.com/ww/en/ebook/the-kings-the-legacy-begins",
      },
      {
        label: "Thalia",
        format: "ebook",
        url: "https://www.thalia.de/shop/home/artikeldetails/A1068246973",
      },
      {
        label: "Vivlio",
        format: "ebook",
        url: "https://shop.vivlio.com/product/9798215834329_9798215834329_10020/the-kings-the-legacy-begins",
      },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "quotes-from-and-for-life",
    title: "Quotes From and For L-I-F-E",
    subtitle: null,
    slug: "quotes-from-and-for-life",
    authorSlugs: ["nathlee-r-grant", "zowayne-o-williams"],
    cover: "/images/covers/quotes-from-and-for-life.png",
    description:
      "Quotes From and For L-I-F-E is a book drawn from life and written for those going through life. It was written based on the experiences and insights of authors Nathlee R. Grant and Zowayne O. Williams. It is shaped by scripture and guided by the Spirit of God.",
    excerpt:
      "Men are but a part of the cast in this skit called life. Here we don't have the privilege of choosing who we act with, and we often dislike our fellow actors because we don't understand the writer's intent.",
    genre: "Inspirational quotations",
    isbn: null,
    themes: ["Wisdom", "Perseverance", "Faith", "Daily living"],
    purchaseLinks: [
      {
        label: "Apple Books",
        format: "ebook",
        url: "https://books.apple.com/us/book/quotes-from-and-for-l-i-f-e/id6446943748",
      },
      {
        label: "Rakuten Kobo",
        format: "ebook",
        url: "https://www.kobo.com/ww/en/ebook/quotes-from-and-for-l-i-f-e",
      },
      {
        label: "Vivlio",
        format: "ebook",
        url: "https://shop.vivlio.com/product/9798215340356_9798215340356_10020/quotes-from-and-for-l-i-f-e",
      },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "the-battle-for-the-church-at-the-crossroads",
    title: "The Battle for the Church at the Crossroads",
    subtitle: null,
    slug: "the-battle-for-the-church-at-the-crossroads",
    authorSlugs: ["zowayne-o-williams"],
    cover: "/images/covers/the-battle-for-the-church-at-the-crossroads.png",
    description:
      "In 2 Corinthians 2:11, the Apostle Paul indicates the necessity of being aware of the enemy's schemes. In that same book he warned how the enemy may appear as an 'Angel of Light' and his messengers masquerade as 'messengers of righteousness'. 'Be desperate for nothing', my mom often says. It is desperation that usually leads us to be deceived by the devil, for it is easy to deceive those who already are. Now as you read this book, ask the question: 'who was deceived?'",
    excerpt:
      "\"The enemy,\" he said passionately, even after 23 years of preaching, \"is like a roaring lion seeking whom he may devour. His purpose is to kill, steal and destroy. Let us not be taken by surprise also by his agents, for they masquerade as messengers of righteousness. So let's be on our guard, therefore, brothers and sisters.\"",
    genre: "Christian fiction",
    isbn: null,
    themes: ["Discernment", "The Church", "Deception", "Scripture"],
    purchaseLinks: [
      {
        label: "Apple Books",
        format: "ebook",
        url: "https://books.apple.com/us/book/the-battle-for-the-church-at-the-crossroads/id6446955335",
      },
      {
        label: "Barnes & Noble",
        format: "ebook",
        url: "https://www.barnesandnoble.com/w/the-battle-for-the-church-at-the-crossroads-zowayne-o-williams/1143280036?ean=2940167121232",
      },
      {
        label: "Rakuten Kobo",
        format: "ebook",
        url: "https://www.kobo.com/ww/en/ebook/the-battle-for-the-church-at-the-crossroads",
      },
      {
        label: "Thalia",
        format: "ebook",
        url: "https://www.thalia.de/shop/home/artikeldetails/A1068395551",
      },
      {
        label: "Vivlio",
        format: "ebook",
        url: "https://shop.vivlio.com/product/9798215080597_9798215080597_10020/the-battle-for-the-church-at-the-crossroads",
      },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "oscar-the-great",
    title: "Oscar the Great",
    subtitle: null,
    slug: "oscar-the-great",
    authorSlugs: ["zowayne-o-williams"],
    cover: "/images/covers/oscar-the-great.png",
    description:
      "Oscar the Great explores complex themes in a simple manner. Designed for ages 12 and up, it teaches children the collective nouns for birds within a single narrative. But there is a latent message here: it promotes good morals through lessons of leadership, courage, and human rights, set against a plot of conspiracy in a divided and oppressive society. Families can come together over this rather sombre book and leave with something to discuss.",
    excerpt:
      "In the days of old the bird kingdoms were once one. All the birds lived together in harmony and saw each other as equals. They were led by a Parliament of Owls and an Omniscience of Godwits. However, things began to change when the owls, the wisest of all the birds, declared themselves not just the wisest, but also the greatest of all birds.",
    genre: "Allegorical fiction · Ages 12+",
    isbn: null,
    themes: ["Leadership", "Courage", "Human rights", "Governance"],
    purchaseLinks: [
      {
        label: "Rakuten Kobo",
        format: "ebook",
        url: "https://www.kobo.com/ww/en/ebook/oscar-the-great",
      },
      {
        label: "Thalia",
        format: "ebook",
        url: "https://www.thalia.de/shop/home/artikeldetails/A1069268887",
      },
      {
        label: "Vivlio",
        format: "ebook",
        url: "https://shop.vivlio.com/product/9798223604822_9798223604822_10020/oscar-the-great",
      },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "the-conspiracy",
    title: "The Conspiracy",
    subtitle: "The Crucifixion of the Christ",
    slug: "the-conspiracy",
    authorSlugs: ["zowayne-o-williams"],
    cover: "/images/covers/the-conspiracy.png",
    // TODO(content): description awaiting copy from the author.
    description: null,
    excerpt: null,
    genre: "Christian fiction",
    isbn: null,
    themes: ["Scripture", "Power", "Truth"],
    purchaseLinks: [
      { label: "All retailers", format: "storefront", url: ZOWAYNE_STORE },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "what-the-devil-meant-for-evil",
    title: "What the Devil Meant for Evil",
    subtitle: "The Testimony of Stacey-Ann Kidd",
    slug: "what-the-devil-meant-for-evil",
    authorSlugs: ["zowayne-o-williams"],
    cover: "/images/covers/what-the-devil-meant-for-evil.png",
    // TODO(content): description awaiting copy from the author.
    description: null,
    excerpt: null,
    genre: "Testimony",
    isbn: null,
    themes: ["Testimony", "Deliverance", "Faith"],
    purchaseLinks: [
      { label: "All retailers", format: "storefront", url: ZOWAYNE_STORE },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "pack-from-snowy-valley",
    title: "Pack from Snowy Valley",
    subtitle: null,
    slug: "pack-from-snowy-valley",
    authorSlugs: ["zowayne-o-williams"],
    cover: "/images/covers/pack-from-snowy-valley.png",
    // TODO(content): description awaiting copy from the author.
    description: null,
    excerpt: null,
    genre: "Fiction",
    isbn: null,
    themes: ["Fiction"],
    purchaseLinks: [
      { label: "All retailers", format: "storefront", url: ZOWAYNE_STORE },
    ],
    status: "published",
    collection: null,
  },
  {
    id: "bits-and-bites-of-truth-and-wisdom",
    title: "Bits and Bites of Truth and Wisdom",
    subtitle: null,
    slug: "bits-and-bites-of-truth-and-wisdom",
    authorSlugs: ["nathlee-r-grant"],
    cover: "/images/covers/bits-and-bites-of-truth-and-wisdom.png",
    // TODO(content): description awaiting copy from the author.
    description: null,
    excerpt: null,
    genre: "Wisdom and daily living",
    isbn: null,
    themes: ["Wisdom", "Character", "Leadership", "Daily living"],
    purchaseLinks: [
      { label: "All retailers", format: "storefront", url: NATHLEE_STORE },
    ],
    status: "published",
    collection: "bits-and-bites",
  },
  {
    id: "heaven-met-me",
    title: "Heaven Met Me",
    subtitle: null,
    slug: "heaven-met-me",
    authorSlugs: ["nathlee-r-grant"],
    cover: "/images/covers/heaven-met-me.png",
    // TODO(content): description awaiting copy from the author.
    description: null,
    excerpt: null,
    genre: "Christian reflection",
    isbn: null,
    themes: ["Grace", "Encounter", "Hope"],
    purchaseLinks: [
      { label: "All retailers", format: "storefront", url: NATHLEE_STORE },
    ],
    status: "published",
    collection: null,
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function booksByAuthor(slug: string): Book[] {
  return books.filter((b) => b.authorSlugs.includes(slug as Book["authorSlugs"][number]));
}

/**
 * Books related to this one.
 *
 * "Related" means something real, not a guess: first the other books in the same
 * reflection collection, then the rest of the same author's shelf, then anything
 * co-authored — because a book both founders wrote together is related to
 * everything in the house.
 *
 * Never returns the book it was given, and never invents a connection that the
 * data does not support.
 */
export function relatedBooks(book: Book, limit = 3): Book[] {
  const others = books.filter((b) => b.slug !== book.slug);

  const sameCollection = book.collection
    ? others.filter((b) => b.collection === book.collection)
    : [];

  const sameAuthor = others.filter((b) =>
    b.authorSlugs.some((s) => book.authorSlugs.includes(s)),
  );

  const together = others.filter((b) => b.authorSlugs.length > 1);

  const seen = new Set<string>();
  const ordered: Book[] = [];
  for (const b of [...sameCollection, ...sameAuthor, ...together]) {
    if (!seen.has(b.slug)) {
      seen.add(b.slug);
      ordered.push(b);
    }
  }
  return ordered.slice(0, limit);
}
