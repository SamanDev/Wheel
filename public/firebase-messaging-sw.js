importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCGTpxJqdzeBpgV2Uq8KniTQWLHb69DONM",
  authDomain: "loole-b974f.firebaseapp.com",
  projectId: "loole-b974f",
  storageBucket: "loole-b974f.appspot.com",
  messagingSenderId: "30488129618",
  appId: "1:30488129618:web:99f67dea2fe2823b332f8b",
};

const init = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging(init);

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";
const host = "http://localhost:3000";
self.addEventListener("install", function (event) {
  console.log("[ServiceWorker] Install");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log(
            "[Service Worker] Fetch failed; returning offline page instead.",
            error
          );

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
  if (
    event.request.mode.indexOf("cors333") > -1 &&
    event.request.url.indexOf("/static/jss/s") == -1 &&
    (event.request.url.indexOf(".webp") > -1 ||
      event.request.url.indexOf(".svg") > -1 ||
      event.request.url.indexOf(".js") > -1 ||
      event.request.url.indexOf(".css") > -1 ||
      event.request.url.indexOf(".png") > -1 ||
      event.request.url.indexOf(".woff") > -1 ||
      event.request.url.indexOf(".woff2") > -1 ||
      event.request.url.indexOf(".gif") > -1 ||
      event.request.url.indexOf(".json") > -1)
  ) {
    var _url = event.request.url.replace(host, "");

    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(_url);
          console.log(cachedResponse);
          if (cachedResponse) {
            return cachedResponse;
          } else {
            event.waitUntil(
              (async () => {
                const cache = await caches.open(CACHE_NAME);

                await cache.add(new Request(_url, { cache: "reload" }));
              })()
            );
            const networkResponse = await fetch(event.request);
            return networkResponse;
          }
        } catch (error) {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        }
      })()
    );
  }
});
