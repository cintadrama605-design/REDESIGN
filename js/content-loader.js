/**
 * Content loader — renders the CMS-shaped demo content below into the
 * DOM. This mirrors the collections documented in /cms/*.json and
 * /documentation/Squarespace_Block_Map.md, so swapping this object for
 * live Squarespace collection data is a drop-in replacement — see
 * documentation/Migration_Guide.md for the full migration walkthrough.
 *
 * CONTENT SOURCE: rewritten from a screen recording of the real
 * impoundcomics.com homepage (Aug 2026) — titles, character names,
 * pricing, credits, and product structure below are real. Anything NOT
 * visible in that recording (full solicitation copy, exact merch prices,
 * character bios, video runtimes/dates) is still placeholder text
 * written to match the confirmed tone — flagged inline below and in
 * README.md. Replace those with real copy before shipping.
 *
 * MIGRATION NOTE: every item below has an `image`/`alt` field. Leave it
 * empty ("") to keep the generated duotone placeholder — the moment you
 * fill in a real image URL and alt text, that item renders a real <img>
 * automatically (see artHtml()). No CSS/JS changes needed to swap in
 * real assets; this also means you can validate real photography here
 * before it goes into Squarespace's own Image blocks.
 */
(function(){

  function seriesPages(captions, a, b){
    return captions.map(function(cap, i){
      return { glyph: String(i + 1), caption: cap, artA: a, artB: b };
    });
  }

  var CONTENT = {

    // Real: Impound - Issue #6 (Exclusive Color Cover), from $12.00,
    // cover by Denys Cowan, line art Daniel Alexandre, colors Gabriel Macedo.
    featured: {
      title: "Impound — Issue #6",
      tagline: "Exclusive Color Cover",
      description: "The flagship title's sixth issue, in an exclusive color-cover edition. Brent Trayce Sands' Impound Universe keeps closing in.",
      credits: "Writer: Brent Trayce Sands · Cover: Denys Cowan · Line Art: Daniel Alexandre · Colors: Gabriel Macedo",
      price: "from $12.00",
      badge: "Exclusive Cover",
      glyph: "06",
      image: "", alt: "Impound Issue #6 exclusive color cover",
      artA: "#26261f", artB: "#050505"
    },

    // Real titles/creators; series descriptions & 5-page previews below
    // are illustrative placeholder text pending real solicitation copy —
    // Cautious's tagline is the one confirmed verbatim from the site.
    comics: [
      {
        title: "Impound",
        genre: "Sci-Fi / Action",
        issues: "6+ Issues",
        tagline: "They tow what the law won't touch.",
        price: "from $12.00",
        glyph: "I", image: "", alt: "Impound series cover art",
        artA: "#242a12", artB: "#050505",
        pages: seriesPages([
          "The last legal tow yard in the district takes a job nobody else will.",
          "A stripped sedan turns out to still have someone in the trunk.",
          "The city council votes to auction the yard out from under them.",
          "Impound finds out who's actually been paying for the auction.",
          "First confrontation, on a truck doing sixty with no brakes."
        ], "#242a12", "#050505")
      },
      {
        title: "Blasted",
        genre: "Action / Revenge",
        issues: "3 Issues",
        tagline: "Every fight ends in ash.",
        price: "from $10.00",
        glyph: "B", image: "", alt: "Blasted series cover art",
        artA: "#2a1712", artB: "#050505",
        pages: seriesPages([
          "A demolition job leaves him chained, masked, and burning.",
          "The crew that did this to him wants their 'asset' back.",
          "A city block learns what happens when he loses his temper.",
          "An old contact shows up with a very specific kind of insurance.",
          "The countdown starts on something bigger than either of them."
        ], "#2a1712", "#050505")
      },
      {
        title: "Cautious",
        genre: "Military / Drama",
        issues: "1+ Issues",
        tagline: "A Soldier Aligned At The Flag.",
        price: "from $10.00",
        glyph: "C", image: "", alt: "Cautious series cover art",
        artA: "#1c1c22", artB: "#050505",
        pages: seriesPages([
          "A soldier comes home to a flag that doesn't recognize him anymore.",
          "The war he fought isn't the one people want to hear about.",
          "Every order he takes now, he takes on his own terms.",
          "The line between duty and defiance gets thinner every page.",
          "He picks a side — and it isn't the one he was issued."
        ], "#1c1c22", "#050505")
      },
      {
        title: "HydroBeast",
        genre: "Sci-Fi / Body-Horror",
        issues: "1+ Issues",
        tagline: "The tide always comes back.",
        price: "from $10.00",
        glyph: "H", image: "", alt: "HydroBeast series cover art",
        artA: "#0f2224", artB: "#050505",
        pages: seriesPages([
          "A harbor accident leaves his hand more ice than skin.",
          "Every night the cold spreads a little further.",
          "The hood stays up because what's under it keeps changing.",
          "Someone's tracking what he's turning into — and why.",
          "Low tide reveals exactly how long it's been building."
        ], "#0f2224", "#050505")
      },
      {
        title: "Seraph",
        genre: "Action",
        issues: "1+ Issues (Trilogy)",
        tagline: "Judgment doesn't ask twice.",
        price: "from $10.00",
        glyph: "S", image: "", alt: "Seraph series cover art",
        artA: "#2a0f14", artB: "#050505",
        pages: seriesPages([
          "A blade meant for one purpose finds a second one.",
          "The trilogy's opening cut leaves more questions than bodies.",
          "Every answer costs something Seraph isn't sure they can pay.",
          "An old order wants what's now strapped to their back.",
          "The first volume ends on the edge of the second."
        ], "#2a0f14", "#050505")
      },
      {
        title: "Ulao",
        genre: "Action",
        issues: "1+ Issues",
        tagline: "Every mission ends the same way it started: alone.",
        price: "from $10.00",
        glyph: "U", image: "", alt: "Ulao series cover art",
        artA: "#1a0f22", artB: "#050505",
        pages: seriesPages([
          "The mask goes on before the mission is even confirmed.",
          "A contract with no name attached turns out to have a face.",
          "Every job blurs the line between hired and hunted.",
          "The last clean exit was three jobs ago.",
          "This one doesn't end when the contract does."
        ], "#1a0f22", "#050505")
      },
      {
        title: "Evoltir",
        genre: "Sci-Fi",
        issues: "1+ Issues",
        tagline: "The destroyer and the alter-ego share one body.",
        price: "from $10.00",
        glyph: "E", image: "", alt: "Evoltir series cover art",
        artA: "#241a05", artB: "#050505",
        pages: seriesPages([
          "Two identities, one armor, and no way to separate them anymore.",
          "The destroyer wants out more with every issue.",
          "Whoever's underneath is running out of room to hide.",
          "An old enemy recognizes the walk before the face.",
          "The alter-ego makes a choice the destroyer won't forgive."
        ], "#241a05", "#050505")
      }
    ],

    // Real names/visual identity for the core four; bios are illustrative
    // placeholder pending the real "Our Universe" page content.
    characters: [
      {
        name: "Impound",
        role: "Dual Identity — Tech Hero",
        bio: "Armored and augmented, Impound shows up after everyone else has given up on a block — a human protagonist and a green-visored, tech-armored alter ego, one universe.",
        glyph: "I", image: "", alt: "Portrait of Impound",
        artA: "#242a12", artB: "#050505"
      },
      {
        name: "Blasted",
        role: "The Masked Detonator",
        bio: "Chained, masked, and running hot — Blasted turned whatever happened to him into the only language he has left: fire, blades, and a very short fuse.",
        glyph: "B", image: "", alt: "Portrait of Blasted",
        artA: "#2a1712", artB: "#050505"
      },
      {
        name: "Cautious",
        role: "A Soldier Aligned At The Flag",
        bio: "A soldier who came home to a country that doesn't recognize him anymore — every order taken on his own terms now.",
        glyph: "C", image: "", alt: "Portrait of Cautious",
        artA: "#1c1c22", artB: "#050505"
      },
      {
        name: "HydroBeast",
        role: "The Depth Walker",
        bio: "A harbor accident left more ice than skin behind — nobody's found where it comes from, everybody's found where it leaves people.",
        glyph: "H", image: "", alt: "Portrait of HydroBeast",
        artA: "#0f2224", artB: "#050505"
      }
    ],

    // Real video titles from the site's Media/Trending sections. No
    // confirmed runtimes/dates were visible on screen, so those are
    // left off rather than invented — swap in real embed IDs + runtimes
    // at migration (see cms/media.json).
    media: [
      {
        title: "Impound & Hope Breaker — Action Animation",
        type: "Animation",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Impound and Hope Breaker action animation thumbnail",
        artA: "#1c1c1a", artB: "#050505"
      },
      {
        title: "Impound — Short Stop Motion Animation",
        type: "Stop Motion",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Impound stop motion animation thumbnail",
        artA: "#20201c", artB: "#050505"
      },
      {
        title: "Blasted Series — Episode 1 (Paper Animation)",
        type: "Paper Animation",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Blasted series episode 1 thumbnail",
        artA: "#2a1712", artB: "#050505"
      },
      {
        title: "Blasted Series — Episode 2 (Paper Animation)",
        type: "Paper Animation",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Blasted series episode 2 thumbnail",
        artA: "#2a1712", artB: "#050505"
      },
      {
        title: "Our King — Chadwick Boseman Mini Documentary",
        type: "Documentary",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Our King Chadwick Boseman documentary thumbnail",
        artA: "#181816", artB: "#050505"
      },
      {
        title: "Officer Grey — Official Trailer",
        type: "Trailer",
        duration: "Watch on YouTube",
        glyph: "▶", image: "", alt: "Officer Grey official trailer thumbnail",
        artA: "#2a0505", artB: "#050505"
      }
    ],

    // Real bundles/issues with real confirmed pricing from the site.
    shop: [
      {
        title: "Impound Epic Bundle",
        category: "Bundle",
        price: "$120.00",
        glyph: "★", image: "", alt: "Impound Epic Bundle — 8 comics",
        artA: "#1c2a12", artB: "#050505",
        covers: [
          { glyph: "I", artA: "#242a12", artB: "#050505" },
          { glyph: "B", artA: "#2a1712", artB: "#050505" },
          { glyph: "C", artA: "#1c1c22", artB: "#050505" },
          { glyph: "H", artA: "#0f2224", artB: "#050505" }
        ]
      },
      {
        title: "Impound Digital Universe Bundle",
        category: "Bundle",
        price: "$40.00",
        glyph: "★", image: "", alt: "Impound Digital Universe Bundle",
        artA: "#1c2a12", artB: "#050505",
        covers: [
          { glyph: "S", artA: "#2a0f14", artB: "#050505" },
          { glyph: "U", artA: "#1a0f22", artB: "#050505" },
          { glyph: "E", artA: "#241a05", artB: "#050505" },
          { glyph: "I", artA: "#242a12", artB: "#050505" }
        ]
      },
      {
        title: "Impound Vs. Flame — Issue #1",
        category: "Crossover · 250+ Pages",
        price: "$50.00",
        glyph: "01", image: "", alt: "Impound Vs. Flame Issue 1 cover",
        artA: "#242a12", artB: "#050505"
      },
      {
        title: "Impound — Issue #6 (Exclusive Cover)",
        category: "Comic",
        price: "from $12.00",
        glyph: "06", image: "", alt: "Impound Issue 6 exclusive cover",
        artA: "#26261f", artB: "#050505"
      },
      {
        title: "Cautious — Issue #1",
        category: "Comic · 23 Pages",
        price: "from $10.00",
        glyph: "01", image: "", alt: "Cautious Issue 1 cover",
        artA: "#1c1c22", artB: "#050505"
      },
      {
        title: "HydroBeast — Issue #1",
        category: "Comic · 35 Pages",
        price: "from $10.00",
        glyph: "01", image: "", alt: "HydroBeast Issue 1 cover",
        artA: "#0f2224", artB: "#050505"
      }
    ],

    // Real posts pulled from the site's News carousel. Exact publish
    // dates weren't visible on screen, so left as status tags instead
    // of invented dates.
    news: [
      {
        title: "Our King Documentary Is Live Now",
        date: "Now Streaming",
        excerpt: "The Chadwick Boseman mini documentary from Impound Comics is live on YouTube.",
        glyph: "▶", image: "", alt: "Our King documentary — news thumbnail",
        artA: "#151512", artB: "#050505"
      },
      {
        title: "First Look: Officer Grey Horror Movie",
        date: "News",
        excerpt: "First images from the found-footage horror movie, releasing October 25th.",
        glyph: "OG", image: "", alt: "Officer Grey first look — news thumbnail",
        artA: "#2a0505", artB: "#050505"
      },
      {
        title: "Impound Issue #6 Exclusive Color Cover Now Available",
        date: "New Release",
        excerpt: "Denys Cowan's exclusive color cover for the flagship title's sixth issue is here.",
        glyph: "06", image: "", alt: "Impound Issue 6 cover reveal — news thumbnail",
        artA: "#26261f", artB: "#050505"
      }
    ],

    // Real: "Impound Chaos" Trading Card Game — 52 cards/pack, 1st
    // Edition TCG Series, Random Card Flip (Champion / Ability / Power).
    // The 5 sample cards below are illustrative placeholder pulls, not a
    // real print run — they exist to demonstrate the pack-open preview.
    cardGame: {
      title: "Impound Chaos",
      subtitle: "Trading Card Game",
      description: "52 cards per pack, 1 pack per box. Every pack is a random card flip: pull your Champion card first, then an Ability card, then a Power card, and build your run through the Impound Universe.",
      meta: "1st Edition TCG Series",
      glyph: "IC",
      image: "", alt: "Impound Chaos trading card game box art",
      artA: "#1c2a12", artB: "#050505",
      cards: [
        { type: "Champion", name: "Impound", glyph: "I", artA: "#242a12", artB: "#050505" },
        { type: "Ability", name: "Chain Burst", glyph: "B", artA: "#2a1712", artB: "#050505" },
        { type: "Power", name: "Ice Core", glyph: "H", artA: "#0f2224", artB: "#050505" },
        { type: "Champion", name: "Seraph", glyph: "S", artA: "#2a0f14", artB: "#050505" },
        { type: "Ability", name: "Flag Guard", glyph: "C", artA: "#1c1c22", artB: "#050505" }
      ]
    },

    // Real: "Officer Grey", a found-footage horror movie from the
    // Impound Comics team, releasing October 25th — a separate
    // sub-brand from the superhero comics, styled distinctly on purpose.
    officerGrey: {
      title: "Officer Grey",
      tagline: "Found Footage Horror",
      date: "October 25th",
      description: "A found-footage horror movie from the team behind Impound Comics. First-look images and the official trailer are live now.",
      cta: "Click To Notify",
      image: "", alt: "Officer Grey horror movie key art"
    },

    // Real: apparel line shown in the site's Merch section (tee, long
    // sleeve, cap, beanie), all carrying the green Impound wordmark — no
    // per-item pricing was shown on screen. Rendered as individual 3D
    // silhouette shapes (css/interactions.css .merch-shape-*), not cards.
    merch: [
      { name: "Impound Logo Tee", shape: "tee", artA: "#1c2a12", artB: "#050505" },
      { name: "Impound Logo Long Sleeve", shape: "long-sleeve", artA: "#151512", artB: "#050505" },
      { name: "Impound Logo Cap", shape: "cap", artA: "#1c2a12", artB: "#050505" },
      { name: "Impound Logo Beanie", shape: "beanie", artA: "#151512", artB: "#050505" }
    ],

    // Real: confirmed platforms from the site's header social icons.
    socials: [
      { platform: "TikTok", glyph: "TT", artA: "#1a1a1a", artB: "#050505" },
      { platform: "Instagram", glyph: "IG", artA: "#241222", artB: "#050505" },
      { platform: "YouTube", glyph: "YT", artA: "#240808", artB: "#050505" },
      { platform: "Discord", glyph: "DC", artA: "#12162a", artB: "#050505" },
      { platform: "X", glyph: "X", artA: "#141414", artB: "#050505" },
      { platform: "Twitch", glyph: "TW", artA: "#1c1030", artB: "#050505" },
      { platform: "Facebook", glyph: "FB", artA: "#0d1a2a", artB: "#050505" }
    ]
  };

  function artStyle(a, b){
    return 'style="--art-a:' + a + ';--art-b:' + b + '"';
  }

  /**
   * Renders an .art placeholder panel. If item.image is set, renders a
   * real <img> instead (and drops the generated glyph/gradient) — this
   * is the seam real Squarespace Image Block assets slot into.
   */
  function artHtml(item, extraClass){
    var classes = 'art' + (extraClass ? ' ' + extraClass : '');
    if(item.image){
      return '<div class="' + classes + ' art-has-image">' +
        '<img src="' + item.image + '" alt="' + (item.alt || '') + '" loading="lazy">' +
        '</div>';
    }
    return '<div class="' + classes + '" data-glyph="' + (item.glyph || '') + '" ' + artStyle(item.artA, item.artB) + '></div>';
  }

  function renderFeatured(){
    var f = CONTENT.featured;
    var el = document.getElementById('featured-card');
    if(!el) return;
    el.innerHTML =
      '<div class="featured reveal">' +
        artHtml(f, 'art-wide featured-art') +
        '<div class="featured-copy">' +
          '<div class="featured-meta"><span class="badge">' + f.badge + '</span></div>' +
          '<h3 style="font-size:clamp(1.8rem,4vw,2.6rem)">' + f.title + '</h3>' +
          '<p class="featured-desc">' + f.description + '</p>' +
          '<p class="featured-credits">' + f.credits + '</p>' +
          '<div class="featured-actions">' +
            '<span class="price featured-price">' + f.price + '</span>' +
            '<a href="#shop" class="btn btn-primary">Buy Now</a>' +
            '<a href="#" class="btn btn-ghost">Read Preview</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderGrid(id, items, builder){
    var el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = items.map(function(item, i){ return builder(item, i); }).join('');
  }

  /**
   * Renders the Comic Explorer as a 3D shelf of clickable book covers
   * instead of flat cards — js/book-reader.js reads data-comic-index
   * off each .book button to open the click-to-preview reader.
   */
  function bookMarkup(c, index){
    return (
      '<button type="button" class="book reveal" data-comic-index="' + index + '" aria-haspopup="dialog" aria-label="Preview ' + c.title + '">' +
        '<span class="book-cover-wrap">' +
          '<span class="book-spine" ' + artStyle(c.artA, c.artB) + '></span>' +
          artHtml(c, 'book-cover') +
        '</span>' +
        '<span class="book-info">' +
          '<strong>' + c.title + '</strong>' +
          '<span>' + c.issues + '</span>' +
        '</span>' +
      '</button>'
    );
  }

  function renderShelf(id, items){
    var el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = items.map(function(item, i){ return bookMarkup(item, i); }).join('');
  }

  function characterCard(c){
    return (
      '<article class="card reveal">' +
        artHtml(c, 'art-square') +
        '<div class="card-body">' +
          '<span class="tag">' + c.role + '</span>' +
          '<h3>' + c.name + '</h3>' +
          '<p class="card-desc">' + c.bio + '</p>' +
        '</div>' +
      '</article>'
    );
  }

  function mediaCard(m){
    return (
      '<article class="card reveal">' +
        artHtml(m, 'art-wide art-media') +
        '<div class="card-body">' +
          '<div class="card-meta"><span class="tag">' + m.type + '</span><span class="tag">' + m.duration + '</span></div>' +
          '<h3 style="font-size:1.15rem">' + m.title + '</h3>' +
        '</div>' +
      '</article>'
    );
  }

  /**
   * A loose stack of overlapping mini covers (bundle products) — each
   * cover pops forward independently on hover, echoing the real site's
   * fanned-covers bundle banners.
   */
  function stackCoverHtml(cover, i, total){
    var mid = (total - 1) / 2;
    var offset = i - mid;
    var rotate = offset * 7;
    var translateX = offset * 10;
    var translateY = Math.abs(offset) * 6;
    var z = 10 + (total - Math.abs(i - mid) * 2);
    return (
      '<span class="stack-cover" style="transform:translate(' + translateX + 'px,' + translateY + 'px) rotate(' + rotate + 'deg);z-index:' + Math.round(z) + '">' +
        artHtml(cover, 'stack-cover-art') +
      '</span>'
    );
  }

  function shopCard(p){
    var art = p.covers
      ? '<span class="book-stack">' + p.covers.map(function(c, i){ return stackCoverHtml(c, i, p.covers.length); }).join('') + '</span>'
      : artHtml(p, 'art-square');
    return (
      '<article class="card reveal">' +
        art +
        '<div class="card-body">' +
          '<span class="tag">' + p.category + '</span>' +
          '<h3 style="font-size:1.1rem">' + p.title + '</h3>' +
          '<div class="card-foot"><span class="price">' + p.price + '</span><a href="#" class="btn btn-small btn-ghost">Add To Cart</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  function newsCard(n){
    return (
      '<article class="card reveal">' +
        artHtml(n, 'art-wide') +
        '<div class="card-body">' +
          '<span class="tag">' + n.date + '</span>' +
          '<h3 style="font-size:1.15rem">' + n.title + '</h3>' +
          '<p class="card-desc">' + n.excerpt + '</p>' +
          '<div class="card-foot"><a href="#" class="text-link">Read More →</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  /**
   * One card in the "5 card preview" fan dealt out from the trading-card
   * box (js/tcg.js toggles .tcg-stage.is-open, which reads these --tx/
   * --ty/--rot custom properties to animate each card into place).
   */
  function tcgCardHtml(c, i, total){
    var mid = (total - 1) / 2;
    var offset = i - mid;
    var tx = offset * 92;
    var ty = Math.abs(offset) * 16;
    var rot = offset * 11;
    var delay = Math.abs(offset) * 70;
    return (
      '<div class="tcg-card" style="--tx:' + tx + 'px;--ty:' + ty + 'px;--rot:' + rot + 'deg;transition-delay:' + delay + 'ms">' +
        '<span class="tcg-card-art" data-glyph="' + c.glyph + '" style="--art-a:' + c.artA + ';--art-b:' + c.artB + '"></span>' +
        '<span class="tcg-card-type">' + c.type + '</span>' +
        '<span class="tcg-card-name">' + c.name + '</span>' +
      '</div>'
    );
  }

  function renderCardGame(){
    var g = CONTENT.cardGame;
    var el = document.getElementById('cardgame-content');
    if(!el) return;
    el.innerHTML =
      '<div class="cardgame reveal">' +
        '<div class="cardgame-copy">' +
          '<p class="cardgame-subtitle">' + g.subtitle + '</p>' +
          '<h3>' + g.title + '</h3>' +
          '<p class="cardgame-desc">' + g.description + '</p>' +
          '<span class="tag">' + g.meta + '</span>' +
          '<div class="cardgame-actions">' +
            '<a href="#" class="btn btn-primary magnetic">Purchase Here</a>' +
            '<button type="button" class="btn btn-ghost magnetic" id="tcg-preview-btn" aria-expanded="false">Preview 5 Cards</button>' +
          '</div>' +
        '</div>' +
        '<div class="tcg-stage" id="tcg-stage">' +
          '<button type="button" class="tcg-box" id="tcg-box" aria-label="Open pack preview" aria-expanded="false">' +
            '<span class="tcg-box-side" style="--art-a:' + g.artA + ';--art-b:' + g.artB + '"></span>' +
            artHtml(g, 'tcg-box-front') +
          '</button>' +
          '<div class="tcg-cards">' +
            g.cards.map(function(c, i){ return tcgCardHtml(c, i, g.cards.length); }).join('') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderOfficerGrey(){
    var o = CONTENT.officerGrey;
    var el = document.getElementById('officer-grey-content');
    if(!el) return;
    el.innerHTML =
      '<div class="og-panel reveal">' +
        '<p class="og-eyebrow">' + o.tagline + '</p>' +
        '<h2 class="og-title">' + o.title + '</h2>' +
        '<p class="og-date">' + o.date + '</p>' +
        '<p class="og-desc">' + o.description + '</p>' +
        '<a href="#" class="btn og-btn magnetic">' + o.cta + '</a>' +
      '</div>';
  }

  /**
   * A single social platform link — large wordmark-style text with a
   * cursor-tracked 3D tilt and a color-sweep hover fill (see
   * css/interactions.css .social-link). No card/photo, per the "just
   * treat as a social media section" direction.
   */
  function socialLinkHtml(s){
    return (
      '<a href="#" class="social-link reveal" aria-label="Follow Impound on ' + s.platform + '">' +
        '<span class="social-link-text">' + s.platform + '</span>' +
      '</a>'
    );
  }

  function renderSocials(){
    var items = CONTENT.socials;
    var el = document.getElementById('socials-links');
    if(!el) return;
    el.innerHTML = items.map(socialLinkHtml).join('');
  }

  /**
   * Individual 3D merch item — a clip-path silhouette (tee/long-sleeve/
   * cap/beanie) rather than a card, with its own cursor tilt + idle
   * float (css/interactions.css .merch-shape).
   */
  function merchTile(m, i){
    return (
      '<div class="merch-shape reveal" data-shape="' + m.shape + '" style="--art-a:' + m.artA + ';--art-b:' + m.artB + ';--float-delay:' + (i * 0.35) + 's">' +
        '<span class="merch-shape-cut shape-' + m.shape + '"></span>' +
        '<p>' + m.name + '</p>' +
      '</div>'
    );
  }

  renderFeatured();
  renderShelf('comics-grid', CONTENT.comics);
  renderGrid('characters-grid', CONTENT.characters, characterCard);
  renderGrid('media-grid', CONTENT.media, mediaCard);
  renderCardGame();
  renderGrid('shop-grid', CONTENT.shop, shopCard);
  renderOfficerGrey();
  renderGrid('merch-grid', CONTENT.merch, merchTile);
  renderSocials();
  renderGrid('news-grid', CONTENT.news, newsCard);

  window.IMPOUND_CONTENT = CONTENT;
})();
