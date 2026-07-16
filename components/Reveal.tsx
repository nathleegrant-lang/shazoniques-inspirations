"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A section that settles into place as it is reached.
 *
 * The motion is deliberately close to invisible: a twelve-hundred-millisecond
 * fade with a sixteen-pixel rise, once, and never again. Nothing bounces, nothing
 * slides, nothing spins. If the visitor has asked their system for reduced
 * motion, the CSS gives them none at all.
 *
 * Content is rendered server-side and is visible without JavaScript — the reveal
 * is an enhancement, never a gate on reading.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Milliseconds. Used sparingly, to let a heading arrive before its body. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browser, or a test environment): show it.
    // Deferred to the next frame rather than called synchronously here — a
    // setState in an effect body triggers a second render pass.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // once. never re-animate on scroll back.
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
