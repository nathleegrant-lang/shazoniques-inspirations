import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui";
import { DEVOTIONS_HOME, EXTERNAL } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Arts & Media",
  description: "Artwork, audio, video and creative projects from Shazonique's Inspirations.",
  path: "/arts-media",
});

/** Blueprint §4 — Phase 2. Real links preserved from the existing site. */
const MEDIA = [
  {
    title: "Breaking Chains — book trailer",
    note: "A short film introducing A Mother's Journey to Healing and Redemption.",
    url: "https://www.youtube.com/watch?v=pjIjZA6N7HE",
  },
  {
    title: "Recorded family devotions",
    note: "Audio-visual devotions recorded around the table.",
    url: DEVOTIONS_HOME,
  },
  {
    title: "Book signings and speeches",
    note: "Video from readings and book launches, hosted on the original site.",
    url: EXTERNAL.legacySite,
  },
];

export default function ArtsMediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Phase two"
        title="Arts & Media"
        intro="Reflection artwork, audio, video and creative work. The gallery is being built; the recordings that already exist are collected here."
      />

      <section className="shell py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MEDIA.map((m) => (
            <li key={m.url}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col justify-between gap-6 p-6"
              >
                <div>
                  <h2 className="font-display text-xl group-hover:text-gold-deep">
                    {m.title}
                  </h2>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                    {m.note}
                  </p>
                </div>
                <span className="font-body text-xs text-gold">Watch &rarr;</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-prose rounded-card border border-dashed border-ink/20 p-8">
          <h2 className="font-display text-xl">Reflection artwork</h2>
          <p className="mt-3 font-body leading-relaxed text-ink-soft">
            Each reflection in the library is designed to carry its own artwork.
            Until those pieces are finished, every reflection is set as a
            typographic plate coloured by its own suggested palette — so the
            library is complete and readable today, and each painting can take its
            place as it is done.
          </p>
        </div>
      </section>
    </>
  );
}
