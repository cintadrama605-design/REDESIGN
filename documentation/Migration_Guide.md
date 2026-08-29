# Migration Guide — Static Preview → Squarespace 7.1

This site is built to be a **disposable front end over a portable content
model** — the goal is that migrating it into Squarespace is mostly
configuration (Style Panel, native blocks, Collections), with a small,
clearly-marked amount of Custom CSS / Code Injection for the handful of
effects Squarespace's panel doesn't expose. This doc is the step-by-step for
doing that migration. Read it alongside `Squarespace_Block_Map.md` (the
short reference table) — this is the long-form walkthrough.

Squarespace template versions do shift specifics over time (exact Fluid
Engine breakpoint, which block is called what this month). Where a number or
name below matters, verify it against your live site's editor before relying
on it — this guide gives you the mapping and the reasoning, not a blind
copy-paste.

---

## 0. What NOT to migrate literally

Do not copy `index.html`'s markup into a Code Block and call it done. Two
things here exist only because this is a static preview, not because they
belong in Squarespace:

1. **`<header class="nav">` and `<footer class="footer">`** — these are
   stand-ins for Squarespace's *global* Header and Footer Sections (Design
   → Header / Footer), which are edited once and apply site-wide. Rebuild
   them natively; don't paste this markup in.
2. **`js/app.js`'s mobile nav toggle** — Squarespace's native header is
   already responsive with its own mobile menu. This code has nothing to
   attach to once the header is native — delete it at migration, don't port it.
3. **`fonts/` + `css/fonts.css`** — self-hosted so this preview works fully
   offline (see README.md). In Squarespace, use Site Styles' own Google
   Fonts picker instead (§1 below) — don't upload these files or paste the
   `@font-face` rules into Custom CSS.

Everything else — the six content sections between header and footer — is
what actually needs migrating, section by section, below.

---

## 1. Site Styles (Design → Site Styles)

Set these once, site-wide, before building any page — every block you add
afterward inherits them, which is most of why this migration is fast.

**Colors** (from `css/theme.css` `:root`):

| Token | Hex | Use in Squarespace |
|---|---|---|
| `--black` | `#050505` | Site background |
| `--black-2` | `#0c0c0b` | Section/card background (alt sections) |
| `--green` | `#b7ff00` | Primary accent / button color |
| `--white` | `#f4f1e8` | Primary text |
| `--gray` | `#9a978d` | Secondary/muted text |
| `--line` | `#232320` | Borders/dividers |

**Fonts** (from `css/theme.css` `--font-display` / `--font-body`):

- Display / headlines: **Anton** — available in Squarespace's Google Fonts
  picker under Site Styles → Headings.
- Body / UI: **Inter** — also in the Google Fonts picker, under Paragraph/Button text.

Set heading text-transform to uppercase in the Site Styles panel where that
option exists (Squarespace exposes this per text style in most 7.1 templates).

**Buttons**: primary = solid `--green` fill / `--black` text; secondary =
outline, transparent fill, `--white` text, hover to `--green` border+text.
Set these once under Site Styles → Buttons rather than per-block.

---

## 2. Section-by-section block mapping

Each section in `index.html` carries an inline `<!-- SQSP: ... -->` comment
with this same mapping right above it — treat the table below as the index,
and the comments as the in-context reminder while you're actually building.

| Preview section | Squarespace block | Collection type | Source fields |
|---|---|---|---|
| Hero | Fluid Engine Section: Image + Text + Button blocks | — | static copy |
| Featured Release | Commerce Product Block | Products | `cms/products.json` |
| Comic Explorer | Summary Block (v2) | Blog *or* Portfolio (see note below) | `cms/products.json` / dedicated collection |
| Universe | Summary Block (v2) | Portfolio | `cms/characters.json` |
| Media | Summary Block (v2) or native Video Collection | Video | `cms/media.json` |
| Shop | Summary Block (v2) | Products | `cms/products.json` |
| News | Summary Block (v2) | Blog | `cms/news.json` |
| Newsletter | Newsletter Block (native Email Campaigns signup) | — | — |

