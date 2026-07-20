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

const footerLinkClass =
  "font-body text-base font-semibold leading-relaxed text-ink-onNight transition-colors duration-300 ease-calm hover:text-gold-soft";

const footerHeadingClass =
  "font-body text-sm font-extrabold uppercase tracking-[0.2em] text-gold-soft";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-night text-ink-onNight">
      <div className="mx-auto max-w-[92rem] px-6 pb-10 pt-20 sm:px-10 lg:pt-24">
        <div className="flex flex-col items-center text-center">
          <Logo size="sm" />

          <p className="mt-8 max-w-2xl font-display text-[clamp(1.65rem,2.5vw,2.35rem)] font-semibold leading-[1.35] text-white">
            Words can heal. Stories can restore.
            <br className="hidden sm:block" />
            One reflection can change a day.
          </p>

          <div className="mt-9 h-px w-24 bg-gold/75" aria-hidden="true" />
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-16">
          <nav aria-label="Explore">
            <h2 className={footerHeadingClass}>Explore</h2>
            <div className="mt-4 h-px w-10 bg-gold/65" aria-hidden="true" />

            <ul className="mt-7 space-y-3">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Authors">
            <h2 className={footerHeadingClass}>Authors</h2>
            <div className="mt-4 h-px w-10 bg-gold/65" aria-hidden="true" />

            <ul className="mt-7 space-y-4">
              {authors.map((author) => (
                <li key={author.slug}>
                  <Link
                    href={`/authors/${author.slug}`}
                    className={footerLinkClass}
                  >
                    {author.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className={footerHeadingClass}>Elsewhere</h2>
            <div className="mt-4 h-px w-10 bg-gold/65" aria-hidden="true" />

            <ul className="mt-7 space-y-4">
              <li>
                <a
                  href={EXTERNAL.devotionsSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  Family Devotions
                </a>
              </li>

              <li>
                <a
                  href={EXTERNAL.legacySite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  Our earlier site
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Write to us">
            <h2 className={footerHeadingClass}>Write to us</h2>
            <div className="mt-4 h-px w-10 bg-gold/65" aria-hidden="true" />

            <ul className="mt-7 space-y-4">
              <li>
                <a
                  href={FORMS.commentToAuthor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  Comment to an author
                </a>
              </li>

              <li>
                <a
                  href={FORMS.reviewABook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  Review a book
                </a>
              </li>

              <li>
                <Link href="/contact" className={footerLinkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-20 grid gap-6 border-t border-gold/25 pt-8 text-center sm:grid-cols-2 sm:items-center sm:text-left">
          <p className="font-body text-sm font-bold uppercase tracking-[0.18em] text-gold-soft sm:text-left">
            {SITE.slogan}
          </p>

          <p className="font-body text-sm font-semibold text-ink-onNightSoft sm:text-right">
            © {new Date().getFullYear()} {SITE.name}. Kingston, Jamaica.
          </p>
        </div>
      </div>
    </footer>
  );
}
