import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReflectionPlate from "@/components/ReflectionPlate";
import { BookCard } from "@/components/ui";
import { authors } from "@/data/authors";
import { books } from "@/data/books";
import { projectsIn, SITE } from "@/data/site";
import { reflectionForDate } from "@/lib/reflections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.slogan}`,
  description: SITE.description,
  path: "/",
});

const FEATURED = [
  "breaking-chains",
  "the-kings-the-legacy-begins",
  "quotes-from-and-for-life",
  "oscar-the-great",
];

export default function HomePage() {
  const today = reflectionForDate();
  const featured = FEATURED.map((slug) => books.find((book) => book.slug === slug)).filter(
    (book): book is (typeof books)[number] => Boolean(book),
  );
  const education = projectsIn("Education").slice(0, 3);
  const community = projectsIn("Community")[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#d8cfbd] bg-[#f4efe4]">
        <div className="mx-auto grid min-h-[38rem] max-w-[88rem] items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-24">
          <Reveal>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6d22]">
              Independent Christian Publishing
            </p>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.2rem,7vw,6.7rem)] font-normal leading-[0.95] tracking-[-0.035em] text-[#171512]">
              Books that stay with you.
            </h1>
            <p className="mt-8 max-w-2xl font-body text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-[#514b42]">
              Stories, reflections, and devotionals written to strengthen faith, restore families, and inspire lives of purpose.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/books" className="inline-flex items-center justify-center border border-[#171512] bg-[#171512] px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#f7f1e6] transition hover:bg-[#2a2722]">
                Explore the books
              </Link>
              <Link href={`/reflections/${today.id}`} className="inline-flex items-center justify-center border border-[#8a6d22] px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5418] transition hover:bg-[#e9dfca]">
                Today&apos;s reflection
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -left-5 top-12 h-[78%] w-[84%] border border-[#bda55d]/50" />
            <div className="relative grid grid-cols-2 items-end gap-5">
              {featured.slice(0, 4).map((book, index) => (
                <Link key={book.slug} href={`/books/${book.slug}`} className={`group relative block ${index === 1 || index === 2 ? "translate-y-8" : ""}`}>
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#ddd4c3] shadow-[0_20px_45px_rgba(35,29,20,0.18)] transition duration-500 group-hover:-translate-y-2">
                    <Image src={book.cover} alt={`Cover of ${book.title}`} fill priority={index < 2} sizes="(max-width: 1024px) 42vw, 230px" className="object-cover" />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[88rem]">
          <Reveal className="flex flex-col gap-6 border-b border-[#cfc5b2] pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6d22]">Selected titles</p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-none text-[#171512]">Begin your reading journey</h2>
            </div>
            <Link href="/books" className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5418] underline decoration-[#bda55d] underline-offset-8">View the full catalogue</Link>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4 lg:gap-x-10">
            {featured.map((book, index) => (
              <Reveal key={book.slug} delay={index * 80}><BookCard book={book} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#3b3325] bg-[#15130f] px-6 py-20 text-[#f5efe3] sm:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[21rem_1fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm"><ReflectionPlate reflection={today} size="hero" priority /></Reveal>
          <Reveal delay={120}>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#d8bd70]">Today&apos;s reflection</p>
            <blockquote className="mt-7 font-display text-[clamp(2rem,4vw,4rem)] font-normal italic leading-[1.12] text-[#f5efe3]">“{today.text}”</blockquote>
            <p className="mt-8 font-body text-sm tracking-wide text-[#c7beaf]">{today.author}</p>
            <p className="mt-1 font-display text-lg italic text-[#a79e91]">{today.book}</p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link href={`/reflections/${today.id}`} className="inline-flex items-center justify-center border border-[#d8bd70] bg-[#d8bd70] px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#17130d] transition hover:bg-[#e4cd8c]">Read the reflection</Link>
              <Link href="/reflections" className="inline-flex items-center px-1 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#d8bd70]">Visit the library</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#efe7d8] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[82rem]">
          <Reveal className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6d22]">The people behind the pages</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.7rem)] text-[#171512]">Meet our founding authors</h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-[#514b42]">Two writers united by one purpose: to create books that speak honestly, nurture faith, and leave readers changed.</p>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            {authors.map((author, index) => (
              <Reveal key={author.slug} delay={index * 100}>
                <Link href={`/authors/${author.slug}`} className="group grid items-center gap-8 border-t border-[#b9aa91] pt-8 sm:grid-cols-[12rem_1fr]">
                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[12rem] overflow-hidden bg-[#d9cfbd]">
                    <Image src={author.portrait ?? ""} alt={`Portrait of ${author.name}`} fill sizes="192px" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d22]">Founding author</p>
                    <h3 className="mt-3 font-display text-4xl text-[#171512]">{author.name}</h3>
                    <p className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.14em] text-[#6d5418]">Read the author profile →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[88rem]">
          <Reveal>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6d22]">Beyond the bookshelf</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5vw,4.7rem)] leading-tight text-[#171512]">Resources for learning, family, and community</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-[#cfc5b2] bg-[#cfc5b2] md:grid-cols-3">
            {education.map((project, index) => (
              <Reveal key={project.id} delay={index * 90} as="article">
                <div className="h-full bg-[#f7f2e8] p-9">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d22]">Education</p>
                  <h3 className="mt-5 font-display text-3xl text-[#171512]">{project.title}</h3>
                  <p className="mt-5 font-body leading-relaxed text-[#5a544a]">{project.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap gap-4">
            <Link href="/education" className="inline-flex items-center justify-center border border-[#171512] bg-[#171512] px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#f7f1e6]">Explore learning resources</Link>
            {community && <Link href="/community" className="inline-flex items-center justify-center border border-[#8a6d22] px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5418]">Our community work</Link>}
          </Reveal>
        </div>
      </section>

      <section className="bg-[#1b1813] px-6 py-20 text-center sm:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-4xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#d8bd70]">Shazonique&apos;s Inspirations</p>
          <h2 className="mt-6 font-display text-[clamp(2.7rem,5vw,5rem)] leading-tight text-[#f5efe3]">Every meaningful journey begins with a page.</h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-[#c7beaf]">Enter the collection and find the story, reflection, or resource meant for this season of your life.</p>
          <Link href="/books" className="mt-10 inline-flex items-center justify-center border border-[#d8bd70] bg-[#d8bd70] px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#17130d]">Browse the collection</Link>
        </Reveal>
      </section>
    </>
  );
}
