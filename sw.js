/**
 * Service Worker para cache e performance
 * Versão: 1.0.0
 */

const CACHE_NAME = 'ascendria-v1.0.0';
const RUNTIME_CACHE = 'ascendria-runtime-v1';

// Assets para cache imediato
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/component-loader.js',
  '/js/spa-router.js',
  '/js/asset-preloader.js',
  '/components/topbar/topbar.css',
  '/components/topbar/topbar.js',
  '/components/footer/footer.css',
  '/components/backgroundlive/backgroundlive.css',
  '/components/backgroundlive/backgroundlive.js',
  '/assets/images/ui/favicon.webp',
  '/assets/images/ui/logoascendria.webp'
];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Adicionar assets um por um para evitar erros
        const promises = PRECACHE_ASSETS.map(url => {
          try {
            return cache.add(new Request(url, { cache: 'reload' })).catch(() => {
              // Ignorar erros individuais de cache
              return Promise.resolve();
            });
          } catch (e) {
            return Promise.resolve();
          }
        });
        return Promise.all(promises);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        // Falha silenciosa - não bloquear instalação
        try {
          console.error('SW install error:', err);
        } catch (e) {
          // Ignorar se console não estiver disponível
        }
      })
  );
});

// Ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
    .then(() => self.clients.claim())
  );
});

// Estratégia: Cache First com fallback para network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar requisições externas (exceto mesmo domínio e CDNs permitidos)
  if (url.origin !== location.origin && 
      !url.href.startsWith('https://cdn.jsdelivr.net') && 
      !url.href.startsWith('https://cdnjs.cloudflare.com')) {
    return;
  }

  // Estratégia para imagens: Cache First
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          }).catch(() => {
            // Fallback para imagens quebradas
            return new Response('', { status: 404 });
          });
        })
    );
    return;
  }

  // Estratégia para CSS/JS: Network First com cache fallback
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response('', { status: 404 });
          });
        })
    );
    return;
  }

  // Estratégia padrão: Cache First
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
      .catch(() => {
        return new Response('Offline', { status: 503 });
      })
  );
});

