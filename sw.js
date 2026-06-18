/* Service Worker - auto-limpeza de cache */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then(clients => {
        clients.forEach(client => client.navigate(client.url));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // Sem cache — sempre busca da rede
  return;
});
