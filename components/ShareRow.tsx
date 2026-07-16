"use client";

import { useState } from "react";

/** Blueprint §6 — copy link plus Facebook, WhatsApp, Pinterest and email. */
export default function ShareRow({
  url,
  title,
  text,
}: {
  url: string;
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const e = encodeURIComponent;
  const targets = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${e(`${text} — ${url}`)}`,
    },
    {
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${e(url)}&description=${e(text)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${e(title)}&body=${e(`${text}\n\n${url}`)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1">Share</span>
      <button type="button" onClick={copy} className="btn-secondary !px-3 !py-1.5">
        {copied ? "Link copied" : "Copy link"}
      </button>
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary !px-3 !py-1.5"
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}
