import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, SOCIAL_CARD } from "@/data/site";
import "./globals.css";

/**
 * Shazonique's typography system
 *
 * Playfair Display gives the site the strong, readable editorial serif used in
 * the approved homepage model. Source Sans 3 keeps paragraphs, navigation,
 * buttons, book names, and author names clear at smaller sizes.
 */
const FONT_CSS =
  "https://fonts.googleapis.com/css2" +
  "?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600;1,700" +
  "&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600" +
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
  robots: { index: true, follow: true },
};

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
