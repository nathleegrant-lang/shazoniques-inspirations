# Investigation — `max-w-room` resolving to 176px

## The concern

`maxWidth.room` (78rem) and `spacing.room` (clamp(6rem,14vh,11rem)) shared the name `room`.
The worry: ambiguity, or compressed layouts on Books and elsewhere.

## Findings — the five questions

**1. Does Tailwind generate `max-w-room` as 78rem?**
No. The compiled CSS was:

```
.max-w-room{max-width:clamp(6rem,14vh,11rem)}
```

It resolved to the **spacing** value, not 78rem.

**2. Is `max-w-room` resolving correctly in production?**
No. Every `max-w-room` container was capped at a maximum of **11rem — about 176px** — instead of
78rem. `.room-inner` (which applies `max-w-room`) was hit too.

**3. Is `spacing.room` influencing `max-w-room`?**
Yes — it was the *sole* cause. In Tailwind v4, both the `maxWidth` and `spacing` scales feed the
`max-w-*` utilities. With a legacy JS config bridged through `@config`, the two `room` keys
collided and the spacing value won the generated utility.

**4. Is this the cause of the compressed Books layout?**
**Yes.** `app/books/page.tsx` wraps its shelves in `max-w-room`; so do `books/[slug]`, `authors`,
the header, and the footer. All were being squeezed to ~176px-max containers. This was the root
cause, not a symptom of anything else.

**5. If not, the real cause?**
Not applicable — the naming collision *was* the cause, confirmed directly in compiled CSS.

## Root cause

A single Tailwind namespace collision. `maxWidth.room` and `spacing.room` both produced
`max-w-room`; Tailwind emitted one rule, and the spacing token's `clamp(6rem,14vh,11rem)` won.
Every site-width container silently collapsed to 176px.

## The fix

Two changes, both technically justified by the compiled output:

1. **`maxWidth.room` → `maxWidth.site`** (78rem), and every `max-w-room` usage → `max-w-site`
   across `app/` and `components/` (7 references). This is the rename specified in the task.

2. **`spacing.room` → `spacing.room-y`**, with its two `theme(spacing.room)` calls in
   `globals.css` updated. Without this, the `room` spacing key kept regenerating a phantom, unused
   `.max-w-room{max-width:clamp(...)}` — the exact 176px trap the task set out to remove. It is
   consumed only via `theme()`, never as a utility, so the rename is closed and safe.

## Verification (compiled CSS)

| Selector | Before | After |
| --- | --- | --- |
| `.max-w-site` | did not exist | `max-width:78rem` |
| `.room-inner` | `max-width:clamp(6rem,14vh,11rem)` | `max-width:78rem` |
| `.max-w-room` | `max-width:clamp(6rem,14vh,11rem)` | **removed** |
| `.room` padding | `clamp(6rem,14vh,11rem)` | unchanged (correct) |

- Build: 147 pages, compiles successfully.
- Lint 0/0, typecheck 0 errors, audit 0 vulnerabilities.
- Books, Authors, Book Detail, Homepage: all containers now `max-w-site` (78rem); zero orphaned
  `max-w-room` references in any rendered page.
- Responsive `.room` horizontal padding (6 → 10 at `sm`) intact.
