self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Pasa las peticiones de red directamente
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
