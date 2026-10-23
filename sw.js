/* Leave Ledger service worker — bump VERSION on every deploy */
const VERSION = 'leave-ledger-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* GitHub Pages lets HTML sit in the browser cache for ten minutes, which
     is long enough to hand back yesterday's app after a deploy. Fetch the
     page and the code past that cache; images and fonts can use it. */
  const fresh = req.mode === 'navigate' ||
    url.pathname.endsWith('/') ||
    /\.(?:html|js|json)$/.test(url.pathname);

  const hit = fresh
    ? fetch(url.href, { cache: 'reload', credentials: 'same-origin' })
    : fetch(req);

  e.respondWith(
    hit
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
