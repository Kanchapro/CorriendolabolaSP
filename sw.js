const CACHE_NAME = 'falta-uno-sp-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Escuchar notificaciones Push
self.addEventListener('push', (event) => {
  let data = { title: "Falta Uno SP ⚽", body: "¡Hay una nueva convocatoria en la ciudad!" };
  
  if (event.data) {
    try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
  }

  const options = {
    body: data.body,
    icon: 'https://raw.githubusercontent.com/Kanchapro/CorriendolabolaSP/refs/heads/main/file_0000000062d4820e83c4713b40a6b2a5.png',
    badge: 'https://raw.githubusercontent.com/Kanchapro/CorriendolabolaSP/refs/heads/main/file_0000000062d4820e83c4713b40a6b2a5.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/CorriendolabolaSP/')
  );
});
