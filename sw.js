/* Service Worker - Gestão de Equipe
   Mantém o "shell" do app em cache para abrir rápido e funcionar
   como aplicativo instalado. Dados do Firebase NUNCA são cacheados
   aqui (o próprio SDK do Firestore já cuida do cache/offline deles),
   então a sincronização em tempo real com o computador continua igual. */

const CACHE_VERSION = 'ge-v1';
const SHELL_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Nunca interceptar chamadas ao Firebase/Firestore/Google APIs -
  // precisam sempre ir direto à rede para manter o tempo real.
  if (
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    return;
  }

  // Para o shell do app (mesma origem): tenta rede primeiro (pega
  // atualizações novas), e cai para o cache se estiver offline.
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((res) => res || caches.match('/index.html')))
    );
    return;
  }

  // Outros recursos externos (CDN de gráficos/PDF): rede com fallback ao cache.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
