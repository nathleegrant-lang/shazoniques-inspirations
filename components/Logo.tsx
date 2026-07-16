import Image from "next/image";
import Link from "next/link";

/**
 * The mark, unaltered.
 *
 * The supplied artwork is not redesigned, recoloured, or reinterpreted. The only
 * production step applied was removing the flat black background so the mark can
 * sit on a light surface — the artwork itself is untouched, including the black
 * text inside the white tagline bar.
 *
 * The lockup already carries the slogan, so it is never repeated as text
 * immediately beside the logo. That would be saying the same thing twice.
 */
export function Logo({
  size = "sm",
  priority = false,
}: {
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  const dims =
    size === "lg"
      ? { width: 959, height: 573, className: "h-auto w-[min(30rem,78vw)]" }
      : { width: 959, height: 573, className: "h-auto w-[7rem] sm:w-[8.25rem]" };

  return (
    <Image
      src="/images/brand/logo.png"
      alt="Shazonique's Inspirations — A heart's home of hope"
      width={dims.width}
      height={dims.height}
      className={dims.className}
      priority={priority}
    />
  );
}

/** The header mark, wrapped as a link home. */
export function LogoLink() {
  return (
    <Link
      href="/"
      className="shrink-0 transition-opacity duration-500 ease-calm hover:opacity-80"
      aria-label="Shazonique's Inspirations — home"
    >
      <Logo size="sm" />
    </Link>
  );
}

export default Logo;
