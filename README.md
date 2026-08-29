# Impound Comics — Redesign

A full front-end build-out of the "V12" Squarespace redesign concept: a dark,
neon-accented site for the Impound Comics universe, structured to convert
cleanly into Squarespace 7.1 later.

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
css/responsive.css       Breakpoints (mobile nav, grid collapse)
js/content-loader.js     Demo content + render functions for each section's grid
js/app.js                Mobile nav toggle, scroll-reveal, newsletter stub, footer year
cms/*.json                Field schemas + sample records per collection, mapped
                         to the Squarespace blocks in documentation/Squarespace_Block_Map.md
documentation/            Design rationale + Squarespace block mapping
```

## Content is placeholder

Copy, character bios, pricing, and art are placeholder — written to match the
tone implied by the original brand names (Impound, Blasted, HydroBeast,
Cautious) but not sourced from real canon or real product data. Visual art
uses generated duotone panels (`.art` in components.css) instead of images,
since no real assets were available at build time.

**Before shipping:** swap in real cover art / photography, real character
bios and credits, real pricing and product URLs, and real blog posts. The
`cms/*.json` files document the field shape each section expects — update
those alongside the actual Squarespace collections during migration.

## Design system

- **Palette:** near-black (`#050505`) background, neon green (`#b7ff00`)
  accent, warm off-white (`#f4f1e8`) text — kept from the original V12 concept.
- **Type:** Anton (display/headlines) + Inter (body/UI), loaded from Google Fonts.
- **Motion:** IntersectionObserver-based scroll reveal on cards, respects
  `prefers-reduced-motion`.
- **Accessibility:** skip link, visible focus states, `aria-live` newsletter
  status, `aria-expanded` mobile nav toggle, semantic landmarks.

## Squarespace migration

See `documentation/Squarespace_Block_Map.md` for how each section maps to a
Squarespace 7.1 block type, and `documentation/Design_Rationale.md` for the
overall approach. The short version: everything under `cms/` corresponds to
a Squarespace Collection (Commerce, Portfolio, Blog, Video) — once ported,
the equivalent static sections in `index.html`/`content-loader.js` get
replaced by native Squarespace blocks bound to those collections.
