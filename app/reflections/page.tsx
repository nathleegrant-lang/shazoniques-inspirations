import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import ReflectionLibrary from "@/components/ReflectionLibrary";
import ReflectionPlate from "@/components/ReflectionPlate";
import { PageHeader } from "@/components/ui";
import { collections } from "@/data/site";
import {
  authors,
  books,
  emotions,
  reflectionForDate,
  reflections,
  themes,
} from "@/lib/reflections";

export const metadata: Metadata = pageMetadata({
  title: "Reflections",
  description: "A searchable library of reflections drawn from the books of Shazonique's Inspirations. One reflection is featured each day.",
  path: "/reflections",
});

export default function ReflectionsPage() {
  const today = reflectionForDate();
  const live = collections.filter((c) => c.live);
  const coming = collections.filter((c) => !c.live);

  return (
    <>
      <PageHeader
        eyebrow={`${reflections.length} reflections · ${live.length} collection${live.length === 1 ? "" : "s"}`}
        title="Reflections"
        intro="One central truth, held briefly. A new reflection is featured each day; the whole library is searchable below."
      />

      <section className="shell py-16" aria-labelledby="today-heading">
        <div className="grid items-center gap-10 rounded-card border border-charcoal-line bg-charcoal p-6 sm:p-10 lg:grid-cols-[minmax(0,300px)_1fr]">
          <Link href={`/reflections/${today.id}`} className="block">
            <ReflectionPlate reflection={today} priority />
          </Link>
          <div>
            <p className="eyebrow">Today&rsquo;s reflection · {today.code}</p>
            <h2 id="today-heading" className="mt-2 font-display text-3xl">
              {today.title}
            </h2>
            <blockquote className="mt-5 max-w-prose font-display text-xl leading-relaxed">
              {today.text}
            </blockquote>
            <p className="mt-4 font-body text-sm text-ink-onNightSoft">
              {today.author}
              <span className="mx-2 text-gold">·</span>
              <span className="italic text-charcoal-faint">{today.book}</span>
            </p>
            <Link
              href={`/reflections/${today.id}`}
              className="btn-primary mt-7"
            >
              View reflection
            </Link>
          </div>
        </div>
      </section>

      <section className="shell pb-20" aria-label="Reflection library">
        <ReflectionLibrary
          reflections={reflections}
          themes={themes}
          emotions={emotions}
          books={books}
          authors={authors}
        />
      </section>

      <section className="shell pb-24" aria-labelledby="collections">
        <h2 id="collections" className="font-display text-2xl">
          Collections
        </h2>
        <div className="rule-gold mt-4" />
        <p className="mt-4 max-w-prose font-body text-ink-onNightSoft">
          Every book becomes a permanent reflection collection. Breaking Chains is
          the first; the others follow as their libraries are prepared.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...live, ...coming].map((c) => (
            <li
              key={c.id}
              className={`rounded-card border p-5 ${
                c.live
                  ? "border-gold/40 bg-charcoal"
                  : "border-dashed border-charcoal-line"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg">{c.name}</h3>
                <span className="eyebrow shrink-0">
                  {c.live ? "Live" : "In preparation"}
                </span>
              </div>
              <p className="mt-2 font-body text-sm text-ink-onNightSoft">{c.theme}</p>
              <p className="mt-1 font-body text-xs italic text-charcoal-faint">
                {c.palette}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
