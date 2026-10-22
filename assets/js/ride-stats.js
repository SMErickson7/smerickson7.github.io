// "By the numbers" on /cycling/. Filters every ride by year, date range and bike,
// then recalculates the stats table and the ride list. Rides come from
// _data/rides.json (synced from Google Sheets), printed into #ride-data.
// The filter lives in the URL (for example /cycling/?year=2023&bike=trek-domane-sl-5-gen-4)
// so a filtered view can be linked to.
(function () {
  var dataEl = document.getElementById('ride-data');
  var form = document.querySelector('[data-ride-filters]');
  var summary = document.querySelector('[data-ride-summary]');
  if (!dataEl || !form || !summary) return;

  var rides;
  try { rides = JSON.parse(dataEl.textContent) || []; } catch (e) { return; }
  if (!rides.length) return;

  var yearsEl = form.querySelector('[data-ride-years]');
  var bikeEl = form.querySelector('[data-ride-bike]');
  var fromEl = form.querySelector('[data-ride-from]');
  var toEl = form.querySelector('[data-ride-to]');
  var rangeEl = document.querySelector('[data-ride-range]');
  var colEl = document.querySelector('[data-ride-col]');
  var captionEl = document.querySelector('[data-ride-caption]');
  var emptyEl = document.querySelector('[data-ride-empty]');
  var logEl = document.querySelector('[data-ride-log]');
  var rowsEl = document.querySelector('[data-ride-rows]');
  var countEl = document.querySelector('[data-ride-count]');
  var moreEl = document.querySelector('[data-ride-more]');
  var sortButtons = document.querySelectorAll('[data-sort]');
  var heatEl = document.querySelector('[data-ride-heat]');
  var heatRows = document.querySelector('[data-heat-rows]');
  var heatCaption = document.querySelector('[data-heat-caption]');
  var heatReadout = document.querySelector('[data-heat-readout]');
  var heatButtons = document.querySelectorAll('[data-metric]');

  var PAGE = 15;
  var state = { sort: 'date', dir: -1, showAll: false, metric: 'miles' };

  // Bike names: the log uses "2023 Trek Domane SL 5 Gen 4", the page shows "Trek Domane SL 5 Gen 4".
  var bikeShort = {};
  var bikeSlug = {};
  Array.prototype.forEach.call(bikeEl.options, function (o) {
    if (!o.value) return;
    bikeShort[o.value] = o.dataset.short || o.value;
    bikeSlug[o.dataset.slug] = o.value;
  });
  // Bikes in the log that aren't listed in cycling.yml still get an option.
  rides.forEach(function (r) {
    if (r.bike && !(r.bike in bikeShort)) {
      bikeShort[r.bike] = r.bike;
      var o = new Option(r.bike, r.bike);
      o.dataset.slug = slugify(r.bike);
      bikeSlug[o.dataset.slug] = r.bike;
      bikeEl.add(o);
    }
  });

  // Year chips, newest first.
  var years = [];
  rides.forEach(function (r) {
    var y = r.date.slice(0, 4);
    if (years.indexOf(y) === -1) years.push(y);
  });
  years.sort().reverse();
  years.forEach(function (y) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.year = y;
    b.setAttribute('aria-pressed', 'false');
    b.textContent = y;
    yearsEl.appendChild(b);
  });
  var chips = yearsEl.querySelectorAll('[data-year]');

  var first = rides.reduce(function (m, r) { return r.date < m ? r.date : m; }, rides[0].date);
  var last = rides.reduce(function (m, r) { return r.date > m ? r.date : m; }, rides[0].date);
  [fromEl, toEl].forEach(function (el) { el.min = first; el.max = last; });

  // Helpers --------------------------------------------------------------
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function num(n, places) {
    return n.toLocaleString('en-US', { minimumFractionDigits: places || 0, maximumFractionDigits: places || 0 });
  }
  function plural(n, one, many) { return num(n) + ' ' + (n === 1 ? one : many); }
  function duration(sec) {
    var mins = Math.round(sec / 60);
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h ? plural(h, 'hour', 'hours') + ', ' + plural(m, 'minute', 'minutes') : plural(m, 'minute', 'minutes');
  }
  function clock(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    return h + ':' + (m < 10 ? '0' : '') + m;
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function niceDate(iso) {
    var p = iso.split('-');
    return MONTHS[+p[1] - 1] + ' ' + +p[2] + ', ' + p[0];
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  // Filtering ------------------------------------------------------------
  function current() {
    return { from: fromEl.value, to: toEl.value, bike: bikeEl.value };
  }

  function matches(r, f) {
    if (f.from && r.date < f.from) return false;
    if (f.to && r.date > f.to) return false;
    if (f.bike && r.bike !== f.bike) return false;
    return true;
  }

  function activeYear(f) {
    if (!f.from && !f.to) return 'all';
    var y = f.from.slice(0, 4);
    if (f.from === y + '-01-01' && f.to === y + '-12-31') return y;
    return null;
  }

  function label(f) {
    var y = activeYear(f);
    var when = y === 'all' ? 'All time' : y ? y
      : (f.from ? niceDate(f.from) : niceDate(first)) + ' to ' + (f.to ? niceDate(f.to) : niceDate(last));
    return f.bike ? when + ', ' + bikeShort[f.bike] : when;
  }

  // Rendering ------------------------------------------------------------
  function renderSummary(list, f) {
    if (!list.length) { summary.innerHTML = ''; return; }
    var miles = 0, elev = 0, secs = 0, longest = list[0], climb = list[0], perBike = {};
    list.forEach(function (r) {
      miles += r.miles; elev += r.elevation_ft; secs += r.seconds;
      if (r.miles > longest.miles) longest = r;
      if (r.elevation_ft > climb.elevation_ft) climb = r;
      var b = perBike[r.bike] || (perBike[r.bike] = { rides: 0, miles: 0 });
      b.rides++; b.miles += r.miles;
    });
    var rows = [
      ['Rides', num(list.length)],
      ['Distance', num(miles, 1) + ' miles'],
      ['Elevation gain', num(elev) + ' ft'],
      ['Time in the saddle', duration(secs)],
      ['Average ride', num(miles / list.length, 1) + ' miles'],
      ['Average speed', secs ? num(miles / (secs / 3600), 1) + ' mph' : 'n/a'],
      ['Longest ride', longest.miles.toFixed(2) + ' miles'],
      ['Most climbing in a ride', num(climb.elevation_ft) + ' ft']
    ];
    if (!f.bike) {
      Object.keys(perBike)
        .sort(function (a, b) { return perBike[b].rides - perBike[a].rides; })
        .forEach(function (k) {
          rows.push([bikeShort[k] || k || 'Unknown bike', plural(perBike[k].rides, 'ride', 'rides') + ', ' + num(perBike[k].miles, 1) + ' miles']);
        });
    }
    summary.innerHTML = rows.map(function (r) {
      return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>';
    }).join('');
  }

  function renderLog(list) {
    var key = state.sort, dir = state.dir;
    var sorted = list.slice().sort(function (a, b) {
      var x = a[key], y = b[key];
      if (key === 'bike') { x = bikeShort[x] || x; y = bikeShort[y] || y; }
      if (x < y) return -dir;
      if (x > y) return dir;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    var shown = state.showAll ? sorted : sorted.slice(0, PAGE);
    rowsEl.innerHTML = shown.map(function (r) {
      return '<tr>' +
        '<td class="ride-table__date">' + niceDate(r.date) + '</td>' +
        '<td>' + esc(r.name) + '</td>' +
        '<td class="num">' + r.miles.toFixed(2) + '</td>' +
        '<td class="num">' + clock(r.seconds) + '</td>' +
        '<td class="num">' + num(r.elevation_ft) + '</td>' +
        '<td>' + esc(bikeShort[r.bike] || r.bike) + '</td>' +
        '</tr>';
    }).join('');
    countEl.textContent = list.length > shown.length
      ? 'Showing ' + shown.length + ' of ' + plural(list.length, 'ride', 'rides')
      : plural(list.length, 'ride', 'rides');
    moreEl.hidden = list.length <= PAGE;
    moreEl.textContent = state.showAll ? 'Show fewer' : 'Show all ' + num(list.length);
    sortButtons.forEach(function (b) {
      var th = b.parentNode;
      if (b.dataset.sort === key) th.setAttribute('aria-sort', dir === 1 ? 'ascending' : 'descending');
      else th.removeAttribute('aria-sort');
    });
  }

  // Calendar heatmap: one square per month and weekday, summed across every
  // year in the filter, shaded in six steps from no rides up to cobalt.
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  var METRIC = {
    miles: { noun: 'Miles ridden', show: function (v) { return num(v, 1) + ' miles'; } },
    seconds: { noun: 'Time in the saddle', show: function (v) { return duration(v); } },
    elevation_ft: { noun: 'Climbing', show: function (v) { return num(v) + ' ft'; } }
  };
  var HEAT_HINT = 'Hover a square for the details.';
  function weekday(iso) {
    var p = iso.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]).getDay();
  }

  function renderHeat(list) {
    if (!heatEl) return;
    var key = state.metric, m = METRIC[key];
    var cells = [];
    for (var i = 0; i < 84; i++) cells.push({ value: 0, rides: 0 });
    list.forEach(function (r) {
      var c = cells[(+r.date.slice(5, 7) - 1) * 7 + weekday(r.date)];
      c.value += r[key] || 0;
      c.rides++;
    });
    var max = cells.reduce(function (n, c) { return Math.max(n, c.value); }, 0);
    var html = '';
    FULL_MONTHS.forEach(function (month, mi) {
      html += '<tr><th scope="row">' + MONTHS[mi] + '</th>';
      DAYS.forEach(function (day, di) {
        var c = cells[mi * 7 + di];
        var step = c.rides && max ? Math.max(1, Math.ceil(c.value / max * 5)) : 0;
        var text = c.rides ? m.show(c.value) + ' over ' + plural(c.rides, 'ride', 'rides') : 'No rides';
        var tip = day + 's in ' + month + ': ' + text;
        html += '<td><span class="heat-cell heat-' + step + '" title="' + esc(tip) + '" data-tip="' + esc(tip) + '">' +
          '<span class="visually-hidden">' + esc(text) + '</span></span></td>';
      });
      html += '</tr>';
    });
    heatRows.innerHTML = html;
    heatReadout.textContent = HEAT_HINT;
    if (heatCaption) heatCaption.textContent = m.noun + ' by month and day of the week: ' + label(current());
    heatButtons.forEach(function (b) {
      var on = b.dataset.metric === key;
      b.classList.toggle('chip--active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function render(pushUrl) {
    var f = current();
    var list = rides.filter(function (r) { return matches(r, f); });
    var y = activeYear(f);
    chips.forEach(function (c) {
      var on = c.dataset.year === y;
      c.classList.toggle('chip--active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var text = label(f);
    if (rangeEl) rangeEl.textContent = text === 'All time' ? 'All time on Strava' : text;
    if (colEl) colEl.textContent = text;
    if (captionEl) captionEl.textContent = 'Cycling stats from Strava: ' + text;
    renderSummary(list, f);
    emptyEl.hidden = list.length > 0;
    logEl.hidden = list.length === 0;
    if (heatEl) heatEl.hidden = list.length === 0;
    if (list.length) { renderLog(list); renderHeat(list); }
    if (pushUrl) writeUrl(f, y);
  }

  // URL state ------------------------------------------------------------
  function writeUrl(f, y) {
    var q = [];
    if (y && y !== 'all') q.push('year=' + y);
    else if (!y) {
      if (f.from) q.push('from=' + f.from);
      if (f.to) q.push('to=' + f.to);
    }
    if (f.bike) {
      var slug = Object.keys(bikeSlug).filter(function (s) { return bikeSlug[s] === f.bike; })[0];
      q.push('bike=' + encodeURIComponent(slug || f.bike));
    }
    var url = location.pathname + (q.length ? '?' + q.join('&') : '') + location.hash;
    try { history.replaceState(null, '', url); } catch (e) { /* file:// previews */ }
  }

  function readUrl() {
    var p = new URLSearchParams(location.search);
    var y = p.get('year');
    if (y && /^\d{4}$/.test(y)) { fromEl.value = y + '-01-01'; toEl.value = y + '-12-31'; }
    else {
      if (/^\d{4}-\d{2}-\d{2}$/.test(p.get('from') || '')) fromEl.value = p.get('from');
      if (/^\d{4}-\d{2}-\d{2}$/.test(p.get('to') || '')) toEl.value = p.get('to');
    }
    var bike = p.get('bike');
    if (bike && bikeSlug[bike]) bikeEl.value = bikeSlug[bike];
  }

  // Events ---------------------------------------------------------------
  yearsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-year]');
    if (!b) return;
    var y = b.dataset.year;
    fromEl.value = y === 'all' ? '' : y + '-01-01';
    toEl.value = y === 'all' ? '' : y + '-12-31';
    state.showAll = false;
    render(true);
  });
  [bikeEl, fromEl, toEl].forEach(function (el) {
    el.addEventListener('change', function () {
      if (fromEl.value && toEl.value && fromEl.value > toEl.value) {
        var t = fromEl.value; fromEl.value = toEl.value; toEl.value = t;
      }
      state.showAll = false;
      render(true);
    });
  });
  form.addEventListener('reset', function () {
    // Let the browser clear the fields first.
    setTimeout(function () { state.showAll = false; render(true); }, 0);
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  sortButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.dataset.sort;
      if (state.sort === key) state.dir = -state.dir;
      else { state.sort = key; state.dir = key === 'name' || key === 'bike' ? 1 : -1; }
      render(false);
    });
  });
  heatButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      state.metric = b.dataset.metric;
      var f = current();
      renderHeat(rides.filter(function (r) { return matches(r, f); }));
    });
  });
  if (heatRows) {
    heatRows.addEventListener('mouseover', function (e) {
      var c = e.target.closest('[data-tip]');
      if (c) heatReadout.textContent = c.dataset.tip;
    });
    heatRows.addEventListener('mouseleave', function () { heatReadout.textContent = HEAT_HINT; });
  }
  moreEl.addEventListener('click', function () {
    state.showAll = !state.showAll;
    render(false);
  });

  form.hidden = false;
  readUrl();
  render(false);
})();
