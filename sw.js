const CACHE_NAME = 'go-fonts-v1';
const FONT_URLS = [
  '/assets/fonts/LXGWBright-Light.woff2',
  '/assets/fonts/LXGWBright-LightItalic.woff2',
  '/assets/fonts/LXGWBright-Regular.woff2',
  '/assets/fonts/LXGWBright-Italic.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FONT_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.pathname.startsWith('/assets/fonts/')) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }))
    );
  }
});


