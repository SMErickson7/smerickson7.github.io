import { createStore, getPath } from "./store.js";
import { RELEASES, VERSION } from "./changelog.js";

// ---------- tiny DOM helper ----------
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "icon") el.insertAdjacentHTML("beforeend", ICONS[v]);
    else if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "value") el.value = v;
    else if (k === "checked") el.checked = !!v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}
const $ = (id) => document.getElementById(id);

const ICONS = {
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L19 7"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  up: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>',
  down: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  pencil: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  move: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l-3 3 3 3M19 9l3 3-3 3M2 12h20"/></svg>'
};

// How the route learns: while shopping, if you check off an item that the list
// had *before* the item you checked just before it, the item moves to sit right
// after that one. Checks more than TRIP_GAP apart count as separate trips.
const TRIP_GAP = 30 * 60 * 1000;

// ---------- state ----------
let store;
let S = { aisles: {}, items: {}, list: {}, settings: {} };
const ui = {
  query: "",
  tab: null,
  open: null,
  filter: "",
  expanded: new Set(),
  editing: null,
  fresh: new Set()
};
const undoStack = [];
let toastTimer;
let migrated = false;

// ---------- the route ----------
// Every item has a `walk` number. Lower = earlier in your walk through the store.
// The list, the aisle tabs and the saved page all follow this one order.
function route() {
  return Object.keys(S.items).sort((a, b) =>
    (S.items[a].walk ?? 1e12) - (S.items[b].walk ?? 1e12) ||
    S.items[a].name.localeCompare(S.items[b].name));
}
function walkOf(id) { return S.items[id] ? S.items[id].walk ?? 1e12 : 1e12; }

// Writes walk = 10, 20, 30... for a new order, only for items whose number changes.
function renumber(order, changes = {}) {
  order.forEach((id, i) => {
    const w = (i + 1) * 10;
    if (walkOf(id) !== w) changes[`items/${id}/walk`] = w;
  });
  return changes;
}
function moveAfter(order, id, afterId) {
  const next = order.filter((x) => x !== id);
  const at = afterId == null ? -1 : next.indexOf(afterId);
  next.splice(at + 1, 0, id);
  return next;
}

// One-time: give every item a walk number from the aisle order the app started with.
function migrateWalks() {
  if (migrated) return;
  const missing = Object.values(S.items).some((it) => it.walk == null);
  if (!missing) { migrated = true; return; }
  migrated = true;
  const aislePos = (a) => (a && S.aisles[a] ? S.aisles[a].pos ?? 0 : 9999);
  const order = Object.keys(S.items).sort((a, b) => {
    const A = S.items[a], B = S.items[b];
    return aislePos(A.aisle) - aislePos(B.aisle) || (A.pos ?? 0) - (B.pos ?? 0);
  });
  const changes = {};
  order.forEach((id, i) => { changes[`items/${id}/walk`] = (i + 1) * 10; });
  store.update(changes);
}

// ---------- derived data ----------
function aisleOrder() {
  // Aisles in the order you first reach them on your route; empty aisles last.
  const first = {};
  route().forEach((id, i) => {
    const a = S.items[id].aisle;
    if (a && S.aisles[a] && !(a in first)) first[a] = i;
  });
  return Object.entries(S.aisles)
    .map(([id, a]) => ({ id, name: a.name, pos: a.pos ?? 0 }))
    .sort((a, b) => (first[a.id] ?? 1e9) - (first[b.id] ?? 1e9) || a.pos - b.pos);
}
function itemsIn(aisleId) {
  return route().filter((id) => (S.items[id].aisle || null) === aisleId).map((id) => ({ id, ...S.items[id] }));
}
function aisleName(item) {
  const a = item && item.aisle && S.aisles[item.aisle];
  return a ? a.name : "Not placed yet";
}
function listIds(done) {
  return route().filter((id) => S.list[id] && !!S.list[id].done === done);
}
function newId(prefix) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
// Splits an ordered list of item ids into stops: runs of the same aisle in a row.
function stops(ids) {
  const out = [];
  const seen = {};
  for (const id of ids) {
    const it = S.items[id];
    const key = it.aisle && S.aisles[it.aisle] ? it.aisle : "_none";
    let s = out[out.length - 1];
    if (!s || s.key !== key) {
      seen[key] = (seen[key] || 0) + 1;
      s = { key, name: aisleName(it), visit: seen[key], ids: [] };
      out.push(s);
    }
    s.ids.push(id);
  }
  return out;
}
function stopLabel(s) {
  if (s.visit === 1) return s.name;
  return s.visit === 2 ? `${s.name}, again` : `${s.name}, trip ${s.visit}`;
}

