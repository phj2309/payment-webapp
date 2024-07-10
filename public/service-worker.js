self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-app-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/css/main.chunk.css",
        "/static/media/logo.5d5d9eef.svg",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
