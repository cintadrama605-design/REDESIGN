/**
 * Content loader — renders the CMS-shaped demo content below into the
 * DOM. This mirrors the collections documented in /cms/*.json and
 * /documentation/Squarespace_Block_Map.md, so swapping this object for
 * live Squarespace collection data is a drop-in replacement — see
 * documentation/Migration_Guide.md for the full migration walkthrough.
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

    featured: {
      title: "IMPOUND #1",
      tagline: "First print. First blood.",
      description: "A city stops caring who it hurts, so someone starts hauling away everything the law won't touch. The series that started the universe, back in print.",
      credits: "Writer: R. Okafor · Artist: D. Vance · Letters: M. Ilic",
      price: "$4.99",
      badge: "New Print",
      glyph: "01",
      image: "", alt: "IMPOUND #1 cover",
      artA: "#26261f", artB: "#050505"
    },

    comics: [
      {
        title: "Impound",
        genre: "Street-Level / Vehicular",
        issues: "6 Issues",
        tagline: "They tow what the law won't touch.",
        price: "$4.99",
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
        genre: "Pyro-Kinetic Action",
        issues: "4 Issues",
        tagline: "Every fight ends in ash.",
        price: "$4.99",
        glyph: "B", image: "", alt: "Blasted series cover art",
        artA: "#2a1712", artB: "#050505",
        pages: seriesPages([
          "Marcus Reyes wakes up in a crater that used to be his job site.",
          "The demolition company wants their 'asset' back.",
          "A city block learns what happens when he loses his temper.",
          "An old crew member shows up with a very specific kind of insurance.",
          "The countdown starts on something bigger than either of them."
        ], "#2a1712", "#050505")
      },
      {
        title: "HydroBeast",
        genre: "Body-Horror / Deep Sea",
        issues: "3 Issues",
        tagline: "The tide always comes back.",
        price: "$4.99",
        glyph: "H", image: "", alt: "HydroBeast series cover art",
        artA: "#0f2224", artB: "#050505",
        pages: seriesPages([
          "A harbor dredging crew pulls up something that shouldn't fit in the net.",
          "The tide charts stop making sense along a six-block stretch of coast.",
          "Someone from the crew starts remembering things that haven't happened yet.",
          "The thing in the harbor starts leaving the harbor.",
          "Low tide reveals exactly how long it's been down there."
        ], "#0f2224", "#050505")
      },
      {
        title: "Cautious",
        genre: "Psychological / Noir",
        issues: "5 Issues",
        tagline: "The most dangerous man in the room hasn't moved yet.",
        price: "$4.99",
        glyph: "C", image: "", alt: "Cautious series cover art",
        artA: "#1c1c22", artB: "#050505",
        pages: seriesPages([
          "Elena Cho takes a case that was never actually offered to her.",
          "Every witness gives a different version of the same ten minutes.",
          "She maps the room before she maps the motive.",
          "The one person who isn't lying turns out to be the problem.",
          "The last move was decided before the first page."
        ], "#1c1c22", "#050505")
      }
    ],

    characters: [
      {
        name: "Impound",
        role: "The Reclaimer",
        bio: "Shows up after everyone else has given up on a block. Doesn't ask who owned it first.",
        glyph: "I", image: "", alt: "Portrait of Impound",
        artA: "#242a12", artB: "#050505"
      },
      {
        name: "Blasted",
        role: "The Detonator",
        bio: "Marcus Reyes turned a demolition accident into the only language he has left.",
        glyph: "B", image: "", alt: "Portrait of Blasted",
        artA: "#2a1712", artB: "#050505"
      },
      {
        name: "HydroBeast",
        role: "The Depth Walker",
        bio: "Nobody's found where it comes from. Everybody's found where it leaves people.",
        glyph: "H", image: "", alt: "Portrait of HydroBeast",
        artA: "#0f2224", artB: "#050505"
      },
      {
        name: "Cautious",
        role: "The Tactician",
        bio: "Elena Cho plans four moves past everyone else's last one.",
        glyph: "C", image: "", alt: "Portrait of Cautious",
        artA: "#1c1c22", artB: "#050505"
      }
    ],

    media: [
      {
        title: "Impound #1 — Teaser Trailer",
        type: "Trailer",
        duration: "1:32",
        glyph: "▶", image: "", alt: "Impound #1 teaser trailer thumbnail",
        artA: "#1c1c1a", artB: "#050505"
      },
      {
        title: "The Impound Yard",
        type: "Animated Short",
        duration: "4:10",
        glyph: "▶", image: "", alt: "The Impound Yard animated short thumbnail",
        artA: "#20201c", artB: "#050505"
      },
      {
        title: "Behind The Ink",
        type: "Behind The Scenes",
        duration: "6:47",
        glyph: "▶", image: "", alt: "Behind The Ink thumbnail",
        artA: "#181816", artB: "#050505"
      }
    ],

    shop: [
      {
        title: "Impound #1",
        category: "Comic",
        price: "$4.99",
        glyph: "01", image: "", alt: "Impound #1 comic cover",
        artA: "#242a12", artB: "#050505"
      },
      {
        title: "Blasted #1",
        category: "Comic",
        price: "$4.99",
        glyph: "01", image: "", alt: "Blasted #1 comic cover",
        artA: "#2a1712", artB: "#050505"
      },
      {
        title: "Universe Enamel Pin Set",
        category: "Collectible",
        price: "$18.00",
        glyph: "★", image: "", alt: "Universe enamel pin set product photo",
        artA: "#1c1c22", artB: "#050505"
      },
      {
        title: "Impound Yard Jacket",
        category: "Merch",
        price: "$68.00",
        glyph: "IC", image: "", alt: "Impound Yard jacket product photo",
        artA: "#151512", artB: "#050505"
      }
    ],

    news: [
      {
        title: "IMPOUND #1 Sells Out First Print Run",
        date: "Aug 12, 2026",
        excerpt: "The flagship issue is back on press after selling through in under three weeks.",
        glyph: "01", image: "", alt: "IMPOUND #1 sells out — news thumbnail",
        artA: "#242a12", artB: "#050505"
      },
      {
        title: "HydroBeast Ongoing Series Announced",
        date: "Jul 28, 2026",
        excerpt: "The deep-sea horror one-shot is getting a full ongoing run starting this fall.",
        glyph: "H", image: "", alt: "HydroBeast ongoing series — news thumbnail",
        artA: "#0f2224", artB: "#050505"
      },
      {
        title: "Meet The Art Team Behind Cautious",
        date: "Jul 09, 2026",
        excerpt: "A look at the noir palette and layout choices driving the series' tone.",
        glyph: "C", image: "", alt: "Cautious art team — news thumbnail",
        artA: "#1c1c22", artB: "#050505"
      }
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
        artHtml(f, 'art-wide') +
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
    el.innerHTML = items.map(function(item){ return builder(item); }).join('');
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

  function shopCard(p){
    return (
      '<article class="card reveal">' +
        artHtml(p, 'art-square') +
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

  renderFeatured();
  renderShelf('comics-grid', CONTENT.comics);
  renderGrid('characters-grid', CONTENT.characters, characterCard);
  renderGrid('media-grid', CONTENT.media, mediaCard);
  renderGrid('shop-grid', CONTENT.shop, shopCard);
  renderGrid('news-grid', CONTENT.news, newsCard);

  window.IMPOUND_CONTENT = CONTENT;
})();