function parseQuery(text) {
  const t = text.trim();
  const m = t.match(/^(\d{1,3})\s*x?\s+(.+)$/i);
  if (m) return { qty: Math.max(1, parseInt(m[1], 10)), term: m[2].trim(), explicit: true };
  return { qty: 1, term: t, explicit: false };
}
function search(term) {
  const t = term.toLowerCase();
  if (!t) return [];
  const stem = t.length > 3 ? t.replace(/(es|s)$/, "") : t;
  const scored = [];
  for (const [id, it] of Object.entries(S.items)) {
    const n = it.name.toLowerCase();
    let score = -1;
    if (n === t) score = 0;
    else if (n.startsWith(t)) score = 1;
    else if (n.split(/\s+/).some((w) => w.startsWith(t))) score = 2;
    else if (n.includes(t)) score = 3;
    else if (n.includes(stem)) score = 4;
    if (score >= 0) scored.push({ id, score, name: it.name });
  }
  scored.sort((a, b) => a.score - b.score || a.name.length - b.name.length);
  return scored.slice(0, 8).map((s) => s.id);
}
function exactMatch(term) {
  const t = term.toLowerCase();
  return Object.keys(S.items).find((id) => S.items[id].name.toLowerCase() === t);
}

// ---------- changes, with undo ----------
function mutate(changes, message) {
  const old = {};
  for (const path of Object.keys(changes)) {
    const v = getPath(S, path);
    old[path] = v === undefined ? null : structuredClone(v);
  }
  undoStack.push({ old, message });
  if (undoStack.length > 50) undoStack.shift();
  store.update(changes).catch((e) => showToast("Couldn't save: " + e.message, false));
  showToast(message, true);
}
function undo() {
  const last = undoStack.pop();
  if (!last) return;
  store.update(last.old);
  showToast("Undid: " + last.message, false);
}
function showToast(text, canUndo) {
  $("toast-text").textContent = text;
  $("undo").hidden = !canUndo;
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $("toast").hidden = true; }, canUndo ? 7000 : 2500);
}

