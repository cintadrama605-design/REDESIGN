
# Squarespace Block Mapping

Quick reference — see `Migration_Guide.md` for the full walkthrough
(field mapping, Site Styles, what needs Custom CSS, order of operations).

Hero:
Fluid Engine Section + Image + Text + Button

Featured Release:
Commerce Product Block (source: Products collection)

Comic Explorer:
Summary Block (v2) — source: Portfolio or Blog collection (see Migration_Guide.md §2)

Universe:
Summary Block (v2) — source: Portfolio collection

Media:
Summary Block (v2) or native Video Collection block

Trading Card Game:
No native block — Fluid Engine Section (Image + Text + Button), or a
Commerce Product Block if sold as a Product (see Migration_Guide.md §2)

Shop:
Summary Block (v2) — source: Products collection

Officer Grey (promo):
No native block — Fluid Engine Section with Custom CSS for the distinct
red/black treatment (separate sub-brand, styled apart on purpose)

Merch:
Summary Block (v2) — source: Products collection, filtered to a Merch
category; plain image grid, no per-item price shown (matches the real site)

Socials (fan gallery):
BESPOKE — no native block, Code Injection required (see Migration_Guide.md §5);
fallback is a plain Social Links Block in the native Footer

News:
Summary Block (v2) — source: Blog collection

Newsletter:
Newsletter Block (native Email Campaigns signup)

Header / Footer:
Global Header Section / Footer Section (not per-page — set once, site-wide)
