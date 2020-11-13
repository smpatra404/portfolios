const staticCacheName = "portfolio-static-v1";
const assets = ["./",
    "./index.html",
    "./default.css",
    "./grid.css",
    "./index.js",
    "./images/download.jpg",
    "./images/dp.jpg",
    "./images/fb-icon.svg",
    "./images/insta-icon.svg",
    "./images/linkdin-icon.svg",
    "./images/icon.png",
    "https://fonts.googleapis.com/css2?family=Overpass&family=Source+Code+Pro:wght@900&display=swap",
    "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@900&display=swap"
];

// install event (Adding assets to cache)
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event (It deletes the old unused caches)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event (Responsible for offline Installability)
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});