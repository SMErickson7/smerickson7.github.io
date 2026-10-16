// Photo carousel: a horizontally scrolling strip that snaps to each photo.
// Swipe, scroll, or arrow keys move it natively; the buttons step one photo at a time.
// The counter and button states follow the scroll position.
// Autoplay: advances every DELAY ms and loops back to the first photo after the last.
// It holds while the pointer or keyboard focus is on the carousel, while it is off screen
// or the tab is hidden, and restarts its countdown after any swipe or click.
// The Pause button stops it for good; reduced-motion visitors get no autoplay at all.
// Gallery view: the toggle swaps the strip for a grid of every photo (and stops autoplay).
// The choice is remembered in this browser.
(function () {
  var DELAY = 5000;
  var VIEW_KEY = 'carousel-view';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function savedGallery() {
    try { return window.localStorage.getItem(VIEW_KEY) === 'gallery'; } catch (e) { return false; }
  }
  function saveGallery(on) {
    try { window.localStorage.setItem(VIEW_KEY, on ? 'gallery' : 'carousel'); } catch (e) {}
  }

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var slides = track.children;
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var count = carousel.querySelector('[data-carousel-count]');
    var play = carousel.querySelector('[data-carousel-play]');
    var view = carousel.querySelector('[data-carousel-view]');
    if (!prev || !next || !count) return;

    var auto = !reduced && !!play && slides.length > 1;
    var timer = null;
    var stopped = false; // visitor pressed Pause
    var gallery = false;
    var hovered = false;
    var focused = false;
    var visible = true;

    function current() {
      var left = track.scrollLeft;
      var best = 0;
      for (var i = 0; i < slides.length; i++) {
        if (Math.abs(slides[i].offsetLeft - left) < Math.abs(slides[best].offsetLeft - left)) best = i;
      }
      return best;
    }

    function atEnd() {
      return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }

    function update() {
      var i = current();
      count.textContent = (atEnd() ? slides.length : i + 1) + ' / ' + slides.length;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd();
    }

    function go(step) {
      var target = slides[Math.max(0, Math.min(slides.length - 1, current() + step))];
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }

    function tick() {
      if (atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
      else go(1);
      restart();
    }

    function restart() {
      window.clearTimeout(timer);
      timer = null;
      if (!auto || stopped || gallery || hovered || focused || !visible || document.hidden) return;
      timer = window.setTimeout(tick, DELAY);
    }

    function setGallery(on) {
      gallery = on;
      carousel.classList.toggle('carousel--gallery', on);
      if (view) {
        view.textContent = on ? 'Carousel view' : 'Gallery view';
        view.setAttribute('aria-pressed', String(on));
      }
      if (!on) track.scrollLeft = 0;
      update();
      restart();
    }

    prev.addEventListener('click', function () { go(-1); restart(); });
    next.addEventListener('click', function () { go(1); restart(); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);

    if (view) {
      view.addEventListener('click', function () {
        setGallery(!gallery);
        saveGallery(gallery);
      });
    }

    if (auto) {
      play.hidden = false;
      play.addEventListener('click', function () {
        stopped = !stopped;
        play.textContent = stopped ? 'Play' : 'Pause';
        play.setAttribute('aria-pressed', String(stopped));
        restart();
      });

      track.addEventListener('mouseenter', function () { hovered = true; restart(); });
      track.addEventListener('mouseleave', function () { hovered = false; restart(); });
      track.addEventListener('focusin', function () { focused = true; restart(); });
      track.addEventListener('focusout', function () { focused = false; restart(); });
      track.addEventListener('pointerdown', restart);
      track.addEventListener('wheel', restart, { passive: true });
      document.addEventListener('visibilitychange', restart);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          restart();
        }, { threshold: 0.5 }).observe(track);
      }
    }

    setGallery(!!view && savedGallery());
  });
})();
