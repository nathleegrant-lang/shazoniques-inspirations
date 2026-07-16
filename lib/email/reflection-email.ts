import { SITE } from "@/data/site";
import type { Reflection } from "@/lib/types";

/**
 * FUTURE PREPARATION — Email Reflections
 *
 * Architecture only. Nothing is sent. There is no provider, no API key, no
 * subscriber list, and no route that delivers mail. Adding any of those is a
 * deliberate later decision, not an accident of this release.
 *
 * What exists here is the part that is genuinely hard to get right and easy to
 * get wrong: the shape of a subscriber, and the exact content of the message.
 * `buildReflectionEmail` is a pure function — given a reflection it returns the
 * subject and body. It has no side effects and can be unit-tested today.
 *
 * To turn this on later:
 *   1. Add a `subscribers` table (see docs/future-supabase-plan.md).
 *   2. Add a provider (Resend, Postmark, SendGrid) and its key as an env var.
 *   3. Add a scheduled route that calls reflectionForDate(), then
 *      buildReflectionEmail(), then the provider's send().
 *
 * Step 3 is roughly twenty lines, because steps 1 and 2 are the only unknowns.
 */

export type SubscriptionStatus = "pending" | "confirmed" | "unsubscribed";

export interface Subscriber {
  id: string;
  email: string;
  /** Double opt-in: nothing is sent until the address is confirmed. */
  status: SubscriptionStatus;
  confirmedAt: string | null;
  /** Every message must carry a working one-click unsubscribe. */
  unsubscribeToken: string;
}

export interface ReflectionEmail {
  subject: string;
  /** Preview text shown in the inbox list, before the body is opened. */
  preheader: string;
  text: string;
  html: string;
}

/**
 * Compose the daily reflection email.
 *
 * The reflection is the whole message. No newsletter chrome, no marketing, no
 * "5 things we loved this week" — the Brand Guide is explicit that the quote is
 * the hero, and that holds in an inbox as much as on a page.
 */
export function buildReflectionEmail(
  reflection: Reflection,
  unsubscribeUrl: string,
): ReflectionEmail {
  const url = `${SITE.url}/reflections/${reflection.id}`;

  const text = [
    reflection.title.toUpperCase(),
    "",
    reflection.text,
    "",
    `— ${reflection.author}, ${reflection.book}`,
    "",
    `Read it online: ${url}`,
    "",
    `${SITE.name} — ${SITE.slogan}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#FAF6EC;color:#1C1A16;font-family:Georgia,serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;">
      <tr><td>
        <p style="margin:0 0 24px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8B8477;">
          ${escapeHtml(reflection.title)}
        </p>
        <p style="margin:0 0 24px;font-size:24px;line-height:1.45;color:#0E2C1F;">
          ${escapeHtml(reflection.text)}
        </p>
        <p style="margin:0 0 32px;font-size:14px;font-style:italic;color:#5A554B;">
          ${escapeHtml(reflection.author)}, ${escapeHtml(reflection.book)}
        </p>
        <p style="margin:0 0 32px;font-size:14px;">
          <a href="${url}" style="color:#B3873A;">Read it online</a>
        </p>
        <hr style="border:none;border-top:1px solid #EBD9B2;margin:0 0 16px;" />
        <p style="margin:0;font-size:12px;color:#8B8477;">
          ${escapeHtml(SITE.name)} — ${escapeHtml(SITE.slogan)}<br />
          <a href="${unsubscribeUrl}" style="color:#8B8477;">Unsubscribe</a>
        </p>
      </td></tr>
    </table>
  </body>
</html>`;

  return {
    subject: reflection.title,
    preheader: reflection.text,
    text,
    html,
  };
}

/** Reflection text is authored content, not markup. Escape it. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
