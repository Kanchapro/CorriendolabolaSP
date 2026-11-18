self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Escuchar notificaciones Push enviadas al celular
self.addEventListener('push', (event) => {
  let data = { title: "Falta Uno SP ⚽", body: "¡Hay una nueva convocatoria en la ciudad!" };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'https://raw.githubusercontent.com/Kanchapro/CorriendolabolaSP/refs/heads/main/file_000000004f34820e8ec7d013ff84aecc.png',
    badge: 'https://raw.githubusercontent.com/Kanchapro/CorriendolabolaSP/refs/heads/main/file_000000004f34820e8ec7d013ff84aecc.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Acción al hacer clic sobre la notificación en el celu
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/CorriendolabolaSP/')
  );
});
