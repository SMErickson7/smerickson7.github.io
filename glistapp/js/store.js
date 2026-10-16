// Data layer. Everything lives under one path in the Realtime Database:
//
//   v2/aisles/<id> = { name, pos }
//   v2/items/<id>  = { name, aisle (aisle id or null), walk (place on your route), qty (usual quantity), uses }
//   v2/settings    = { learn: true/false }   (learn the route from check-off order)
//   v2/list/<id>   = { qty, done, t }       (keyed by item id)
//
// The live app's data at /test is only read once, to seed v2. It's never written,
// so the old app keeps working side by side.
//
// Open the app with ?local to use a throwaway copy in this browser instead of Firebase.

import { buildSeed, buildSeedFromTest } from "./catalog.js";

const ROOT = "v2";

const firebaseConfig = {
  apiKey: "AIzaSyD-WoETx4P8BPtfxuKIVvr38tp0x0z7fVM",
  authDomain: "grocerylist-e012f.firebaseapp.com",
  databaseURL: "https://grocerylist-e012f-default-rtdb.firebaseio.com",
  projectId: "grocerylist-e012f",
  storageBucket: "grocerylist-e012f.appspot.com",
  messagingSenderId: "320470919045",
  appId: "1:320470919045:web:8a94b3e93c0290c1b546ec"
};

function empty() {
  return { aisles: {}, items: {}, list: {} };
}

function normalize(v) {
  const s = v || {};
  return { aisles: s.aisles || {}, items: s.items || {}, list: s.list || {}, settings: s.settings || {}, meta: s.meta };
}

// Applies {"a/b/c": value} style changes to a plain object, like Firebase's update().
export function applyChanges(target, changes) {
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split("/");
    let node = target;
    for (let i = 0; i < keys.length - 1; i++) {
      if (node[keys[i]] == null || typeof node[keys[i]] !== "object") node[keys[i]] = {};
      node = node[keys[i]];
    }
    const last = keys[keys.length - 1];
    if (value === null) delete node[last];
    else node[last] = value;
  }
  return target;
}

export function getPath(obj, path) {
  return path.split("/").reduce((node, k) => (node == null ? undefined : node[k]), obj);
}

async function firebaseStore() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const db = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
  const app = initializeApp(firebaseConfig);
  const database = db.getDatabase(app);
  const rootRef = db.ref(database, ROOT);

  // Seed v2 the first time: from the live app's aisles, items and list at /test,
  // or, if that isn't there, from the built-in catalog plus the 2021 list at /gList.
  const first = await db.get(rootRef);
  if (!first.exists() || !first.val().items) {
    const test = (await db.get(db.ref(database, "test"))).val();
    if (test && test.Aisle) {
      await db.set(rootRef, buildSeedFromTest(test));
    } else {
      const oldVal = (await db.get(db.ref(database, "gList"))).val();
      const names = Array.isArray(oldVal) ? oldVal : oldVal ? Object.values(oldVal) : [];
      await db.set(rootRef, buildSeed(names));
    }
  }

  return {
    mode: "firebase",
    subscribe(cb) {
      db.onValue(rootRef, (snap) => cb(normalize(snap.val())));
    },
    onConnection(cb) {
      db.onValue(db.ref(database, ".info/connected"), (snap) => cb(snap.val() === true));
    },
    update(changes) {
      return db.update(rootRef, changes);
    }
  };
}

function localStore() {
  const KEY = "glist-v2-local";
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) { state = null; }
  if (!state || !state.items) state = buildSeed(["Bananas", "Lemons", "Salmon", "Eggs", "Cat food"]);
  const subs = [];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };
  save();
  return {
    mode: "local",
    subscribe(cb) { subs.push(cb); cb(normalize(structuredClone(state))); },
    onConnection(cb) { cb(true); },
    update(changes) {
      applyChanges(state, structuredClone(changes));
      save();
      subs.forEach((cb) => cb(normalize(structuredClone(state))));
      return Promise.resolve();
    }
  };
}

export async function createStore() {
  const local = new URLSearchParams(location.search).has("local");
  return local ? localStore() : firebaseStore();
}

export { empty };
