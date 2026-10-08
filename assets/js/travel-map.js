// Travel maps. Reads JSON from the <script> named in data-travel-map and draws Leaflet markers.
// mode "all": one marker per place, sized by trip count, with links to each trip.
// mode "trip": the trip's places plus optional sight markers from its days.
(function () {
  var el = document.querySelector('[data-travel-map]');
  if (!el || !window.L) return;
  var data = JSON.parse(document.getElementById(el.getAttribute('data-travel-map')).textContent);
  var brand = '#0047AB';
  var ink = '#1E212E';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function coords(name) {
    var c = data.coords[name];
    if (!c) console.warn('travel-map: no coordinates for "' + name + '" in _data/places.yml');
    return c;
  }

  var map = L.map(el, { scrollWheelZoom: false, worldCopyJump: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  var points = [];
  function dot(latlng, radius, fill, html) {
    L.circleMarker(latlng, { radius: radius, color: '#FFFFFF', weight: 2, fillColor: fill, fillOpacity: 0.9 })
      .addTo(map).bindPopup(html);
    points.push(latlng);
  }

  if (data.mode === 'all') {
    var byPlace = {};
    data.trips.forEach(function (t) {
      (t.places || []).forEach(function (p) { (byPlace[p] = byPlace[p] || []).push(t); });
    });
    Object.keys(byPlace).forEach(function (name) {
      var c = coords(name);
      if (!c) return;
      var trips = byPlace[name];
      var list = trips.map(function (t) {
        return '<li><a href="' + esc(t.url) + '">' + esc(t.title) + '</a> <span>' + esc(t.when) + '</span></li>';
      }).join('');
      var html = '<p class="map-popup__title">' + esc(name) + '</p><p class="map-popup__meta">' + trips.length +
        (trips.length === 1 ? ' trip' : ' trips') + '</p><ul class="map-popup__list">' + list + '</ul>';
      dot([c.lat, c.lng], Math.min(6 + trips.length * 1.5, 18), brand, html);
    });
  } else {
    (data.places || []).forEach(function (name) {
      var c = coords(name);
      if (c) dot([c.lat, c.lng], 10, brand, '<p class="map-popup__title">' + esc(name) + '</p>');
    });
    (data.sights || []).forEach(function (s) {
      dot([s.lat, s.lng], 6, ink, '<p class="map-popup__title">' + esc(s.name) + '</p><p class="map-popup__meta">' + esc(s.day) + '</p>');
    });
  }

  if (points.length === 0) { el.hidden = true; return; }
  if (points.length === 1) map.setView(points[0], 11);
  else map.fitBounds(points, { padding: [36, 36], maxZoom: 12 });
})();
