"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoLink } from "@/components/Logo";

interface NavChild {
  href: string;
  label: string;
  note?: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

const NAV: NavItem[] = [
  { href: "/reflections", label: "Reflections" },
  {
    href: "/books",
    label: "Books",
    children: [
      { href: "/books", label: "All books" },
      { href: "/books#nathlee-r-grant", label: "Nathlee R. Grant", note: "Her books" },
      { href: "/books#zowayne-o-williams", label: "Zowayne O. Williams", note: "His books" },
    ],
  },
  {
    href: "/authors",
    label: "Authors",
    children: [
      { href: "/authors", label: "Both authors" },
      { href: "/authors/nathlee-r-grant", label: "Nathlee R. Grant", note: "Founding Author" },
      { href: "/authors/zowayne-o-williams", label: "Zowayne O. Williams", note: "Founding Author" },
    ],
  },
  {
    href: "/devotions",
    label: "Explore",
    children: [
      { href: "/devotions", label: "Family Devotions" },
      { href: "/education", label: "Education" },
      { href: "/ideas", label: "Ideas & Essays" },
      { href: "/arts-media", label: "Arts & Media" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);

  const [navigatedFrom, setNavigatedFrom] = useState(pathname);

  if (pathname !== navigatedFrom) {
    setNavigatedFrom(pathname);
    setMenuOpen(false);
    setOpenDrop(null);
  }

  const isActive = useCallback(
    (item: NavItem) => {
      const hrefs = [item.href, ...(item.children?.map((child) => child.href) ?? [])]
        .map((href) => href.split("#")[0]);

      return hrefs.some(
        (href) => pathname === href || pathname.startsWith(`${href}/`),
      );
    },
    [pathname],
  );

  const isChildActive = useCallback(
    (href: string) => {
      const cleanHref = href.split("#")[0];
      return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
    },
    [pathname],
  );

  useEffect(() => {
    if (!openDrop) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDrop(null);
    };

    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDrop(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openDrop]);

  const desktopBase =
    "inline-flex min-h-10 items-center rounded-full px-4 py-2 font-body text-[0.82rem] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-calm";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/95 backdrop-blur-sm">
      <div className="mx-auto flex h-24 max-w-[92rem] items-center gap-6 px-6 sm:px-8 lg:px-10">
        <LogoLink />

        <nav ref={navRef} aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-2 xl:gap-3">
            {NAV.map((item) => {
              const active = isActive(item);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`${desktopBase} ${
                        active
                          ? "bg-gold text-night shadow-[0_6px_18px_rgba(178,149,53,0.22)]"
                          : "text-ink-onNight hover:bg-white/5 hover:text-gold-soft"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const open = openDrop === item.label;

              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDrop(open ? null : item.label)}
                    aria-expanded={open}
                    aria-haspopup="true"
                    className={`${desktopBase} gap-2 ${
                      active
                        ? "bg-gold text-night shadow-[0_6px_18px_rgba(178,149,53,0.22)]"
                        : open
                          ? "bg-white/8 text-gold-soft"
                          : "text-ink-onNight hover:bg-white/5 hover:text-gold-soft"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`text-[0.6rem] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {open && (
                    <ul className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 overflow-hidden rounded-lg border border-white/10 bg-night p-2 shadow-lift">
                      {item.children.map((child) => {
                        const childActive = isChildActive(child.href);

                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenDrop(null)}
                              aria-current={childActive ? "page" : undefined}
                              className={`block rounded-md px-5 py-4 transition-colors duration-300 ${
                                childActive
                                  ? "bg-gold text-night"
                                  : "hover:bg-white/5"
                              }`}
                            >
                              <span
                                className={`block font-display text-xl font-semibold ${
                                  childActive ? "text-night" : "text-ink-onNight"
                                }`}
                              >
                                {child.label}
                              </span>

                              {child.note && (
                                <span
                                  className={`mt-1 block font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] ${
                                    childActive
                                      ? "text-night/70"
                                      : "text-charcoal-faint"
                                  }`}
                                >
                                  {child.note}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/community"
          aria-current={pathname.startsWith("/community") ? "page" : undefined}
          className={`hidden min-h-11 items-center rounded-full border px-6 py-3 font-body text-[0.82rem] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-calm lg:inline-flex ${
            pathname.startsWith("/community")
              ? "border-gold bg-gold text-night shadow-[0_6px_18px_rgba(178,149,53,0.22)]"
              : "border-gold text-gold-soft hover:bg-gold hover:text-night"
          }`}
        >
          Community
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="ml-auto rounded-full border border-gold/60 px-5 py-3 font-body text-xs font-bold uppercase tracking-[0.14em] text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-night lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-white/5 bg-night lg:hidden"
        >
          <ul className="mx-auto max-w-site px-6 py-6 sm:px-10">
            {NAV.map((item) => {
              const active = isActive(item);

              return (
                <li key={item.label} className="border-b border-white/5 py-5">
                  {item.children ? (
                    <>
                      <p
                        className={`inline-flex rounded-full px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.15em] ${
                          active
                            ? "bg-gold text-night"
                            : "bg-white/5 text-gold-soft"
                        }`}
                      >
                        {item.label}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {item.children.map((child) => {
                          const childActive = isChildActive(child.href);

                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={childActive ? "page" : undefined}
                                className={`block rounded-md px-4 py-3 font-display text-2xl font-semibold transition-colors duration-300 ${
                                  childActive
                                    ? "bg-gold text-night"
                                    : "text-ink-onNight hover:bg-white/5 hover:text-gold-soft"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-md px-4 py-3 font-display text-2xl font-semibold transition-colors duration-300 ${
                        active
                          ? "bg-gold text-night"
                          : "text-ink-onNight hover:bg-white/5 hover:text-gold-soft"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}

            <li className="py-5">
              <Link
                href="/community"
                aria-current={pathname.startsWith("/community") ? "page" : undefined}
                className={`block rounded-md px-4 py-3 font-display text-2xl font-semibold transition-colors duration-300 ${
                  pathname.startsWith("/community")
                    ? "bg-gold text-night"
                    : "text-gold-soft hover:bg-white/5"
                }`}
              >
                Community
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
