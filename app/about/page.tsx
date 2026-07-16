import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { AuthorPortrait, PageHeader } from "@/components/ui";
import { authors } from "@/data/authors";
import { SITE, collections } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "The story of Shazonique's Inspirations — a shared publishing home for Nathlee R. Grant and Zowayne O. Williams.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={`About ${SITE.name}`}
        intro="A shared publishing, creative, devotional, educational and civic platform — carrying two names and one conviction."
      />

      <section className="shell py-16">
        <div className="max-w-prose space-y-5 font-body text-lg leading-relaxed text-ink-soft">
          <p>
            Shazonique is a family name before it is a brand. It was made from the
            names of the people it was built for, and it has always meant a
            particular kind of place: warm, honest, unhurried, and open to whoever
            arrives.
          </p>
          <p>
            What is published here comes from that house. Books about healing that
            took years to earn. Devotions that began as arguments at a table.
            Fiction that asks what a country owes its people. Study platforms for
            children sitting an examination that will shape the rest of their
            schooling. A campaign for parents who are trying, and struggling, and
            trying again.
          </p>
          <p>
            The two founding authors write about very different things. Nathlee R.
            Grant writes about faith, healing, motherhood and education. Zowayne O.
            Williams writes fiction, history, governance and law. They are
            published side by side, under one roof, on purpose.
          </p>
          <p className="font-display text-2xl italic text-gold">
            Heart&rsquo;s Home of Hope.
          </p>
          <p>
            It is not a tagline. It is a description of what the house is for.
          </p>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream-deep/50 py-16" aria-labelledby="the-authors">
        <div className="shell">
          <p className="eyebrow">Founding authors</p>
          <h2 id="the-authors" className="mt-2 font-display text-3xl">
            Who writes here
          </h2>
          <div className="rule-gold mt-4" />

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {authors.map((a) => (
              <article key={a.slug} className="flex gap-6">
                <AuthorPortrait author={a} className="h-28 w-24 shrink-0" />
                <div>
                  <h3 className="font-display text-2xl">
                    <Link href={`/authors/${a.slug}`} className="hover:text-gold-deep">
                      {a.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-wider text-gold">
                    {a.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16" aria-labelledby="how">
        <p className="eyebrow">How the publishing works</p>
        <h2 id="how" className="mt-2 font-display text-3xl">
          Every book becomes a library
        </h2>
        <div className="rule-gold mt-4" />
        <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
          A book does not end when it is printed. Each one becomes a permanent
          collection of reflections — one central truth at a time, held briefly,
          returned to daily. Breaking Chains is the first collection to open. These
          follow.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <li
              key={c.id}
              className={`rounded-card border p-5 ${
                c.live ? "border-gold/40 bg-white/60" : "border-dashed border-ink/15"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg">{c.name}</h3>
                <span className="eyebrow shrink-0">
                  {c.live ? "Live" : "In preparation"}
                </span>
              </div>
              <p className="mt-2 font-body text-sm text-ink-soft">{c.theme}</p>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn-primary mt-12">
          Get in touch
        </Link>
      </section>
    </>
  );
}
