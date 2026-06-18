/* Big Sioux Benefits — scroll-reveal engine.
   Adds `.is-revealed` to every [data-reveal] element as it enters the
   viewport, which triggers the CSS transitions defined in tokens/motion.css
   (rise, .bsb-draw line-draw, .bsb-rule wipe). Respects reduced-motion and
   includes a safety net so content is never left hidden.

   Usage:  <script src="assets/motion.js" defer></script>
           <div data-reveal style="--reveal-delay:.2s">…</div>
*/
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reveal(el) { el.classList.add('is-revealed'); }

  function init(root) {
    root = root || document;
    var items = root.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(reveal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (i) { io.observe(i); });
    // safety net — never leave content hidden if the observer misfires
    setTimeout(function () { items.forEach(reveal); }, 3000);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', function () { init(); });

  window.BSBMotion = { init: init, reveal: reveal };
})();
