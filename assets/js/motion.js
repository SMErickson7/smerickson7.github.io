// Scroll reveal: blocks below the fold fade up once as they come into view.
// Blocks already on screen when the page loads are left alone, so nothing flashes or hides.
// Skipped entirely when the visitor prefers reduced motion. Styles live in site.css under "Motion".
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SELECTOR = [
    '.section-head', '.featured', '.fixture', '.report-grid', '.stamp-panel', '.post-nav__link',
    '.timeline__item', '.day', '.photo-grid__item', '.travel-map', '.passport-page',
    '.report__overview', '.trip__overview', '.case-figure', '.case-compare', '.case-viewer',
    '.bike', '.cycling-story', '.carousel', '.metrics', '.case-callout'
  ].join(',');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  // Siblings that enter together are staggered slightly (up to 4 steps of 60ms).
  var stagger = new Map();
  document.querySelectorAll(SELECTOR).forEach(function (el) {
    if (el.parentElement && el.parentElement.closest('.reveal')) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    var step = stagger.get(el.parentElement) || 0;
    stagger.set(el.parentElement, step + 1);
    el.style.setProperty('--reveal-delay', Math.min(step, 4) * 60 + 'ms');
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
