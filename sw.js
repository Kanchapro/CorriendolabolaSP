self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Modo pasivo para permitir conexión con Firebase
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