// ---------- list actions ----------
function addToList(id, qty, explicit) {
  const it = S.items[id];
  const on = S.list[id];
  const changes = {};
  let msg;
  if (on && !on.done) {
    const q = explicit ? qty : (on.qty || 1) + 1;
    changes[`list/${id}/qty`] = q;
    msg = `${it.name} now ×${q}`;
  } else {
    const q = explicit ? qty : it.qty || 1;
    changes[`list/${id}`] = { qty: q, done: false, t: Date.now() };
    changes[`items/${id}/uses`] = (it.uses || 0) + 1;
    msg = `Added ${it.name}` + (q > 1 ? ` ×${q}` : "");
  }
  mutate(changes, msg);
}
function setQty(id, q) {
  mutate({ [`list/${id}/qty`]: q }, `${S.items[id].name} ×${q}`);
}
function lastChecked(exceptId) {
  const now = Date.now();
  let best = null;
  for (const [id, e] of Object.entries(S.list)) {
    if (id === exceptId || !e.done || !e.doneAt || !S.items[id]) continue;
    if (now - e.doneAt > TRIP_GAP) continue;
    if (!best || e.doneAt > S.list[best].doneAt) best = id;
  }
  return best;
}
function checkOff(id) {
  const name = S.items[id].name;
  const changes = { [`list/${id}/done`]: true, [`list/${id}/doneAt`]: Date.now() };
  let msg = "Checked off " + name;
  const prev = S.settings.learn === false ? null : lastChecked(id);
  if (prev && walkOf(id) < walkOf(prev)) {
    // Put it after the end of the stop you just came from, so that aisle stays
    // in one piece. If you really do split an aisle, later check-offs will show it.
    const order = route();
    const stop = stops(order).find((s) => s.ids.includes(prev));
    const sameStop = stop && stop.ids.includes(id);
    const after = stop && !sameStop ? stop.ids[stop.ids.length - 1] : prev;
    renumber(moveAfter(order, id, after), changes);
    msg = `Checked off ${name}. Route updated: it now comes after ` +
      (stop && !sameStop ? `the ${stop.name} stop` : S.items[prev].name);
  }
  mutate(changes, msg);
}
function uncheck(id) {
  mutate({ [`list/${id}/done`]: false, [`list/${id}/doneAt`]: null }, "Back on the list: " + S.items[id].name);
}
function removeFromList(id) {
  if (ui.open === id) ui.open = null;
  mutate({ [`list/${id}`]: null }, "Removed " + S.items[id].name);
}
function createItem(term, qty) {
  const name = term.charAt(0).toUpperCase() + term.slice(1);
  const id = newId("x");
  const maxWalk = Math.max(0, ...Object.keys(S.items).map(walkOf).filter((w) => w < 1e12));
  ui.fresh.add(id);
  mutate({
    [`items/${id}`]: { name, aisle: null, pos: 0, walk: maxWalk + 10, qty: 1, uses: 1 },
    [`list/${id}`]: { qty, done: false, t: Date.now() }
  }, `Saved ${name} and added it`);
  openPicker(id, true);
}
// Puts an item in an aisle, right after the last item of that aisle on the route.
function placeItem(id, aisleId) {
  const it = S.items[id];
  if (!it || it.aisle === aisleId) return;
  const order = route();
  const inAisle = order.filter((x) => x !== id && S.items[x].aisle === aisleId);
  const changes = { [`items/${id}/aisle`]: aisleId };
  renumber(moveAfter(order, id, inAisle.length ? inAisle[inAisle.length - 1] : null), changes);
  mutate(changes, `${it.name} is now in ${S.aisles[aisleId].name}`);
}

function clearQuery() {
  ui.query = "";
  $("q").value = "";
  render();
}
function submitQuery() {
  const p = parseQuery(ui.query);
  if (!p.term) return;
  const exact = exactMatch(p.term);
  const found = exact || search(p.term)[0];
  if (found) addToList(found, p.qty, p.explicit);
  else createItem(p.term, p.qty);
  clearQuery();
}

// ---------- aisle picker ----------
function openPicker(itemId, isNew) {
  const it = S.items[itemId] || { name: "" };
  $("picker-title").textContent = isNew ? `${it.name} saved` : `Move ${it.name}`;
  $("picker-text").textContent = isNew
    ? "It's on your list now. Which aisle is it in? It goes after the last thing you get there."
    : "Pick the aisle it's in now. It goes after the last thing you get there.";
  $("picker-aisles").replaceChildren(...aisleOrder().map((a) => h("button", {
    type: "button",
    class: it.aisle === a.id ? "current" : null,
    text: a.name,
    onClick: () => { $("picker").close(); placeItem(itemId, a.id); }
  })));
  $("picker").showModal();
}

// ---------- render ----------
function render() {
  const route = location.hash.startsWith("#/saved") ? "saved" : "list";
  $("view-list").hidden = route !== "list";
  $("view-saved").hidden = route !== "saved";
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.dataset.route === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (route === "list") renderList();
  else renderSaved();
}

