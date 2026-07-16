import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, SOCIAL_CARD } from "@/data/site";
import "./globals.css";

/**
 * Fraunces for display: a serif with real warmth and optical sizing — a literary
 * home, not a corporate one. Karla for body: a grotesque with enough character
 * to sit beside it without competing.
 *
 * Loaded as a stylesheet rather than via next/font/google so the project builds
 * in offline/air-gapped environments. Both families are declared in
 * tailwind.config.ts with system serif/sans fallbacks, so the site still reads
 * correctly if the font request is blocked. See README → "Fonts" to switch to
 * next/font/google, which self-hosts the files and removes the extra request.
 */
const FONT_CSS =
  "https://fonts.googleapis.com/css2" +
  "?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400" +
  "&family=Jost:wght@300;400;500" +
  "&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.slogan}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.slogan}`,
    description: SITE.description,
    locale: SITE.locale,
    images: [
      {
        url: SOCIAL_CARD,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.slogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.slogan}`,
    description: SITE.description,
    images: [SOCIAL_CARD],
  },
  // NOTE: no `alternates.canonical` here, on purpose. A canonical set in the
  // layout is inherited by every page, which would tell search engines that
  // /books, /authors and /contact are all the same document. Each page declares
  // its own via lib/seo.ts.
  robots: { index: true, follow: true },
};

/**
 * Site-wide structured data.
 *
 * Organization and WebSite are declared once, here, and given stable @ids. Every
 * other schema on the site (Person on author pages, Book on book pages,
 * Quotation on reflections) references those @ids rather than restating them —
 * so the graph joins up and nothing is duplicated.
 */
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.slogan,
      description: SITE.description,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/brand/logo-on-black.png`,
      },
      image: `${SITE.url}${SOCIAL_CARD}`,
      // Verified from the authors' own pages. Nothing beyond that is claimed:
      // no founding date, no address, no telephone — none of it is in the data.
      founder: [
        {
          "@type": "Person",
          "@id": `${SITE.url}/authors/nathlee-r-grant#person`,
          name: "Nathlee R. Grant",
        },
        {
          "@type": "Person",
          "@id": `${SITE.url}/authors/zowayne-o-williams#person`,
          name: "Zowayne O. Williams",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en-JM",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-JM">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={FONT_CSS} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {/* Marks the document as JavaScript-capable before first paint, so the
            scroll reveal can hide sections without ever hiding them from a
            visitor whose JavaScript is off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
