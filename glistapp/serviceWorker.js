// Network first, cache as a fallback, so a new version shows up on the next
// load instead of the phone holding on to an old copy. Old caches are removed.
const CACHE = "grocery-list-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./css/app.css",
  "./js/app.js",
  "./js/store.js",
  "./js/catalog.js",
  "./js/changelog.js",
  "./js/barcode.js",
  "./manifest.json",
  "./images/icons/icon.svg",
  "./images/icons/icon-192x192.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map((a) => new Request(a, { cache: "no-cache" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Only handle this site's own files. Firebase and fonts go straight to the network.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith(
    // "no-cache" makes the browser check with the site every time (a quick
    // "has this changed?" request) instead of reusing a copy for up to 10 minutes.
    fetch(req, { cache: "no-cache" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
  );
});
