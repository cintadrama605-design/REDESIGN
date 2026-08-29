/**
 * Content loader — renders the CMS-shaped demo content below into the
 * DOM. This mirrors the collections documented in /cms/*.json and
 * /documentation/Squarespace_Block_Map.md, so swapping this object for
 * live Squarespace collection data is a drop-in replacement — see
 * README.md for the migration notes.
 */
(function(){

  var CONTENT = {

    featured: {
      title: "IMPOUND #1",
      tagline: "First print. First blood.",
      description: "A city stops caring who it hurts, so someone starts hauling away everything the law won't touch. The series that started the universe, back in print.",
      credits: "Writer: R. Okafor · Artist: D. Vance · Letters: M. Ilic",
      price: "$4.99",
      badge: "New Print",
      glyph: "01",
      artA: "#26261f", artB: "#050505"
    },

    comics: [
      {
        title: "Impound",
        genre: "Street-Level / Vehicular",
        issues: "6 Issues",
        tagline: "They tow what the law won't touch.",
        glyph: "I", artA: "#242a12", artB: "#050505"
      },
      {
        title: "Blasted",
        genre: "Pyro-Kinetic Action",
        issues: "4 Issues",
        tagline: "Every fight ends in ash.",
        glyph: "B", artA: "#2a1712", artB: "#050505"
      },
      {
        title: "HydroBeast",
        genre: "Body-Horror / Deep Sea",
        issues: "3 Issues",
        tagline: "The tide always comes back.",
        glyph: "H", artA: "#0f2224", artB: "#050505"
      },
      {
        title: "Cautious",
        genre: "Psychological / Noir",
        issues: "5 Issues",
        tagline: "The most dangerous man in the room hasn't moved yet.",
        glyph: "C", artA: "#1c1c22", artB: "#050505"
      }
    ],

    characters: [
      {
        name: "Impound",
        role: "The Reclaimer",
        bio: "Shows up after everyone else has given up on a block. Doesn't ask who owned it first.",
        glyph: "I", artA: "#242a12", artB: "#050505"
      },
      {
        name: "Blasted",
        role: "The Detonator",
        bio: "Marcus Reyes turned a demolition accident into the only language he has left.",
        glyph: "B", artA: "#2a1712", artB: "#050505"
      },
      {
        name: "HydroBeast",
        role: "The Depth Walker",
        bio: "Nobody's found where it comes from. Everybody's found where it leaves people.",
        glyph: "H", artA: "#0f2224", artB: "#050505"
      },
      {
        name: "Cautious",
        role: "The Tactician",
        bio: "Elena Cho plans four moves past everyone else's last one.",
        glyph: "C", artA: "#1c1c22", artB: "#050505"
      }
    ],

    media: [
      {
        title: "Impound #1 — Teaser Trailer",
        type: "Trailer",
        duration: "1:32",
        glyph: "▶", artA: "#1c1c1a", artB: "#050505"
      },
      {
        title: "The Impound Yard",
        type: "Animated Short",
        duration: "4:10",
        glyph: "▶", artA: "#20201c", artB: "#050505"
      },
      {
        title: "Behind The Ink",
        type: "Behind The Scenes",
        duration: "6:47",
        glyph: "▶", artA: "#181816", artB: "#050505"
      }
    ],

    shop: [
      {
        title: "Impound #1",
        category: "Comic",
        price: "$4.99",
        glyph: "01", artA: "#242a12", artB: "#050505"
      },
      {
        title: "Blasted #1",
        category: "Comic",
        price: "$4.99",
        glyph: "01", artA: "#2a1712", artB: "#050505"
      },
      {
        title: "Universe Enamel Pin Set",
        category: "Collectible",
        price: "$18.00",
        glyph: "★", artA: "#1c1c22", artB: "#050505"
      },
      {
        title: "Impound Yard Jacket",
        category: "Merch",
        price: "$68.00",
        glyph: "IC", artA: "#151512", artB: "#050505"
      }
    ],

    news: [
      {
        title: "IMPOUND #1 Sells Out First Print Run",
        date: "Aug 12, 2026",
        excerpt: "The flagship issue is back on press after selling through in under three weeks.",
        glyph: "01", artA: "#242a12", artB: "#050505"
      },
      {
        title: "HydroBeast Ongoing Series Announced",
        date: "Jul 28, 2026",
        excerpt: "The deep-sea horror one-shot is getting a full ongoing run starting this fall.",
        glyph: "H", artA: "#0f2224", artB: "#050505"
      },
      {
        title: "Meet The Art Team Behind Cautious",
        date: "Jul 09, 2026",
        excerpt: "A look at the noir palette and layout choices driving the series' tone.",
        glyph: "C", artA: "#1c1c22", artB: "#050505"
      }
    ]
  };

  function artStyle(a, b){
    return 'style="--art-a:' + a + ';--art-b:' + b + '"';
  }

  function renderFeatured(){
    var f = CONTENT.featured;
    var el = document.getElementById('featured-card');
    if(!el) return;
    el.innerHTML =
      '<div class="featured reveal">' +
        '<div class="art art-wide" data-glyph="' + f.glyph + '" ' + artStyle(f.artA, f.artB) + '></div>' +
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

  function comicCard(c){
    return (
      '<article class="card reveal">' +
        '<div class="art" data-glyph="' + c.glyph + '" ' + artStyle(c.artA, c.artB) + '></div>' +
        '<div class="card-body">' +
          '<div class="card-meta"><span class="tag">' + c.genre + '</span><span class="tag">' + c.issues + '</span></div>' +
          '<h3>' + c.title + '</h3>' +
          '<p class="card-desc">' + c.tagline + '</p>' +
          '<div class="card-foot"><a href="#" class="text-link">View Series →</a></div>' +
        '</div>' +
      '</article>'
    );
  }

  function characterCard(c){
    return (
      '<article class="card reveal">' +
        '<div class="art art-square" data-glyph="' + c.glyph + '" ' + artStyle(c.artA, c.artB) + '></div>' +
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
        '<div class="art art-wide art-media" data-glyph="" ' + artStyle(m.artA, m.artB) + '></div>' +
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
        '<div class="art art-square" data-glyph="' + p.glyph + '" ' + artStyle(p.artA, p.artB) + '></div>' +
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
        '<div class="art art-wide" data-glyph="' + n.glyph + '" ' + artStyle(n.artA, n.artB) + '></div>' +
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
  renderGrid('comics-grid', CONTENT.comics, comicCard);
  renderGrid('characters-grid', CONTENT.characters, characterCard);
  renderGrid('media-grid', CONTENT.media, mediaCard);
  renderGrid('shop-grid', CONTENT.shop, shopCard);
  renderGrid('news-grid', CONTENT.news, newsCard);

  window.IMPOUND_CONTENT = CONTENT;
})();
