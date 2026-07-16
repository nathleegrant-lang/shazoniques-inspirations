import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/ui";
import { projectsIn } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Education",
  description: "PEP study platforms, learning tools and teaching resources from Shazonique's Inspirations.",
  path: "/education",
});

export default function EducationPage() {
  const projects = projectsIn("Education");

  return (
    <>
      <PageHeader
        eyebrow={`${projects.length} learning resources`}
        title="Education"
        intro="Study platforms and teaching resources built for Jamaican learners, their parents, and their teachers — with practice that mirrors the real examination."
      />

      <section className="shell py-16">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const live = p.status === "live" && p.externalUrl;
            const Body = (
              <>
                {p.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-cream-deep">
                    <Image
                      src={p.image}
                      alt={`${p.title} — cover`}
                      fill
                      sizes="(max-width: 640px) 100vw, 340px"
                      className="object-contain p-4"
                    />
                  </div>
                )}
                <div className="mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl">{p.title}</h2>
                    {!live && (
                      <span className="eyebrow shrink-0">In development</span>
                    )}
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  {live && (
                    <span className="mt-4 inline-block font-body text-sm text-gold">
                      Open the platform &rarr;
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <li key={p.id}>
                {live ? (
                  <a
                    href={p.externalUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group block h-full p-5 transition-transform hover:-translate-y-1"
                  >
                    {Body}
                  </a>
                ) : (
                  <div className="h-full rounded-card border border-dashed border-ink/20 p-5">
                    {Body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
