// Travel map: a tile free world map drawn with D3 as inline SVG. No API keys, no third party services.
//
// Data flow
// 1. Jekyll writes a JSON <script> tag next to the map (see travel/index.html and _layouts/trip.html).
//    It holds the visited countries and places from the trips in _trips/, plus every city in
//    _data/cities.yml. Adding a trip file updates the map on the next build.
// 2. This script loads two local boundary files from /assets/vendor/:
//    countries-110m.json (world-atlas, Natural Earth) and uk-nations-50m.json (England, Scotland,
//    Wales and Northern Ireland from Natural Earth map units, so England can be shaded on its own).
// 3. Country names from the trips are matched to boundary names through NAME_ALIASES below.
//    Places are matched to cities.yml by name. Anything unmatched logs a console warning.
// 4. Two stacked SVGs share one zoom transform: the base map (role img) and a marker layer whose
//    markers are keyboard focusable buttons with accessible names.
(function () {
  var container = document.querySelector('[data-travel-map]');
  if (!container || !window.d3 || !window.topojson) return;

  var data = JSON.parse(document.getElementById(container.getAttribute('data-travel-map')).textContent);

  // Trip names that differ from the boundary file names. Add more here as needed.
  var NAME_ALIASES = {
    'United States': 'United States of America',
    'Czech Republic': 'Czechia',
    'Bosnia and Herzegovina': 'Bosnia and Herz.',
    'Dominican Republic': 'Dominican Rep.'
  };
  // Countries too small for the 110m boundaries. They appear only as city markers.
  var MARKER_ONLY = ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein', 'Andorra', 'Malta', 'Singapore'];

  var MAX_ZOOM = 12;
  var MARKER_RADIUS = 4.5;
  var MARKER_STROKE = 1.5;

  var stage = container.querySelector('.map-stage');
  var tip = container.querySelector('.map-tip');

  Promise.all([
    d3.json('/assets/vendor/countries-110m.json'),
    d3.json('/assets/vendor/uk-nations-50m.json')
  ]).then(function (files) {
    var features = buildFeatures(files[0], files[1]);
    var visited = matchCountries(features);
    var markers = matchMarkers();
    draw(features, visited, markers);
    var redraw = debounce(function () { draw(features, visited, markers); }, 150);
    if (window.ResizeObserver) new ResizeObserver(redraw).observe(stage);
  }).catch(function (err) {
    console.warn('travel-map: could not load map data', err);
    stage.innerHTML = '<p class="map-error">The map could not be loaded.</p>';
  });

  // World countries without Antarctica, with the United Kingdom swapped for its four nations.
  // France's boundary also contains French Guiana, which is split off so it stays unshaded.
  function buildFeatures(world, uk) {
    var features = topojson.feature(world, world.objects.countries).features
      .filter(function (f) { return f.properties.name !== 'Antarctica' && f.properties.name !== 'United Kingdom'; });
    var france = features.filter(function (f) { return f.properties.name === 'France'; })[0];
    if (france && france.geometry.type === 'MultiPolygon') {
      var inAmericas = function (poly) { return d3.geoCentroid({ type: 'Polygon', coordinates: poly })[0] < -30; };
      var guiana = france.geometry.coordinates.filter(inAmericas);
      france.geometry.coordinates = france.geometry.coordinates.filter(function (p) { return !inAmericas(p); });
      if (guiana.length) features.push({ type: 'Feature', properties: { name: 'French Guiana' }, geometry: { type: 'MultiPolygon', coordinates: guiana } });
    }
    return features.concat(uk.features);
  }

  // Returns the set of boundary names to shade, warning about any trip country with no match.
  function matchCountries(features) {
    var names = {};
    features.forEach(function (f) { names[f.properties.name] = true; });
    var visited = {};
    (data.countries || []).forEach(function (c) {
      var name = NAME_ALIASES[c] || c;
      if (names[name]) visited[name] = true;
      else if (MARKER_ONLY.indexOf(c) === -1) console.warn('travel-map: no boundary found for country "' + c + '". Add it to NAME_ALIASES.');
    });
    return visited;
  }

  // Turns trip places (and trip page sights) into marker objects with coordinates.
  function matchMarkers() {
    var byName = {};
    data.cities.forEach(function (c) { byName[c.name] = c; });
    var counts = {};
    (data.trips || []).forEach(function (places) {
      places.forEach(function (p) { counts[p] = (counts[p] || 0) + 1; });
    });
    var markers = [];
    (data.places || []).forEach(function (p) {
      var c = byName[p];
      if (!c) { console.warn('travel-map: no coordinates for place "' + p + '". Add it to _data/cities.yml.'); return; }
      var detail = c.country;
      if (counts[p]) detail += ' · ' + counts[p] + (counts[p] === 1 ? ' trip' : ' trips');
      markers.push({ name: c.name, label: c.name + ', ' + c.country, detail: detail, lon: c.lon, lat: c.lat });
    });
    (data.sights || []).forEach(function (s) {
      markers.push({ name: s.name, label: s.name + ', ' + s.day, detail: s.day, lon: s.lng, lat: s.lat, sight: true });
    });
    return markers;
  }

  function draw(features, visited, markers) {
    var width = stage.clientWidth;
    var height = stage.clientHeight;
    if (!width || !height) return;
    stage.querySelectorAll('svg').forEach(function (n) { n.remove(); });
    hideTip();

    var projection = d3.geoNaturalEarth1().fitExtent([[8, 8], [width - 8, height - 8]], { type: 'FeatureCollection', features: features });
    var path = d3.geoPath(projection);

    // Base map: countries. role img with a summary label.
    var base = d3.select(stage).append('svg')
      .attr('class', 'map-svg')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('role', 'img')
      .attr('aria-label', container.getAttribute('data-map-label'));
    var land = base.append('g');
    land.selectAll('path').data(features).enter().append('path')
      .attr('d', path)
      .attr('class', function (f) { return 'map-country' + (visited[f.properties.name] ? ' map-country--visited' : ''); })
      .on('mousemove', function (event, f) { showTip(f.properties.name, '', pointIn(event)); })
      .on('mouseleave', hideTip)
      .on('click', function (event, f) { event.stopPropagation(); showTip(f.properties.name, '', pointIn(event)); });

    // Marker layer: sits on top, ignores pointer events except on the markers themselves.
    var overlay = d3.select(stage).append('svg')
      .attr('class', 'map-svg map-svg--markers')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('role', 'group')
      .attr('aria-label', 'Places visited');
    var pins = overlay.append('g');
    var dots = pins.selectAll('circle').data(markers).enter().append('circle')
      .attr('class', function (m) { return 'map-marker' + (m.sight ? ' map-marker--sight' : ''); })
      .attr('cx', function (m) { return projection([m.lon, m.lat])[0]; })
      .attr('cy', function (m) { return projection([m.lon, m.lat])[1]; })
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', function (m) { return m.label; })
      .on('mouseenter focus', function (event, m) { showTip(m.name, m.detail, markerPoint(this)); })
      .on('mouseleave blur', hideTip)
      .on('click', function (event, m) { event.stopPropagation(); showTip(m.name, m.detail, markerPoint(this)); });

    // Zoom: drag or buttons on desktop, two fingers on touch. The wheel only zooms with Ctrl
    // (trackpad pinch), so scrolling the page never gets trapped by the map.
    var zoom = d3.zoom()
      .scaleExtent([1, MAX_ZOOM])
      .translateExtent([[0, 0], [width, height]])
      .filter(function (event) {
        if (event.type === 'wheel') return event.ctrlKey;
        if (event.type === 'touchstart') return event.touches.length > 1;
        return !event.button;
      })
      .on('zoom', function (event) {
        var t = event.transform;
        land.attr('transform', t);
        pins.attr('transform', t);
        dots.attr('r', MARKER_RADIUS / t.k).attr('stroke-width', MARKER_STROKE / t.k);
        hideTip();
      });
    base.call(zoom).on('dblclick.zoom', null);

    // Trip pages start zoomed to the trip's markers. The overview starts on the whole world.
    var home = homeTransform(markers, projection, width, height);
    base.call(zoom.transform, home);

    container.querySelector('[data-zoom="in"]').onclick = function () { base.transition().duration(250).call(zoom.scaleBy, 1.6); };
    container.querySelector('[data-zoom="out"]').onclick = function () { base.transition().duration(250).call(zoom.scaleBy, 1 / 1.6); };
    container.querySelector('[data-zoom="reset"]').onclick = function () { base.transition().duration(350).call(zoom.transform, home); };
  }

  function homeTransform(markers, projection, width, height) {
    if (data.mode !== 'trip' || markers.length === 0) return d3.zoomIdentity;
    var pts = markers.map(function (m) { return projection([m.lon, m.lat]); });
    var xs = pts.map(function (p) { return p[0]; });
    var ys = pts.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var k = Math.min(MAX_ZOOM * 0.75, 0.6 / Math.max((x1 - x0) / width, (y1 - y0) / height, 0.05));
    k = Math.max(1, k);
    return d3.zoomIdentity.translate(width / 2, height / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
  }

  // Tooltip helpers. Positions are relative to the map stage.
  function pointIn(event) {
    var r = stage.getBoundingClientRect();
    return [event.clientX - r.left, event.clientY - r.top];
  }
  function markerPoint(el) {
    var r = stage.getBoundingClientRect();
    var b = el.getBoundingClientRect();
    return [b.left + b.width / 2 - r.left, b.top - r.top];
  }
  function showTip(title, detail, at) {
    tip.innerHTML = '';
    var t = document.createElement('strong');
    t.textContent = title;
    tip.appendChild(t);
    if (detail) {
      var d = document.createElement('span');
      d.textContent = detail;
      tip.appendChild(d);
    }
    tip.hidden = false;
    var half = tip.offsetWidth / 2 + 8;
    var x = Math.max(half, Math.min(at[0], stage.clientWidth - half));
    tip.style.left = x + 'px';
    tip.style.top = at[1] + 'px';
  }
  function hideTip() { tip.hidden = true; }

  // Tapping empty space or pressing Escape closes the tooltip.
  stage.addEventListener('click', hideTip);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });

  function debounce(fn, ms) {
    var timer;
    return function () { clearTimeout(timer); timer = setTimeout(fn, ms); };
  }
})();
