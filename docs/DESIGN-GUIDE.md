# Design guide

The look comes from one file: `assets/css/styles.css`. Everything adjustable is in the
`:root` block at the very top — change a value there and it updates everywhere.

---

## Palette

Taken from the grid plan, unchanged.

| Token | Hex | Used for |
|---|---|---|
| `--maroon` | `#5C1A15` | Primary buttons, links, Chinese characters in headers, logo |
| `--maroon-soft` | `#7C2C1E` | Button hover |
| `--maroon-deep` | `#3D0F0B` | Reserved for deep accents |
| `--tan` | `#C9A876` | Secondary buttons, eyebrow labels, focus rings |
| `--tan-light` | `#E7D0A3` | Footer links |
| `--tan-deep` | `#D9B877` | Small uppercase labels, Chinese accents on cards |
| `--cream` | `#F3E3C0` | Chips, hover fills, formula boxes |
| `--cream-light` | `#FBF3E1` | Callouts, hero gradient |
| `--paper` | `#F7F2E9` | Page background |
| `--paper-2` | `#EFEAE1` | Alternating section background |
| `--dark` | `#2B0A08` | Footer background |
| `--ink` | `#1B1310` | Body text |
| `--stone` / `--stone-deep` | `#8A8378` / `#6E665C` | Muted text, captions |

Two colours exist only for feedback and are never used decoratively:

| | Hex | |
|---|---|---|
| Correct | `#2F6B4F` on `#E4F0E8` | green |
| Wrong | `#A3302A` on `#F7E4E2` | red — deliberately different from the maroon brand |

**Rule:** if you need a new colour, first try an existing token. A fifth accent makes
the site look accidental.

---

## Type

- **Poppins** for everything Latin — 300/400/500/600 only. No 700; the maroon is heavy
  enough that bold looks shouty.
- **Noto Sans SC** for Chinese, applied by the `.zh` class and `--font-zh`.
  Never set Chinese in Poppins — it falls back to a random system font and the
  characters change shape between devices.
- Body text 16px / 1.65. Chinese runs larger than its Latin neighbours (vocabulary
  headword 2rem, dialogue 1.25rem) because characters need the extra size to stay legible.
- Pinyin is always maroon and always smaller than the characters. That single rule is
  what lets students' eyes skip it when they want to self-test.

---

## Spacing and shape

- Corner radii: `8px` small (inputs, options), `14px` cards, `22px` big panels,
  pill for buttons and chips.
- Section padding scales with the viewport: `clamp(2.5rem, 6vw, 4.5rem)`.
- Content width caps at `1140px`, with a 16px gutter on phones.
- Shadows are barely there. Cards separate by border first, shadow only on hover.

---

## Components and when to use them

| Class | What it is | Use for |
|---|---|---|
| `.card` | White box, thin border | Anything in a grid: courses, units, lessons |
| `.chip` | Small pill label | Status: level badge, "done", "coming soon" |
| `.callout` | Cream box with a tan left bar | Lesson objectives, quiz intro — one per section, maximum |
| `.formula` | Dashed cream box, Chinese font | Grammar patterns only |
| `.placeholder` | Striped dashed box | Automatic when a lesson section is empty. Never write it by hand |
| `.bar` | Thin progress bar | Course and lesson completion |
| `.iconbtn` | Round 34px button | Audio play only |
| `.btn` / `.btn--ghost` / `.btn--tan` | Primary / secondary / accent | One primary button per screen area |

---

## Interaction rules

- **Feedback is immediate and stays visible.** When an answer is checked, the option
  turns green or red *and* a sentence appears underneath. Colour alone is not enough —
  some students cannot distinguish it.
- **Wrong answers always reveal the right one.** No hunting.
- **Nothing autoplays.** Audio only plays when a button is pressed.
- Focus rings are tan and 3px. Do not remove them; the site is used on laptops with
  keyboards as well as phones.
- Tap targets are at least 34px. Anything smaller fails on a phone.

---

## Adding a new page

If you ever add a page beyond the four that exist:

1. Copy `courses.html` as the starting point — it already loads the scripts in the
   right order.
2. Keep the `<header id="site-header">` / `<main id="main">` / `<footer id="site-footer">`
   skeleton. `UI.chrome()` fills the header and footer for you.
3. Put any new label into **both** languages in `assets/js/i18n.js`. A missing
   Indonesian label silently falls back to English, which looks like a bug.

---

## What to keep out

- No second font family.
- No colour outside the tokens above.
- No large decorative imagery on lesson pages — the Chinese characters *are* the
  visual. Photos compete with them.
- No animation longer than 200ms, except the progress bar.
