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

})();
