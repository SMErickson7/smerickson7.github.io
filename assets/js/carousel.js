// Photo carousel: a horizontally scrolling strip that snaps to each photo.
// Swipe, scroll, or arrow keys move it natively; the buttons step one photo at a time.
// The counter and button states follow the scroll position. No autoplay.
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var slides = track.children;
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var count = carousel.querySelector('[data-carousel-count]');
    if (!prev || !next || !count) return;

    function current() {
      var left = track.scrollLeft;
      var best = 0;
      for (var i = 0; i < slides.length; i++) {
        if (Math.abs(slides[i].offsetLeft - left) < Math.abs(slides[best].offsetLeft - left)) best = i;
      }
      return best;
    }

    function update() {
      var i = current();
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      count.textContent = (atEnd ? slides.length : i + 1) + ' / ' + slides.length;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd;
    }

    function go(step) {
      var target = slides[Math.max(0, Math.min(slides.length - 1, current() + step))];
      track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