**Note on Comic Explorer**: series (Impound, Blasted, HydroBeast, Cautious)
aren't quite Products (not directly for sale as a *series*) and aren't quite
people (Portfolio was designed for that, but works fine for any card grid
with an image + title + short text). Two reasonable options:
- Use a **Portfolio Collection** the same way Universe does — simplest,
  no extra collection type to learn.
- Use a **Blog Collection** if you want each series to have its own full
  page (issue list, longer synopsis) beyond the card — more setup, more
  payoff if the series pages need real content.

Either works with the current card layout; pick based on whether you want
clickable series detail pages at launch or can add them later.

**Summary Block (v2)** is the current general-purpose way to pull a grid of
items from any Collection onto a page — set its layout to Grid, 4 columns
desktop for Comic Explorer/Universe/Shop, 3 columns for Media/News, 1 column
mobile, matching `css/components.css` `.grid-4` / `.grid-3`. If your plan or
template doesn't have Summary Block v2 available, the equivalent
collection-specific blocks (Commerce Collection, Portfolio Collection, Blog
Collection — as named in the original block map) do the same job.

---

## 3. Content fields → Collection fields

`cms/*.json` is the field-level source of truth — each file's `fields` array
is exactly what to create as fields/properties on the matching Squarespace
Collection, and `items` are the same demo records rendered on the page
(pulled from `js/content-loader.js`'s `CONTENT` object), so what you see in
the preview is what you're populating:

- `cms/products.json` → Products collection (`title`, `price`, `description`,
  `category`, `image`) — used by both Featured Release and Shop.
- `cms/comics.json` → Portfolio (or Blog) collection (`title`, `genre`,
  `issues`, `tagline`, `price`, `image`, `preview_gallery`) — powers the
  Comic Explorer 3D shelf and its 5-page reader; see §5 for the bespoke
  interaction that reads `preview_gallery`.
- `cms/characters.json` → Portfolio collection (`name`, `role`, `bio`, `image`).
- `cms/media.json` → Video collection (`title`, `type`, `duration`, `video_url`, `thumbnail`).
- `cms/news.json` → Blog collection (`title`, `date`, `excerpt`, `content`, `image`).

All placeholder text in these files and in `content-loader.js` is
**invented tone-matching copy, not real brand content** — see README.md.
Replace it with real copy as part of populating the Collections, not before.

---

## 4. Images: the drop-in seam

Every content item has an `image` (or `thumbnail`) field, currently empty.
While empty, `js/content-loader.js`'s `artHtml()` renders the generated
duotone placeholder panel (the dark gradient + oversized letter). The moment
you set `image` to a real URL (plus `alt` text), that item renders a real
`<img>` instead — no CSS or JS changes required. That means:

1. You can validate real photography/cover art in this static preview
   before touching Squarespace at all, by just editing the JSON/JS data.
2. When you actually build the Squarespace Collections, each Collection
   item's native Image field is a straight 1:1 replacement for the same
   `image` field here — same content, different host.

Once every item has a real image, the `.art` placeholder styling
(`css/components.css`, the gradient + `::before` glyph) becomes dead code —
safe to delete, or keep as the empty/loading state for Collection items
missing an image.

---

## 5. What needs Custom CSS / Code Injection

Squarespace's Style Panel and native blocks cover the large majority of this
design (colors, fonts, buttons, section backgrounds, grid layout, mobile
nav, newsletter signup). Two tiers of things don't have a panel equivalent:
small polish that degrades gracefully without it, and one genuinely bespoke
feature that needs real Code Injection.

### 5a. Small polish (optional, degrades gracefully if skipped)

- **Hero background texture** (`.hero-bg`'s radial gradients + dot overlay)
  — recreate as Custom CSS targeting the hero section, or simplify to a
  real background image/video via the native Image/Video block instead.
- **Nav underline hover animation** (`.nav-links a::after`) — drop it if
  you'd rather rely on Squarespace's default header hover state.
- **Play-button overlay on Media cards** (`.art-media::after`) — likely
  unnecessary once real Video blocks are in, since they show their own.

### 5b. Scroll-snap sections + side dot-nav (`css/interactions.css` §1-2, `js/app.js`)

Full-viewport sections with a settling scroll and a right-side progress
indicator (the Landon Norris–style "one section per view" feel this round
of changes was built for). This needs:

- **Custom CSS**: the `scroll-snap-type`/`scroll-snap-align`/`min-height:
  100svh` rules from `css/interactions.css` §"Scroll snap", pasted into
  Design → Custom CSS as-is (they target plain `.hero`/`.section` classes,
  which won't exist verbatim in Squarespace — see the fallback note below).
- **Code Injection**: the dot-nav markup (`#dot-nav` in `index.html`) and
  its active-section highlighting (`js/app.js`, the `dot-nav` block) added
  to Site-Wide Code Injection footer, with `href`s pointed at each
  Section's actual anchor ID in your built page.
- **Fallback if that's too much custom code for your plan**: skip scroll-snap
  entirely and let the page scroll normally — nothing else in the design
  depends on it. Squarespace Sections already support per-section background
  colors, so the visual "distinct slide" look mostly survives without the
  snap behavior.

### 5c. Hover micro-interactions (`css/interactions.css`, `js/app.js`)

Magnetic buttons (`.magnetic`), card tilt-on-hover, and the additive cursor
ring (`#cursor-ring`) are all plain JS mousemove handlers plus CSS — copy
the relevant blocks from `js/app.js` (magnetic/tilt/cursor sections, clearly
commented) into Code Injection. All three are wrapped in
`(hover: hover) and (pointer: fine)` checks and a `prefers-reduced-motion`
check, so they no-op safely on touch devices — nothing to adjust there.
Card hover lift/border-glow itself (no tilt) is closer to native — Summary
Block v2 has its own built-in hover options that may already cover it
without custom code.

### 5d. The 3D book shelf + click-to-open reader (`css/interactions.css`, `js/book-reader.js`)

This is the one feature with **no native Squarespace equivalent at all** —
a 3D book shelf (`.shelf`/`.book`) that FLIP-morphs into a full-screen
reader on click, auto-opens its cover, and flips through 5 preview pages
plus a closing CTA. To keep it in Squarespace:

1. Add `css/interactions.css`'s shelf/book/`.book-reader` rules and
   `js/book-reader.js` verbatim via Code Injection (Settings → Advanced →
   Code Injection, or a page-level Code Block if you only want it on one
   page).
2. Replace `window.IMPOUND_CONTENT.comics` (currently populated by
   `js/content-loader.js` from static JS data) with a fetch against your
   Comics Collection's API, or hand-write the same shape from Collection
   data via a Code Block — the reader itself only needs an array of
   `{ title, tagline, price, glyph, image, alt, artA, artB, pages: [{glyph,
   caption, artA, artB}, ...] }` objects; `pages` is `preview_gallery`
   from `cms/comics.json`.
3. Confirm your Squarespace plan/tier allows the JS this needs (Code
   Injection availability varies by plan).

**Fallback**: if that's more custom code than you want to maintain in
Squarespace, drop straight back to a plain Summary Block grid for Comic
Explorer (same as Universe/Shop) — the shelf/reader is additive polish on
top of that, not a structural requirement. `data-comic-index` and the
`.book`/`.card` markup difference is the only thing that would need
reverting in that case.

---

## 6. Suggested order of operations

1. Set Site Styles (colors, fonts, buttons) — section 1 above.
2. Build the global Header and Footer — section 0 above.
3. Create the four Collections (Products, Portfolio, Video, Blog) and their
   fields — section 3 above.
4. Populate each Collection with real content (start from `cms/*.json` +
   `content-loader.js`'s placeholder copy as a structural guide, replace
   with real copy as you go).
5. Build each page section using the matching block from the table in
   section 2, pointed at the Collection you just populated.
6. Add real images per section 4, confirming against this static preview.
7. Layer in the Custom CSS / Code Injection items from section 5 you
   actually want to keep, last — everything else should already look right
   without them.
8. QA at the Fluid Engine mobile breakpoint against `mobile-full.png` /
   this preview's mobile layout (390px viewport tested here).
