import Image from "next/image";
import { artworkSrc } from "@/lib/artwork";
import { paletteFor } from "@/lib/palettes";
import type { Reflection } from "@/lib/types";

/**
 * The signature element of the house.
 *
 * No artwork exists yet — the tracker reports "Not Started" for all 120 records.
 * So the plate is typographic: the reflection, set large and quiet, on a wash
 * drawn from that record's own Suggested Colour Palette, with its code as a
 * small monogram and a single hairline rule.
 *
 * Nine palettes across 120 records means the library never reads as a wall of
 * identical placeholders. Every reflection already has a face. When a real image
 * arrives, it replaces this and nothing else changes.
 */
export default function ReflectionPlate({
  reflection,
  size = "card",
  priority = false,
}: {
  reflection: Reflection;
  size?: "card" | "hero";
  priority?: boolean;
}) {
  const p = paletteFor(reflection.palette);
  const hero = size === "hero";

  // Resolved through lib/artwork.ts so the naming convention and the publish
  // rule live in exactly one place. Null today, for all 120.
  const art = artworkSrc(reflection);

  if (art) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={art}
          alt={`${reflection.title} — ${reflection.background}`}
          fill
          priority={priority}
          sizes={hero ? "(max-width: 768px) 100vw, 480px" : "(max-width: 768px) 50vw, 320px"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <figure
      className="relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden p-8 shadow-plate sm:p-10"
      style={{
        background: `linear-gradient(160deg, ${p.from} 0%, ${p.to} 100%)`,
        color: p.ink,
      }}
    >
      {/* The code, quietly. It is a fact about the reflection, not decoration. */}
      <figcaption
        className="font-body text-[0.625rem] uppercase tracking-lockup"
        style={{ color: p.muted }}
      >
        {reflection.code}
      </figcaption>

      <blockquote
        className={`font-display font-light italic leading-snug ${
          hero ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
        }`}
      >
        {reflection.text}
      </blockquote>

      <div>
        <div
          className="h-px w-10"
          style={{ backgroundColor: p.accent, opacity: 0.55 }}
        />
        <p
          className="mt-5 font-body text-[0.6875rem] font-light tracking-wide"
          style={{ color: p.muted }}
        >
          {reflection.author}
        </p>
      </div>
    </figure>
  );
}
