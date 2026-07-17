import Link from "next/link";
import { authors } from "@/data/authors";
import { Logo } from "@/components/Logo";
import { EXTERNAL, FORMS, SITE } from "@/data/site";

const EXPLORE = [
  { href: "/reflections", label: "Reflections" },
  { href: "/books", label: "Books & Publications" },
  { href: "/devotions", label: "Family Devotions" },
  { href: "/education", label: "Education" },
  { href: "/ideas", label: "Ideas & Essays" },
  { href: "/arts-media", label: "Arts & Media" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * The way out is quiet.
 *
 * The last thing a visitor sees is the mark and the reason the house exists —
 * not a wall of links shouting for one more click. The links are there, small and
 * calm, for anyone who wants them.
 */
export default function Footer() {
  return (
    <footer className="bg-night text-ink-onNightSoft">
      <div className="mx-auto max-w-site px-6 py-24 sm:px-10">
        {/* The mark, once more, with room around it. */}
        <div className="flex flex-col items-center text-center">
          <Logo size="sm" />
          <p className="mt-8 max-w-md font-display text-xl font-light leading-relaxed text-ink-onNight">
            Words can heal. Stories can restore. One reflection can change a day.
          </p>
          <div className="mt-8 h-px w-16 bg-gold/30" />
        </div>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Explore">
            <h2 className="lockup text-gold/70">Explore</h2>
            <ul className="mt-6 space-y-3">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Authors">
            <h2 className="lockup text-gold/70">Authors</h2>
            <ul className="mt-6 space-y-3">
              {authors.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/authors/${a.slug}`}
                    className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className="lockup text-gold/70">Elsewhere</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={EXTERNAL.devotionsSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                >
                  Family Devotions
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL.legacySite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                >
                  Our earlier site
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Write to us">
            <h2 className="lockup text-gold/70">Write to us</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={FORMS.commentToAuthor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                >
                  Comment to an author
                </a>
              </li>
              <li>
                <a
                  href={FORMS.reviewABook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                >
                  Review a book
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body text-sm font-light link-quiet hover:text-gold-soft"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="lockup text-charcoal-faint">
            {SITE.name} · {SITE.slogan}
          </p>
          <p className="font-body text-xs font-light text-charcoal-faint">
            © {new Date().getFullYear()} {SITE.name}. Kingston, Jamaica.
          </p>
        </div>
      </div>
    </footer>
  );
}
