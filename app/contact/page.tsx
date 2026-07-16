import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui";
import { EXTERNAL, FORMS, SITE } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Write to the authors of ${SITE.name}, or leave a review of a book.`,
  path: "/contact",
});

/**
 * Version 1 uses the authors' existing Google Forms rather than a new form that
 * would need a mail provider and a runtime secret. Blueprint §10 allows for a
 * server-action form later; docs/future-supabase-plan.md covers the swap.
 */
const CHANNELS = [
  {
    title: "Write to the authors",
    body: "Questions, encouragement, speaking invitations, or a word about what a book meant to you.",
    label: "Open the form",
    url: FORMS.commentToAuthor,
  },
  {
    title: "Review a book",
    body: "Readers' reviews help other readers find the work. Tell us what you thought.",
    label: "Leave a review",
    url: FORMS.reviewABook,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We read everything"
        title="Contact"
        intro="There is a person at the other end of this. Say what you came to say."
      />

      <section className="shell py-16">
        <ul className="grid gap-8 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <li key={c.url} className="card flex flex-col justify-between p-8">
              <div>
                <h2 className="font-display text-2xl">{c.title}</h2>
                <div className="rule-gold mt-4" />
                <p className="mt-5 font-body leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 self-start"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-prose">
          <h2 className="font-display text-2xl">Our other sites</h2>
          <div className="rule-gold mt-4" />
          <ul className="mt-5 space-y-3 font-body">
            <li>
              <a
                href={EXTERNAL.devotionsSite}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink"
              >
                Shazonique&rsquo;s Inspiration Family Devotions
              </a>
            </li>
            <li>
              <a
                href={EXTERNAL.legacySite}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink"
              >
                The original Shazonique&rsquo;s Inspiration site
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
