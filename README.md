# Impound Comics — Redesign

A full front-end build-out of the "V12" Squarespace redesign concept: a dark,
neon-accented site for the Impound Comics universe, built as a static
preview that's meant to be migrated into Squarespace 7.1, not run as-is
long-term.

The interaction layer (full-viewport scroll-snap sections, side dot-nav,
magnetic/tilt hover effects, and the 3D book shelf reader) was built from
general knowledge of that genre of site plus an explicit feature spec, not
a live reference — the reference URL supplied wasn't reachable from this
environment's network policy. Worth a look-over against the actual
reference site before calling it final.

**Migrating this into Squarespace?** Start with
[`documentation/Migration_Guide.md`](documentation/Migration_Guide.md) — full
section-by-section block mapping, Site Styles values, Collection field
mapping, and what (if anything) needs Custom CSS. `documentation/Squarespace_Block_Map.md`
is the short reference table version.

## Preview locally (fully offline)

The site has zero external network dependencies — fonts are self-hosted in
`fonts/` (see `css/fonts.css`), all content is embedded in
`js/content-loader.js`, and there's no CDN JS or analytics. Turn off your
network entirely and it still renders pixel-identical.

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

(Opening `index.html` directly by double-click also works — no server
required, since there's no fetch/CORS dependency either.)

## Structure

```
index.html              Page markup — Hero, Featured Release, Comic Explorer,
                         Universe, Media, Card Game, Shop, Officer Grey, Merch,
                         Socials, News, Newsletter, Footer
fonts/                   Self-hosted Anton + Inter (woff2, Latin subset) —
                         see css/fonts.css. Makes the preview work fully offline.
css/fonts.css            @font-face declarations for the fonts above
css/theme.css            Design tokens (color, type, spacing) + base styles
css/components.css       Nav, hero, cards, grids, buttons, footer, newsletter,
                         Card Game / Officer Grey / Merch section layouts,
                         light-section variant
css/interactions.css     Scroll-snap, side dot-nav, magnetic/tilt/cursor hover
                         effects, 3D book shelf + reader overlay, TCG box + card
                         fan, bundle book-stack, Socials fan gallery (all bespoke
                         — see documentation/Migration_Guide.md §5)
css/responsive.css       Breakpoints (mobile nav, grid collapse)
js/content-loader.js     Content data + render functions for every section
js/book-reader.js        3D book shelf click-to-open reader (FLIP morph, page flips)
js/tcg.js                Trading-card box open/close toggle (5-card fan preview)
js/app.js                Mobile nav toggle, scroll-reveal, dot-nav sync, magnetic
                         buttons, cursor-tracked tilt, cursor ring, newsletter
                         stub, footer year
cms/*.json                Field schemas + sample records per collection, mapped
                         to the Squarespace blocks in documentation/Squarespace_Block_Map.md
documentation/            Design rationale + Squarespace block mapping + migration guide
```

## Content: what's real vs. placeholder

Rewritten from a screen recording of the actual impoundcomics.com homepage
(Aug 2026) — the recording wasn't a live browse (this environment's network
policy blocked the domain directly), so "real" below means "confirmed
visible on screen in that recording," not pulled from a live API.