function renderList() {
  const p = parseQuery(ui.query);
  const searching = !!p.term;
  $("view-list").classList.toggle("searching", searching);
  $("search-box").classList.toggle("active", searching);
  $("clear-q").hidden = !ui.query;
  $("qty-chip").hidden = !p.explicit;
  $("qty-chip").textContent = "×" + p.qty;

  const results = $("results");
  results.hidden = !searching;
  if (searching) {
    const ids = search(p.term);
    const exact = exactMatch(p.term);
    const rows = ids.map((id, i) => {
      const it = S.items[id];
      const on = S.list[id] && !S.list[id].done ? S.list[id] : null;
      const action = on ? (p.explicit ? `Set ×${p.qty}` : "+1") : (p.explicit && p.qty > 1 ? `Add ×${p.qty}` : "Add");
      return h("button", {
        type: "button", class: "result" + (i === 0 ? " top" : ""),
        onClick: () => { addToList(id, p.qty, p.explicit); clearQuery(); $("q").focus(); }
      },
        h("span", { class: "label" }, h("b", { text: it.name }), h("small", { text: aisleName(it) })),
        on ? h("span", { class: "status", text: `On list ×${on.qty || 1}` }) : null,
        h("span", { class: "go", text: action })
      );
    });
    if (!exact) {
      rows.push(h("button", {
        type: "button", class: "result new" + (ids.length ? "" : " only"),
        onClick: () => { createItem(p.term, p.qty); clearQuery(); }
      },
        h("span", { class: "plus-dot", icon: "plus" }),
        h("span", { class: "label" },
          h("b", { text: `Add "${p.term}"` + (p.qty > 1 ? ` ×${p.qty}` : "") + " as a new item" }),
          h("small", { text: "You'll pick its aisle next" }))
      ));
    }
    results.replaceChildren(...rows);
  }

  renderBrowse();
  renderTrip();
}

function renderBrowse() {
  const aisles = aisleOrder();
  const usuals = Object.entries(S.items)
    .filter(([, it]) => (it.uses || 0) > 0)
    .sort((a, b) => (b[1].uses || 0) - (a[1].uses || 0) || (a[1].walk ?? 0) - (b[1].walk ?? 0))
    .slice(0, 24)
    .map(([id]) => id);
  if (ui.tab == null) ui.tab = usuals.length ? "usuals" : aisles[0] && aisles[0].id;
  if (ui.tab !== "usuals" && !S.aisles[ui.tab]) ui.tab = "usuals";

  const tabs = [{ id: "usuals", name: "Usuals" }].concat(aisles);
  $("aisle-tabs").replaceChildren(...tabs.map((t) => h("button", {
    type: "button", role: "tab", "aria-selected": String(ui.tab === t.id), text: t.name,
    onClick: () => { ui.tab = t.id; renderBrowse(); }
  })));

  let ids;
  if (ui.tab === "usuals") {
    $("browse-title").textContent = "Your usuals";
    ids = usuals;
  } else {
    $("browse-title").textContent = S.aisles[ui.tab].name;
    ids = itemsIn(ui.tab).map((i) => i.id);
  }
  const chips = ids.map((id) => {
    const it = S.items[id];
    const on = S.list[id] && !S.list[id].done ? S.list[id] : null;
    return h("button", {
      type: "button", class: on ? "on" : null,
      text: on ? `${it.name} ×${on.qty || 1}` : `+ ${it.name}`,
      onClick: () => addToList(id, 1, false)
    });
  });
  if (!chips.length) {
    chips.push(h("p", { class: "empty-note", text: ui.tab === "usuals"
      ? "Items you add often will show up here. Pick an aisle above to browse."
      : "Nothing saved in this aisle yet." }));
  }
  $("chips").replaceChildren(...chips);
}

function renderTrip() {
  const toGet = listIds(false);
  const inCart = listIds(true);
  $("count").textContent = `${toGet.length} to get`;

  $("groups").replaceChildren(...stops(toGet).map((s) => h("section", {},
    h("div", { class: "aisle-head" + (s.key === "_none" ? " unplaced" : "") + (s.visit > 1 ? " again" : "") },
      h("h3", { text: stopLabel(s) }), h("span", { text: s.ids.length })),
    ...s.ids.map((id) => tripRow(id))
  )));

  $("all-done").hidden = toGet.length > 0;
  $("cart").hidden = inCart.length === 0;
  $("cart-title").textContent = `In the cart · ${inCart.length}`;
  $("cart-rows").replaceChildren(...inCart.map((id) => tripRow(id)));
}

