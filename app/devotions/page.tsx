import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui";
import { DEVOTIONS_HOME, devotionals } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Family Devotions",
  description: "Shazonique's Inspiration Family Devotions — devotions born out of real family conversations around the table.",
  path: "/devotions",
});

const GROUPS = ["Devotionals", "Quotes", "Audio Visuals"] as const;

export default function DevotionsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${devotionals.length} devotions and series`}
        title="Family Devotions"
        intro="A heart-centered devotional space born out of family moments — times spent together reflecting, questioning, and exploring what it truly means to be a follower of Christ."
      />

      <section className="shell py-16">
        <div className="max-w-prose space-y-4 font-body text-lg leading-relaxed text-ink-soft">
          <p>
            These devotions are not just written pieces, but the fruit of real
            conversations — of wrestling with truth, listening for God, and
            allowing His Word to shape each heart. As a family, we are grateful to
            share these sacred moments with you.
          </p>
          <p>
            This space was created to offer hope, reflection, encouragement, and
            spiritual renewal. It is a place where words can minister, families can
            connect, and faith can be nurtured one devotion at a time.
          </p>
          <p className="text-sm italic text-ink-faint">
            Please note: the transcription and refinement of these recorded family
            discussions were completed with the assistance of AI tools, helping us
            preserve and present each moment with clarity and care.
          </p>
        </div>

        <a
          href={DEVOTIONS_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-9"
        >
          Visit the Family Devotions site
        </a>
      </section>

      {GROUPS.map((group) => {
        const items = devotionals.filter((d) => d.group === group);
        if (items.length === 0) return null;
        return (
          <section
            key={group}
            className="shell border-t border-ink/10 py-14"
            aria-labelledby={group}
          >
            <p className="eyebrow">{items.length} in this series</p>
            <h2 id={group} className="mt-2 font-display text-2xl">
              {group}
            </h2>
            <div className="rule-gold mt-4" />

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <li key={d.id}>
                  <a
                    href={d.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex h-full flex-col justify-between gap-4 p-5"
                  >
                    <div>
                      <h3 className="font-display text-lg group-hover:text-gold-deep">
                        {d.title}
                      </h3>
                      <p className="mt-2 font-body text-sm text-ink-soft">
                        {d.summary}
                      </p>
                    </div>
                    <span className="font-body text-xs text-gold">
                      Open on the devotions site &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
