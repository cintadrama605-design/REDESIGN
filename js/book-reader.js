/**
 * 3D book shelf → click-to-open reader.
 *
 * Click a .book on the shelf (rendered by content-loader.js's
 * renderShelf/bookMarkup): the clicked cover FLIP-morphs from its shelf
 * position into a centered stage, the cover then swings open like a real
 * book, and Prev/Next flip through 5 preview pages plus a closing CTA
 * leaf. Close reverses the whole sequence back to the shelf.
 *
 * MIGRATION NOTE: this entire interaction is bespoke — see
 * documentation/Migration_Guide.md §5 for the Squarespace Code
 * Injection version, or drop it for a plain Summary Block grid.
 */
(function(){

  var content = window.IMPOUND_CONTENT;
  var overlay = document.getElementById('book-reader');
  var stage3d = document.getElementById('book-3d');
  var pageCountEl = document.getElementById('book-page-count');
  var prevBtn = document.getElementById('book-prev');
  var nextBtn = document.getElementById('book-next');

  if(!content || !overlay || !stage3d || !prevBtn || !nextBtn) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MORPH_MS = reduceMotion ? 0 : 500;
  var FLIP_MS = reduceMotion ? 0 : 620;

  var leaves = [];
  var currentComic = null;
  var flippedCount = 0; // 0 = cover showing, leaves.length-1 = final CTA leaf showing
  var triggerEl = null;
  var isOpen = false;
  var isAnimating = false;

  function artInnerHtml(comic){
    if(comic.image){
      return '<img src="' + comic.image + '" alt="' + (comic.alt || '') + '" style="width:100%;height:100%;object-fit:cover">';
    }
    return '<div class="page-art" data-glyph="' + comic.glyph + '" style="--art-a:' + comic.artA + ';--art-b:' + comic.artB + ';height:100%"></div>';
  }

  function buildLeaves(comic){
    stage3d.innerHTML = '';
    leaves = [];
    var total = comic.pages.length + 2; // cover + pages + cta

    var cover = document.createElement('div');
    cover.className = 'page';
    cover.style.zIndex = String(total);
    cover.innerHTML = '<div class="page-face">' + artInnerHtml(comic) + '</div><div class="page-face is-back"></div>';
    stage3d.appendChild(cover);
    leaves.push(cover);

    comic.pages.forEach(function(p, i){
      var leaf = document.createElement('div');
      leaf.className = 'page';
      leaf.style.zIndex = String(total - 1 - i);
      leaf.innerHTML =
        '<div class="page-face">' +
          '<div class="page-art" data-glyph="' + p.glyph + '" style="--art-a:' + p.artA + ';--art-b:' + p.artB + '"></div>' +
          '<div class="page-caption">' + p.caption + '</div>' +
        '</div>' +
        '<div class="page-face is-back"></div>';
      stage3d.appendChild(leaf);
      leaves.push(leaf);
    });

    var cta = document.createElement('div');
    cta.className = 'page';
    cta.style.zIndex = '1';
    cta.innerHTML =
      '<div class="page-face">' +
        '<div class="page-cta">' +
          '<h4>' + comic.title + '</h4>' +
          '<p>' + comic.tagline + '</p>' +
          '<span class="price">' + comic.price + '</span>' +
          '<a href="#shop" class="btn btn-primary btn-small" data-book-close>Buy Now</a>' +
        '</div>' +
      '</div>' +
      '<div class="page-face is-back"></div>';
    stage3d.appendChild(cta);
    leaves.push(cta);
  }

  function updateControls(){
    var last = leaves.length - 1;
    prevBtn.disabled = flippedCount <= 0;
    nextBtn.disabled = flippedCount >= last;
    if(flippedCount === 0){
      pageCountEl.textContent = 'Cover';
    } else if(flippedCount === last){
      pageCountEl.textContent = 'Buy Now';
    } else {
      pageCountEl.textContent = 'Page ' + flippedCount + ' of ' + (leaves.length - 2);
    }
  }

  function goNext(){
    if(flippedCount >= leaves.length - 1) return;
    leaves[flippedCount].classList.add('is-flipped');
    flippedCount++;
    updateControls();
  }

  function goPrev(){
    if(flippedCount <= 0) return;
    flippedCount--;
    leaves[flippedCount].classList.remove('is-flipped');
    updateControls();
  }

  function morphTo(sourceRect, callback){
    var targetRect = stage3d.getBoundingClientRect();
    var deltaX = sourceRect.left - targetRect.left;
    var deltaY = sourceRect.top - targetRect.top;
    var scaleX = sourceRect.width / targetRect.width;
    var scaleY = sourceRect.height / targetRect.height;

    if(reduceMotion){
      stage3d.style.transition = 'none';
      stage3d.style.transform = 'none';
      if(callback) callback();
      return;
    }

    stage3d.style.transformOrigin = 'top left';
    stage3d.style.transition = 'none';
    stage3d.style.transform = 'translate(' + deltaX + 'px,' + deltaY + 'px) scale(' + scaleX + ',' + scaleY + ')';
    // force reflow so the next transform change actually animates
    void stage3d.offsetWidth;
    stage3d.style.transition = 'transform ' + MORPH_MS + 'ms var(--ease)';
    stage3d.style.transform = 'translate(0,0) scale(1,1)';

    window.setTimeout(function(){
      if(callback) callback();
    }, MORPH_MS);
  }

  function morphBack(sourceRect, callback){
    if(reduceMotion){
      if(callback) callback();
      return;
    }
    var targetRect = stage3d.getBoundingClientRect();
    var deltaX = sourceRect.left - targetRect.left;
    var deltaY = sourceRect.top - targetRect.top;
    var scaleX = sourceRect.width / targetRect.width;
    var scaleY = sourceRect.height / targetRect.height;

    stage3d.style.transition = 'transform ' + MORPH_MS + 'ms var(--ease)';
    stage3d.style.transform = 'translate(' + deltaX + 'px,' + deltaY + 'px) scale(' + scaleX + ',' + scaleY + ')';

    window.setTimeout(function(){
      if(callback) callback();
    }, MORPH_MS);
  }

  function setBackgroundInert(state){
    ['header.nav', 'main#main', 'footer.footer', '.dot-nav'].forEach(function(sel){
      var el = document.querySelector(sel);
      if(el) el.inert = state;
    });
    document.body.classList.toggle('no-scroll', state);
  }

  function openBook(index, trigger){
    if(isAnimating || isOpen) return;
    var comic = content.comics[index];
    if(!comic) return;

    isAnimating = true;
    triggerEl = trigger;
    currentComic = comic;
    flippedCount = 0;

    var coverEl = trigger.querySelector('.book-cover-wrap') || trigger;
    var sourceRect = coverEl.getBoundingClientRect();

    buildLeaves(comic);
    updateControls();

    overlay.hidden = false;
    // force reflow before adding is-open so the scrim/stage opacity transition runs
    void overlay.offsetWidth;
    overlay.classList.add('is-open');
    isOpen = true;
    setBackgroundInert(true);

    morphTo(sourceRect, function(){
      goNext(); // auto-open the cover once the book has landed on stage
      isAnimating = false;
      var closeBtn = document.getElementById('book-close');
      if(closeBtn) closeBtn.focus();
    });
  }

  function closeBook(){
    if(isAnimating || !isOpen || !triggerEl) return;
    isAnimating = true;

    // close all open leaves before shrinking back down
    while(flippedCount > 0){
      flippedCount--;
      leaves[flippedCount].classList.remove('is-flipped');
    }

    var coverEl = triggerEl.querySelector('.book-cover-wrap') || triggerEl;
    var sourceRect = coverEl.getBoundingClientRect();

    window.setTimeout(function(){
      morphBack(sourceRect, function(){
        overlay.classList.remove('is-open');
        overlay.hidden = true;
        stage3d.style.transition = 'none';
        stage3d.style.transform = 'none';
        setBackgroundInert(false);
        isOpen = false;
        isAnimating = false;
        if(triggerEl){ triggerEl.focus(); }
        triggerEl = null;
      });
    }, reduceMotion ? 0 : 260);
  }

  document.addEventListener('click', function(e){
    var book = e.target.closest ? e.target.closest('.book') : null;
    if(book && book.dataset && book.dataset.comicIndex !== undefined){
      openBook(parseInt(book.dataset.comicIndex, 10), book);
      return;
    }
    if(e.target.closest && e.target.closest('[data-book-close]')){
      closeBook();
    }
  });

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  document.addEventListener('keydown', function(e){
    if(!isOpen) return;
    if(e.key === 'Escape'){ closeBook(); return; }
    if(e.key === 'ArrowRight'){ goNext(); return; }
    if(e.key === 'ArrowLeft'){ goPrev(); return; }
    if(e.key === 'Tab'){
      var focusable = overlay.querySelectorAll('button:not(:disabled), a[href]');
      if(!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      }
    }
  });

})();
