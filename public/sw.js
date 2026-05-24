const CACHE_V = 'laeyne-v1';
const STATIC_V = 'laeyne-static-v1';
const PRECACHE = ['/', '/admin', '/manifest.json', '/icons/icon-192x192.png', '/icons/icon-512x512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_V)
      .then(c => c.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_V && k !== STATIC_V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (!url.protocol.startsWith('http') || e.request.method !== 'GET') return;

  // _next/static → Cache First (hash no nome = nunca fica velho)
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => {
      if (r.ok) caches.open(STATIC_V).then(cache => cache.put(e.request, r.clone()));
      return r;
    })));
    return;
  }

  // Ícones e manifest → Cache First
  if (url.pathname.startsWith('/icons/') || url.pathname.startsWith('/splash/') || url.pathname === '/manifest.json') {
    e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
    return;
  }

  // Páginas HTML → Network First
  if (e.request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(e.request)
        .then(r => { if (r.ok) caches.open(CACHE_V).then(c => c.put(e.request, r.clone())); return r; })
        .catch(() => caches.match(e.request).then(c => c || caches.match('/admin')))
    );
    return;
  }

  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