function tripRow(id) {
  const it = S.items[id];
  const entry = S.list[id];
  const qty = entry.qty || 1;
  const done = !!entry.done;
  const open = ui.open === id && !done;
  return h("div", { class: "row" + (done ? " done" : "") + (open ? " open" : "") },
    h("button", {
      type: "button", class: "check",
      "aria-label": done ? `Put ${it.name} back on the list` : `Check off ${it.name}`,
      onClick: () => { if (ui.open === id) ui.open = null; if (done) uncheck(id); else checkOff(id); }
    }, h("span", { icon: done ? "check" : null })),
    h("button", {
      type: "button", class: "name", "aria-expanded": done ? null : String(open),
      onClick: () => { if (done) return; ui.open = open ? null : id; renderTrip(); }
    },
      it.name + (done && qty > 1 ? ` ×${qty}` : ""),
      ui.fresh.has(id) && !done ? h("span", { class: "new-tag", text: "New" }) : null),
    !done && qty > 1 ? h("span", { class: "qty-badge", text: "×" + qty }) : null,
    done ? null : h("div", { class: "row-tools" },
      h("div", { class: "stepper" },
        h("button", { type: "button", "aria-label": `Fewer ${it.name}`, disabled: qty <= 1, text: "−", onClick: () => setQty(id, qty - 1) }),
        h("output", { text: qty }),
        h("button", { type: "button", "aria-label": `More ${it.name}`, text: "+", onClick: () => setQty(id, qty + 1) })),
      h("button", { type: "button", class: "tool", title: "Move to another aisle", "aria-label": `Move ${it.name} to another aisle`, onClick: () => openPicker(id, false) },
        h("span", { icon: "move" }), h("span", { class: "label", text: "Aisle" })),
      h("button", { type: "button", class: "tool danger", title: "Remove from list", "aria-label": `Remove ${it.name}`, onClick: () => removeFromList(id) },
        h("span", { icon: "x" }), h("span", { class: "label", text: "Remove" }))
    )
  );
}

// ---------- saved page: your route ----------
function aisleSelect(id) {
  const item = S.items[id];
  const sel = h("select", { class: "aisle-select", "aria-label": `Aisle for ${item.name}` },
    item.aisle ? null : h("option", { value: "", text: "Pick aisle", selected: true }),
    ...aisleOrder().map((a) => h("option", { value: a.id, text: a.name, selected: item.aisle === a.id ? true : null })));
  sel.addEventListener("change", () => { if (sel.value) placeItem(id, sel.value); });
  return sel;
}

function editInput(current, save) {
  const input = h("input", { class: "inline-edit", value: current, "aria-label": "New name" });
  let finished = false;
  const finish = (keep) => {
    if (finished) return;
    finished = true;
    ui.editing = null;
    const v = input.value.trim();
    if (keep && v && v !== current) save(v);
    else render();
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finish(true);
    if (e.key === "Escape") finish(false);
  });
  input.addEventListener("blur", () => finish(true));
  requestAnimationFrame(() => { input.focus(); input.select(); });
  return input;
}

