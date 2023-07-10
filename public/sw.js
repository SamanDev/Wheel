const CACHE = "v3";
const ASSETS = [
  "./assets/style.css",
  "./assets/cadr3.png",
  "./assets/cadr4.png",
  "./game.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      return fetch(e.request).catch(async (_) => await caches.match(e.request));
    })()
  );
});
