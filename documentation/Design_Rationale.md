
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

## Interaction layer pass (scroll-snap, hover, 3D book reader)

Added a full-viewport scroll-snap layout with a side dot-nav, hover
micro-interactions (magnetic buttons, card tilt, an additive cursor ring),
and rebuilt Comic Explorer as a 3D book shelf with a click-to-open reader
(FLIP-morph, auto-opening cover, 5-page flip-through + closing CTA). Built
from an explicit feature spec plus general knowledge of that style of site,
since the requested reference (landonorris.com) wasn't reachable from the
build environment's network policy — see README.md. This is the one pass
that trades some Squarespace migration simplicity for the requested
interactions; `documentation/Migration_Guide.md` §5 tiers exactly what's
optional polish vs. genuinely bespoke (the book reader and the fan
gallery below), each with a plain-block fallback.

## Real content pass

Rewrote the site's content from a screen recording of the actual
impoundcomics.com homepage (Aug 2026), replacing invented placeholder
copy with real titles, character names, creator credits, and pricing
wherever they were confirmed on screen. Also added three sections the
real site has that this redesign didn't yet: **Trading Card Game**
("Impound Chaos"), **Officer Grey** (a found-footage horror movie —
a distinct sub-brand, styled apart from the comics on purpose), and
**Merch** as its own light section. Added a **Socials** fan-card gallery
(styled after the Landon Norris reference from the same conversation) as
the light-section "contrast break" requested alongside Merch.

What's real vs. still placeholder is documented per-field in each
`cms/*.json` file's `note`, and summarized in README.md — short version:
titles/names/pricing/credits are real, descriptions/bios/dates/runtimes
are illustrative pending real copy that wasn't visible in the recording.
