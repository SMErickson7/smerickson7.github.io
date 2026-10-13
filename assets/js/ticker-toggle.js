// "Turn this annoying ticker off" switch under the homepage ticker (markup in _includes/ticker.html).
// Switching it on pauses the scroll where it is. The choice is remembered in this browser only;
// storage can be unavailable (private windows, blocked site data), so every access is guarded.
(function () {
  var button = document.querySelector('[data-ticker-toggle]');
  var ticker = document.querySelector('.ticker');
  if (!button || !ticker) return;
  var KEY = 'ticker-off';

  function set(off) {
    ticker.classList.toggle('ticker--off', off);
    button.setAttribute('aria-checked', off ? 'true' : 'false');
  }

  var saved = false;
  try { saved = localStorage.getItem(KEY) === '1'; } catch (e) {}
  set(saved);

  button.addEventListener('click', function () {
    var off = button.getAttribute('aria-checked') !== 'true';
    set(off);
    try { localStorage.setItem(KEY, off ? '1' : '0'); } catch (e) {}
  });
})();
