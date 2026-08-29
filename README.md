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

## Preview locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

(Opening `index.html` directly by double-click also works — content is
embedded in `js/content-loader.js`, no fetch/CORS dependency.)

## Structure

```
index.html              Page markup — Hero, Featured Release, Comic Explorer,
                         Universe, Media, Shop, News, Newsletter, Footer
css/theme.css            Design tokens (color, type, spacing) + base styles
css/components.css       Nav, hero, cards, grids, buttons, footer, newsletter
css/interactions.css     Scroll-snap, side dot-nav, magnetic/tilt/cursor hover
                         effects, 3D book shelf + reader overlay (bespoke — see
                         documentation/Migration_Guide.md §5)
css/responsive.css       Breakpoints (mobile nav, grid collapse)
js/content-loader.js     Demo content + render functions for each section's grid
js/book-reader.js        3D book shelf click-to-open reader (FLIP morph, page flips)
js/app.js                Mobile nav toggle, scroll-reveal, dot-nav sync, magnetic
                         buttons, card tilt, cursor ring, newsletter stub, footer year
cms/*.json                Field schemas + sample records per collection, mapped
                         to the Squarespace blocks in documentation/Squarespace_Block_Map.md
documentation/            Design rationale + Squarespace block mapping + migration guide
```

## Content is placeholder

Copy, character bios, pricing, and art are placeholder — written to match the
tone implied by the original brand names (Impound, Blasted, HydroBeast,
Cautious) but not sourced from real canon or real product data. Visual art
uses generated duotone panels (`.art` in components.css) instead of images,
since no real assets were available at build time — every content item has
an `image`/`alt` field (currently empty) that renders a real `<img>` the
moment it's filled in, no code changes needed. See
`documentation/Migration_Guide.md` §4 for how that seam works.

**Before shipping:** swap in real cover art / photography, real character
bios and credits, real pricing and product URLs, and real blog posts. The
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
- **Hover:** magnetic buttons on primary CTAs, 3D tilt-on-hover for cards,
  and an additive cursor ring that never hides the native cursor — all
  scoped to `(hover: hover) and (pointer: fine)`, so touch devices get the
  plain, fully-functional fallback with nothing missing.
- **Comic Explorer:** a 3D book shelf — click a cover and it FLIP-morphs
  into a full-screen reader, the cover swings open, and you flip through 5
  preview pages plus a closing CTA. Keyboard accessible (arrow keys, Tab
  trap, Escape to close), and degrades to instant open/close under
  `prefers-reduced-motion`.
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
