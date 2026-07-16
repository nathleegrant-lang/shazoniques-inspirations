import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { getAuthor } from "@/data/authors";
import { booksByAuthor } from "@/data/books";

export const metadata: Metadata = pageMetadata({
  title: "Ideas & Essays",
  description: "Governance, law, history, civic thought and social commentary — the essay work of Shazonique's Inspirations.",
  path: "/ideas",
});

/**
 * Blueprint §4 marks Ideas & Essays as Phase 2, but the homepage links here.
 * Rather than a dead link or an empty "coming soon" screen, this page does the
 * honest thing: it says what the section is for, and points at the published
 * work that already carries these ideas.
 */
export default function IdeasPage() {
  const zowayne = getAuthor("zowayne-o-williams");
  const civic = booksByAuthor("zowayne-o-williams").filter((b) =>
    ["oscar-the-great", "the-conspiracy"].includes(b.slug),
  );

  return (
    <>
      <PageHeader
        eyebrow="Phase two"
        title="Ideas & Essays"
        intro="Policy, governance, law, civic thought, history, education and family — written mostly, though not only, by Zowayne O. Williams."
      />

      <section className="shell py-16">
        <div className="max-w-prose">
          <p className="font-body text-lg leading-relaxed text-ink-soft">
            This section is being built. It will hold the essays, columns and
            civic writing that sit behind the fiction — the arguments about how a
            society orders itself, who it protects, and what it owes the people
            inside it.
          </p>
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
            Until then, those ideas are already at work in the books. Oscar the
            Great is an allegory of a parliament that decided wisdom entitled it to
            rule.
          </p>
        </div>

        {civic.length > 0 && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {civic.map((b) => (
              <li key={b.slug} className="card p-6">
                <p className="eyebrow">{b.genre}</p>
                <h2 className="mt-2 font-display text-2xl">
                  <Link href={`/books/${b.slug}`} className="hover:text-gold-deep">
                    {b.title}
                  </Link>
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {b.themes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/10 px-3 py-1 font-body text-xs text-ink-faint"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}

        {zowayne && (
          <Link href={`/authors/${zowayne.slug}`} className="btn-secondary mt-12">
            Read more about {zowayne.name}
          </Link>
        )}
      </section>
    </>
  );
}
