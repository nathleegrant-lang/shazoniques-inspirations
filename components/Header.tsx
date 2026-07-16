"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoLink } from "@/components/Logo";

/**
 * A lintel, not a toolbar.
 *
 * Warm black on every page: the mark was drawn on black and reads best there, and
 * a dark band top and bottom frames the cream rooms between them the way a gallery
 * frames a wall. The logo never has a contrast problem, on any page.
 *
 * v2.1 — simplified. Nine flat links became six doors. Not one route was removed:
 * every destination in the site is still one or two clicks away, and the grouping
 * itself now says the thing the navigation should say — that this is the shared
 * publishing home of two founding authors, both named, in the menu.
 */

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
      { href: "/community", label: "Community" },
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

  // Close everything on navigation. Adjusted during render, not in an effect —
  // see react.dev/learn/you-might-not-need-an-effect.
  const [navigatedFrom, setNavigatedFrom] = useState(pathname);
  if (pathname !== navigatedFrom) {
    setNavigatedFrom(pathname);
    setMenuOpen(false);
    setOpenDrop(null);
  }

  const isActive = useCallback(
    (item: NavItem) => {
      const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])].map(
        (h) => h.split("#")[0],
      );
      return hrefs.some((h) => pathname === h || pathname.startsWith(`${h}/`));
    },
    [pathname],
  );

  // Escape closes the open dropdown; a click anywhere outside does the same.
  useEffect(() => {
    if (!openDrop) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDrop(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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

  return (
    <header className="sticky top-0 z-50 bg-night/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-room items-center justify-between px-6 sm:px-10">
        <LogoLink />

        {/* Desktop */}
        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = isActive(item);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-body text-[0.7rem] uppercase tracking-wide transition-colors duration-500 ease-calm hover:text-gold-soft ${
                        active ? "text-gold-soft" : "text-ink-onNightSoft"
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
                    className={`flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-wide transition-colors duration-500 ease-calm hover:text-gold-soft ${
                      active || open ? "text-gold-soft" : "text-ink-onNightSoft"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`text-[0.5rem] transition-transform duration-500 ease-calm ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {open && (
                    <ul className="absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 border border-white/10 bg-night p-2 shadow-lift">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenDrop(null)}
                            className="block px-4 py-3 transition-colors duration-500 ease-calm hover:bg-white/5"
                          >
                            <span className="block font-display text-lg font-light text-ink-onNight">
                              {child.label}
                            </span>
                            {child.note && (
                              <span className="lockup mt-1 block text-charcoal-faint">
                                {child.note}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="font-body text-[0.7rem] uppercase tracking-wide text-ink-onNightSoft transition-colors duration-500 ease-calm hover:text-gold-soft lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile: not a smaller desktop menu. Everything is laid open — no nested
          taps, no hunting. Each destination gets a full line and room to be tapped
          without care. */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/5 bg-night lg:hidden"
        >
          <ul className="mx-auto max-w-room px-6 py-6 sm:px-10">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-white/5 py-5">
                {item.children ? (
                  <>
                    <p className="lockup text-gold/60">{item.label}</p>
                    <ul className="mt-4 space-y-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block font-display text-2xl font-light text-ink-onNight transition-colors duration-500 ease-calm hover:text-gold-soft"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={`block font-display text-2xl font-light transition-colors duration-500 ease-calm ${
                      isActive(item) ? "text-gold-soft" : "text-ink-onNight"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
