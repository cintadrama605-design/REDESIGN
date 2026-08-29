/**
 * Trading card game — click the box (or the "Preview 5 Cards" button) to
 * deal 5 cards out in a fanned hand (css/interactions.css .tcg-stage.is-open),
 * each independently hoverable. Click again to send them back into the box.
 */
(function(){

  var stage = document.getElementById('tcg-stage');
  var box = document.getElementById('tcg-box');
  var previewBtn = document.getElementById('tcg-preview-btn');
  if(!stage || !box || !previewBtn) return;

  var isOpen = false;

  function toggle(){
    isOpen = !isOpen;
    stage.classList.toggle('is-open', isOpen);
    previewBtn.textContent = isOpen ? 'Back To Box' : 'Preview 5 Cards';
    previewBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    box.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  box.addEventListener('click', toggle);
  previewBtn.addEventListener('click', toggle);

})();
