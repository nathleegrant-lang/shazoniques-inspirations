import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui";
import { projectsIn } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Community",
  description: "Community campaigns and initiatives from Shazonique's Inspirations, including #RaiseThemRight.",
  path: "/community",
});

export default function CommunityPage() {
  const projects = projectsIn("Community");

  return (
    <>
      <PageHeader
        eyebrow="Campaigns and initiatives"
        title="Community"
        intro="Writing is one way to change a generation. Showing up is another."
      />

      <section className="shell py-16">
        <ul className="grid gap-8 lg:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id} className="card p-8">
              <p className="eyebrow">{p.owner}</p>
              <h2 className="mt-2 font-display text-3xl">{p.title}</h2>
              <div className="rule-gold mt-4" />
              <p className="mt-5 max-w-prose font-body text-lg leading-relaxed text-ink-soft">
                {p.summary}
              </p>
              {p.externalUrl && (
                <a
                  href={p.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-7"
                >
                  Visit {p.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
