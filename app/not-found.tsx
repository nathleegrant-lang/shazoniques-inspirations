import type { Metadata } from "next";
import Link from "next/link";
import { reflectionForDate } from "@/lib/reflections";

/** A 404 is not a document. It carries no canonical and must not be indexed. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const today = reflectionForDate();

  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        This page isn&rsquo;t here
      </h1>
      <div className="rule-gold mx-auto mt-5" />
      <p className="mx-auto mt-5 max-w-prose font-body text-lg text-ink-onNightSoft">
        The link may be old, or the page may have moved when the site was rebuilt.
        Everything is still here — start again from one of these.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href={`/reflections/${today.id}`} className="btn-secondary">
          Read today&rsquo;s reflection
        </Link>
        <Link href="/books" className="btn-secondary">
          Browse the books
        </Link>
      </div>
    </section>
  );
}
