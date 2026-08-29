/**
 * Site behavior: mobile nav toggle, scroll-reveal for cards rendered by
 * content-loader.js, newsletter form stub, and footer year.
 */
(function(){

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal — content-loader.js runs first and stamps .reveal
  // elements into the DOM, so this observer is wired up after that.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  // Newsletter form (no backend wired up yet — front-end stub only)
  var form = document.getElementById('newsletter-form');
  var status = document.getElementById('newsletter-status');
  if(form && status){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var email = document.getElementById('newsletter-email').value.trim();
      if(!email) return;
      status.textContent = "You're in — check " + email + " for a confirmation.";
      form.reset();
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  var fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Side dot-nav: highlight the section currently in view, click to jump
  var dotNav = document.getElementById('dot-nav');
  if(dotNav){
    var dotLinks = Array.prototype.slice.call(dotNav.querySelectorAll('a'));
    var sections = dotLinks
      .map(function(a){ return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if('IntersectionObserver' in window && sections.length){
      var dotIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;
          var id = '#' + entry.target.id;
          dotLinks.forEach(function(a){
            a.classList.toggle('is-active', a.getAttribute('href') === id);
          });
        });
      }, { threshold: 0.5 });
      sections.forEach(function(s){ dotIo.observe(s); });
    }
  }

  // Magnetic buttons — pull toward the cursor within their own bounds
  if(fineHover && !reduceMotion){
    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.3) + 'px,' + (y * 0.4) + 'px)';
      });
      el.addEventListener('mouseleave', function(){
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  // Tilt-on-hover — cards (including bundle cards, as one group), book
  // covers, merch shapes, the featured art, and the trading-card box all
  // get a cursor-tracked 3D tilt. Books/box get the most dramatic angle
  // (already leaning in 3D); everything else stays subtler.
  var TILT_TARGETS = '.card, .book, .merch-shape-cut, .featured-art, .tcg-box';
  function tiltMaxDeg(el){
    if(el.classList.contains('book') || el.classList.contains('tcg-box')) return 16;
    return 12;
  }
  if(fineHover && !reduceMotion){
    document.addEventListener('mousemove', function(e){
      var el = e.target.closest ? e.target.closest(TILT_TARGETS) : null;
      if(!el) return;
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var max = tiltMaxDeg(el);
      el.style.setProperty('--ry', ((px - 0.5) * max) + 'deg');
      el.style.setProperty('--rx', ((0.5 - py) * max) + 'deg');
    });
    document.addEventListener('mouseout', function(e){
      var el = e.target.closest ? e.target.closest(TILT_TARGETS) : null;
      if(!el) return;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }

  // Cursor ring — additive trailing ring, never replaces the native cursor
  var ring = document.getElementById('cursor-ring');
  if(ring && fineHover && !reduceMotion){
    var ringX = 0, ringY = 0, mouseX = 0, mouseY = 0, ringActive = false;
    document.addEventListener('mousemove', function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      if(!ringActive){
        ring.classList.add('is-active');
        ringActive = true;
      }
      var hoverTarget = e.target.closest ? e.target.closest('a, button, .book, .card, .tcg-box, .tcg-card, .stack-cover, .merch-shape, .featured-art') : null;
      ring.classList.toggle('is-hovering', !!hoverTarget);
    });
    document.addEventListener('mouseleave', function(){
      ring.classList.remove('is-active');
      ringActive = false;
    });
    (function tick(){
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0)';
      window.requestAnimationFrame(tick);
    })();
  }

})();
