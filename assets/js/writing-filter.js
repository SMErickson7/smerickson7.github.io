// Topic filter for the Writing page. Reads and writes the topic in the URL hash
// (for example /writing/#cycling) so homepage topic links land pre-filtered.
(function () {
  var filter = document.querySelector('[data-filter]');
  var list = document.querySelector('[data-posts]');
  if (!filter || !list) return;
  var buttons = filter.querySelectorAll('[data-topic]');
  var posts = list.querySelectorAll('[data-topic]');
  var empty = document.querySelector('[data-empty]');

  function apply(topic) {
    var valid = Array.prototype.some.call(buttons, function (b) { return b.dataset.topic === topic; });
    if (!valid) topic = 'all';
    buttons.forEach(function (b) {
      var on = b.dataset.topic === topic;
      b.classList.toggle('chip--active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var shown = 0;
    posts.forEach(function (p) {
      var match = topic === 'all' || p.dataset.topic === topic;
      p.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var topic = b.dataset.topic;
      history.replaceState(null, '', topic === 'all' ? location.pathname : '#' + topic);
      apply(topic);
    });
  });

  window.addEventListener('hashchange', function () { apply(location.hash.slice(1)); });
  apply(location.hash.slice(1) || 'all');
})();