**Real** — titles, character/creator names, and pricing, wherever they were
visible on screen:
- Comic titles: Impound, Blasted, Cautious, HydroBeast, Seraph, Ulao, Evoltir
- Creator credits: Brent Trayce Sands (writer), Daniel Alexandre (line art),
  Gabriel Macedo (colors), Denys Cowan (cover art, Impound #6), Valeria
  Cryttal Zavalisco (HydroBeast co-writer)
- Pricing: all dollar amounts in `cms/products.json` / the Shop section
- Cautious's tagline: "A Soldier Aligned At The Flag"
- Trading Card Game: "Impound Chaos", 52 cards/pack, 1st Edition TCG Series,
  Random Card Flip (Champion → Ability → Power)
- Officer Grey: a found-footage horror movie from the Impound team,
  releasing October 25th — a distinct sub-brand from the comics
- Merch line: tee, long sleeve, cap, beanie (no per-item price was shown)
- Social platforms: TikTok, Instagram, YouTube, Discord, X, Twitch, Facebook
- Crossover: "Impound Vs. Flame" (Impound Comics × The MelaninVerse)

**Still placeholder** — written to match the confirmed tone, not sourced
from real copy: series taglines other than Cautious's, all 5-page book
previews, character bios, video runtimes and news publish dates, and every
`image`/`alt` field (all empty — see the image seam below). Each
`cms/*.json` file's `note` field says exactly which of its fields are real
vs. placeholder.

Visual art uses generated duotone panels (`.art` in components.css) instead
of images, since no real assets were available at build time — every
content item has an `image`/`alt` field (currently empty) that renders a
real `<img>` the moment it's filled in, no code changes needed. See
`documentation/Migration_Guide.md` §4 for how that seam works.

**Before shipping:** swap in real cover art / photography / video embeds,
real character bios, real solicitation copy, and real news dates. The
`cms/*.json` files document the field shape each section expects — update
those alongside the actual Squarespace collections during migration.

## Design system

- **Palette:** near-black (`#050505`) background, neon green (`#b7ff00`)
  accent, warm off-white (`#f4f1e8`) text — kept from the original V12 concept.
- **Type:** Anton (display/headlines) + Inter (body/UI), loaded from Google Fonts.
- **Motion:** full-viewport scroll-snap sections with a side dot-nav, plus
  IntersectionObserver-based scroll reveal on cards — all respect
  `prefers-reduced-motion` (scroll-snap and animations disable outright;
  content still renders, just without the motion).
- **Hover:** magnetic buttons on primary CTAs, cursor-tracked 3D tilt on
  cards (including bundle cards, as one group), merch shapes, the featured-
  release art, and the trading-card box, and an additive cursor ring that
  never hides the native cursor — all scoped to `(hover: hover) and
  (pointer: fine)`, so touch devices get the plain, fully-functional
  fallback with nothing missing.
- **Comic Explorer:** a 3D book shelf (steep shelf lean + live cursor
  tilt on hover) — click a cover and it FLIP-morphs into a full-screen
  reader at 2x the original size, positioned toward the right with a
  static 3D tilt, the cover swings open, and you flip through 5 preview
  pages plus a closing CTA. Keyboard accessible (arrow keys, Tab trap,
  Escape to close), degrades to instant open/close under
  `prefers-reduced-motion`.
- **Trading Card Game:** a real 3D box (side panel + cursor tilt) — click
  it (or "Preview 5 Cards") and 5 sample cards deal out on top of the box
  into a fanned hand, each independently hoverable.
- **Bundle products (Shop):** render as a stack of mini covers instead of
  a single image, echoing the real site's fanned-covers bundle banners —
  hovers as one group with the rest of the card, not per-cover.
- **Merch:** individual CSS silhouette shapes (tee/long-sleeve/cap/beanie)
  with an idle float plus cursor tilt — no card frame, no plain squares.
- **Socials:** a plain row of pill links with a color-sweep hover fill —
  no card imagery — in a light cream section, the one deliberate light
  break in an otherwise dark page.
- **Officer Grey:** a red/black promo section for the found-footage horror
  movie sub-brand, styled apart from the rest of the site on purpose.
- **Accessibility:** skip link, visible focus states, `aria-live` newsletter
  status, `aria-expanded` mobile nav toggle, semantic landmarks, `inert`
  background while the book reader is open.

## Squarespace migration

See `documentation/Squarespace_Block_Map.md` for how each section maps to a
Squarespace 7.1 block type, and `documentation/Design_Rationale.md` for the
overall approach. The short version: everything under `cms/` corresponds to
a Squarespace Collection (Commerce, Portfolio, Blog, Video) — once ported,
the equivalent static sections in `index.html`/`content-loader.js` get
replaced by native Squarespace blocks bound to those collections.