function itemRow(id, order, canMove) {
  const item = S.items[id];
  const at = order.indexOf(id);
  const editing = ui.editing === "item:" + id;
  const qtyInput = h("input", { type: "number", min: "1", max: "99", value: item.qty || 1, "aria-label": `Usual quantity for ${item.name}` });
  qtyInput.addEventListener("change", () => {
    const q = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
    if (q !== (item.qty || 1)) mutate({ [`items/${id}/qty`]: q }, `${item.name}: usual quantity ${q}`);
  });
  const shift = (d) => {
    const next = order.slice();
    [next[at], next[at + d]] = [next[at + d], next[at]];
    mutate(renumber(next), `Moved ${item.name} ${d < 0 ? "earlier" : "later"}`);
  };
  return h("div", { class: "item-row" },
    editing
      ? editInput(item.name, (v) => mutate({ [`items/${id}/name`]: v }, `Renamed to ${v}`))
      : h("span", { class: "iname", text: item.name }),
    h("label", {}, "Usual", qtyInput),
    aisleSelect(id),
    h("button", { type: "button", class: "mini", icon: "up", "aria-label": `Move ${item.name} earlier`, disabled: !canMove || at <= 0, onClick: () => shift(-1) }),
    h("button", { type: "button", class: "mini", icon: "down", "aria-label": `Move ${item.name} later`, disabled: !canMove || at >= order.length - 1, onClick: () => shift(1) }),
    h("button", { type: "button", class: "mini", icon: "pencil", "aria-label": `Rename ${item.name}`,
      onClick: () => { ui.editing = "item:" + id; renderSaved(); } }),
    h("button", { type: "button", class: "mini", icon: "trash", "aria-label": `Delete ${item.name}`,
      onClick: () => mutate({ [`items/${id}`]: null, [`list/${id}`]: null }, `Deleted ${item.name}`) })
  );
}

function renderSaved() {
  const f = ui.filter.trim().toLowerCase();
  const order = route();
  const all = stops(order);
  const cards = [];

  $("learn").checked = S.settings.learn !== false;

  all.forEach((s, si) => {
    const shown = f ? s.ids.filter((id) => S.items[id].name.toLowerCase().includes(f)) : s.ids;
    if (!shown.length) return;
    const key = s.key + ":" + s.ids[0];
    const expanded = f ? true : ui.expanded.has(key);
    const moveStop = (d) => {
      const blocks = all.map((b) => b.ids);
      [blocks[si], blocks[si + d]] = [blocks[si + d], blocks[si]];
      mutate(renumber(blocks.flat()), `Moved the ${stopLabel(s)} stop ${d < 0 ? "earlier" : "later"}`);
    };
    const toggle = () => { if (expanded) ui.expanded.delete(key); else ui.expanded.add(key); renderSaved(); };
    cards.push(h("div", { class: "aisle-card" + (expanded ? " expanded" : "") + (s.key === "_none" ? " unplaced" : "") },
      h("div", { class: "aisle-bar" },
        h("span", { class: "num", text: String(si + 1).padStart(2, "0") }),
        h("button", { type: "button", class: "title", "aria-expanded": String(expanded), text: stopLabel(s), onClick: toggle }),
        h("span", { class: "count", text: `${s.ids.length} ${s.ids.length === 1 ? "item" : "items"}` }),
        h("button", { type: "button", class: "mini", icon: "up", "aria-label": `Move the ${stopLabel(s)} stop earlier`, disabled: si === 0 || !!f, onClick: () => moveStop(-1) }),
        h("button", { type: "button", class: "mini", icon: "down", "aria-label": `Move the ${stopLabel(s)} stop later`, disabled: si === all.length - 1 || !!f, onClick: () => moveStop(1) })
      ),
      expanded ? shown.map((id) => itemRow(id, order, !f)) : null
    ));
  });
  if (!cards.length) cards.push(h("p", { class: "empty-note", text: "Nothing matches that filter." }));
  $("saved-list").replaceChildren(...cards);

  // Aisle names (rename, delete, add)
  $("aisle-admin").replaceChildren(...aisleOrder().map((a) => {
    const count = Object.values(S.items).filter((it) => it.aisle === a.id).length;
    const editing = ui.editing === "aisle:" + a.id;
    return h("div", { class: "aisle-admin-row" },
      editing
        ? editInput(a.name, (v) => mutate({ [`aisles/${a.id}/name`]: v }, `Renamed aisle to ${v}`))
        : h("span", { class: "iname", text: a.name }),
      h("span", { class: "count", text: count }),
      h("button", { type: "button", class: "mini", icon: "pencil", "aria-label": `Rename ${a.name} aisle`,
        onClick: () => { ui.editing = "aisle:" + a.id; renderSaved(); } }),
      h("button", { type: "button", class: "mini", icon: "trash", "aria-label": `Delete ${a.name} aisle`,
        onClick: () => {
          const changes = { [`aisles/${a.id}`]: null };
          Object.entries(S.items).forEach(([id, it]) => { if (it.aisle === a.id) changes[`items/${id}/aisle`] = null; });
          mutate(changes, `Deleted ${a.name} aisle` + (count ? `; ${count} items need a new aisle` : ""));
        } })
    );
  }));
}

