const CACHE_NAME = 'go-fonts-v2';
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
  const isFont = req.destination === 'font' || /\.(?:woff2?|ttf|otf|eot)$/i.test(url.pathname);
  if (isFont) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        }).catch(() => cached);
      })
    );
  }
});


