// Strava case study: switch the redesigned map screenshot between metric options and dark mode.
(function () {
  var viewer = document.querySelector('[data-case-viewer]');
  if (!viewer) return;
  var img = viewer.querySelector('[data-viewer-image]');
  var options = viewer.querySelectorAll('[data-option]');
  var dark = viewer.querySelector('[data-dark]');
  var labels = { remaining: 'distance remaining', total: 'total distance', progressbar: 'a progress visual' };
  var state = { option: 'remaining', dark: false };

  function render() {
    img.src = '/img/portfolio/strava/new/redesign-' + (state.dark ? 'dark-mode-' : '') + 'map-' + state.option + '.png';
    img.alt = 'Redesigned map view' + (state.dark ? ' in dark mode' : '') + ' showing ' + labels[state.option] + ' in the lower left';
    options.forEach(function (b) {
      var on = b.getAttribute('data-option') === state.option;
      b.classList.toggle('chip--active', on);
      b.setAttribute('aria-pressed', on);
    });
    dark.classList.toggle('chip--active', state.dark);
    dark.setAttribute('aria-pressed', state.dark);
  }

  options.forEach(function (b) {
    b.addEventListener('click', function () { state.option = b.getAttribute('data-option'); render(); });
  });
  dark.addEventListener('click', function () { state.dark = !state.dark; render(); });
})();
