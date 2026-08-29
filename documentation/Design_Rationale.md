
# Design Rationale

This package separates:

Design System
+
Squarespace CMS Structure

The preview is built to be converted into Squarespace 7.1.

Next production step:
replace demo data with actual site asset URLs and CMS fields.

## V12 build-out (full front-end pass)

The original V12 drop was a wireframe skeleton — single-word placeholder
cards and minimal styling, enough to prove the section structure and block
mapping. This pass develops it into a real, presentable site while keeping
that same structure intact, so the Squarespace conversion path above still
holds:

- **Design system**: full color/type/spacing token set in `css/theme.css`
  (kept the black / neon-green / off-white palette from the original),
  Anton + Inter type pairing, consistent card/button/badge components in
  `css/components.css`.
- **Content depth**: each section (Featured Release, Comic Explorer,
  Universe, Media, Shop, News) now has real placeholder copy instead of
  single-word labels, sourced from the brand names already present
  (Impound, Blasted, HydroBeast, Cautious) — see README.md for the caveat
  that this is placeholder, not real canon/product data.
  `cms/*.json` files hold the field schema per collection (unchanged
  intent) plus sample records that mirror what's rendered on the page, so
  they stay useful as a migration reference.
- **Visual art without real assets**: since no cover art or photography was
  available, cards use a generated duotone "art" panel (`.art` class) with a
  faint oversized glyph instead of broken `<img>` tags. Swap these for real
  images by adding `<img>` markup inside `.art` at migration time.
  - **Responsiveness & polish**: mobile nav, grid collapse at 3 breakpoints,
  scroll-reveal on cards, hover/focus states, and basic accessibility
  (skip link, landmarks, `aria-live` newsletter status) added on top of the
  original skeleton.
