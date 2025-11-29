// public/sw.js - Service Worker completo
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `ecommerce-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Recursos para cache imediato
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching app shell');
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Estratégias de cache
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Fetch failed:', error);
    return caches.match('/offline');
  }
};

const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match('/offline');
  }
};

const staleWhileRevalidate = async (request) => {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(RUNTIME_CACHE);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
};

const cacheImages = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response(
      '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Sem imagem</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
};

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-HTTP
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Ignorar requisições da API de admin
  if (url.pathname.startsWith('/admin')) {
    return;
  }
  
  // Estratégia para imagens
  if (request.destination === 'image') {
    event.respondWith(cacheImages(request));
    return;
  }
  
  // Estratégia para API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia para páginas HTML
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia para assets estáticos
  if (request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'font') {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia padrão
  event.respondWith(staleWhileRevalidate(request));
});

// Background Sync
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
  
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

async function syncOrders() {
  try {
    const orders = await getOfflineOrders();
    for (const order of orders) {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
    }
    await clearOfflineOrders();
    console.log('[SW] Orders synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync orders:', error);
  }
}

async function syncCart() {
  console.log('[SW] Syncing cart...');
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nova Notificação';
  const options = {
    body: data.body || 'Você tem uma nova atualização!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    data: data.data,
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/action-close.png'
      }
    ],
    requireInteraction: data.requireInteraction || false,
    renotify: true
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});

// Periodic Background Sync
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync:', event.tag);
  
  if (event.tag === 'update-products') {
    event.waitUntil(updateProducts());
  }
});

async function updateProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put('/api/products', new Response(JSON.stringify(products)));
    console.log('[SW] Products updated');
  } catch (error) {
    console.error('[SW] Failed to update products:', error);
  }
}

// Helpers
async function getOfflineOrders() {
  // Implementar lógica para buscar pedidos offline do IndexedDB
  return [];
}

async function clearOfflineOrders() {
  // Implementar lógica para limpar pedidos offline do IndexedDB
}

// Message Handler
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});