// ---------- patch notes ----------
const SEEN_KEY = "glist-seen-version";
function seenVersion() {
  try { return localStorage.getItem(SEEN_KEY); } catch (e) { return VERSION; }
}
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function setupNotes() {
  $("app-version").textContent = "v" + VERSION;
  $("new-dot").hidden = seenVersion() === VERSION;
  $("notes-body").replaceChildren(...RELEASES.map((r, i) => h("section", { class: "release" + (i === 0 ? " latest" : "") },
    h("div", { class: "release-head" },
      h("span", { class: "ver", text: "v" + r.version }),
      h("h3", { text: r.title }),
      h("time", { datetime: r.date, text: formatDate(r.date) })),
    h("ul", {}, ...r.notes.map((n) => h("li", { text: n })))
  )));
  $("open-notes").addEventListener("click", () => {
    $("notes").showModal();
    $("notes-body").scrollTop = 0;
    try { localStorage.setItem(SEEN_KEY, VERSION); } catch (e) { /* ignore */ }
    $("new-dot").hidden = true;
  });
  $("close-notes").addEventListener("click", () => $("notes").close());
  $("notes").addEventListener("click", (e) => { if (e.target === $("notes")) $("notes").close(); });
}

// ---------- wire up ----------
function bind() {
  setupNotes();
  const q = $("q");
  q.addEventListener("input", () => { ui.query = q.value; renderList(); });
  q.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); submitQuery(); }
    if (e.key === "Escape") clearQuery();
  });
  $("clear-q").addEventListener("click", () => { clearQuery(); q.focus(); });
  $("undo").addEventListener("click", undo);
  $("clear-cart").addEventListener("click", () => {
    const changes = {};
    listIds(true).forEach((id) => { changes[`list/${id}`] = null; });
    if (Object.keys(changes).length) mutate(changes, `Cleared ${Object.keys(changes).length} from the cart`);
  });
  $("clear-list").addEventListener("click", () => {
    if (Object.keys(S.list).length) mutate({ list: null }, "Cleared the list");
  });
  $("filter").addEventListener("input", (e) => { ui.filter = e.target.value; renderSaved(); });
  $("learn").addEventListener("change", (e) => {
    mutate({ "settings/learn": e.target.checked }, e.target.checked ? "Route learning on" : "Route learning off");
  });
  $("new-aisle").addEventListener("click", () => {
    const id = newId("a");
    const pos = Math.max(-1, ...Object.values(S.aisles).map((a) => a.pos ?? 0)) + 1;
    ui.editing = "aisle:" + id;
    mutate({ [`aisles/${id}`]: { name: "New aisle", pos } }, "Added an aisle");
  });
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey && !typing) {
      e.preventDefault();
      undo();
    }
  });
  window.addEventListener("hashchange", render);
}

async function start() {
  bind();
  try {
    store = await createStore();
  } catch (e) {
    $("sync").textContent = "Can't reach the database";
    showToast("Couldn't connect: " + e.message, false);
    return;
  }
  store.onConnection((online) => {
    const el = $("sync");
    el.classList.toggle("off", !online);
    el.textContent = store.mode === "local" ? "Test copy (this browser only)" : online ? "Synced" : "Offline, will sync";
  });
  store.subscribe((state) => {
    S = state;
    migrateWalks();
    if (ui.open && !S.list[ui.open]) ui.open = null;
    render();
  });
}

start();

if ("serviceWorker" in navigator && !new URLSearchParams(location.search).has("local")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("serviceWorker.js").catch(() => {}));
}
