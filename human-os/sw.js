/**
 * HUMAN.OS Pitch Deck - Service Worker
 * Phase 3: Offline Capability
 * 
 * Caching strategy: Cache-first for assets, network-first for dynamic content
 */

const CACHE_NAME = 'humanos-presentation-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './assets/css/main.css',
  './assets/js/main.js'
];

// External CDN resources to cache
const CDN_RESOURCES = [
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Cache CDN resources
        return caches.open(CACHE_NAME + '-cdn')
          .then((cdnCache) => {
            console.log('[SW] Caching CDN resources');
            // Use no-cors mode for cross-origin fonts
            const fontPromises = CDN_RESOURCES.map(url => 
              fetch(url, { mode: 'no-cors' })
                .then(response => cdnCache.put(url, response))
                .catch(err => console.log('[SW] Failed to cache:', url, err))
            );
            return Promise.allSettled(fontPromises);
          });
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Installation failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('humanos-presentation-') && 
                     name !== CACHE_NAME && 
                     name !== CACHE_NAME + '-cdn';
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip analytics and external tracking
  if (url.hostname.includes('google-analytics') || 
      url.hostname.includes('googletagmanager')) {
    return;
  }
  
  // Strategy: Cache-first for static assets
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Strategy: Stale-while-revalidate for CDN resources
  if (isCDNResource(url)) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Strategy: Network-first for everything else
  event.respondWith(networkFirstStrategy(request));
});

// Helper functions
function isStaticAsset(url) {
  return url.pathname.endsWith('.html') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.json') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.svg') ||
         url.pathname.endsWith('.woff2');
}

function isCDNResource(url) {
  return CDN_RESOURCES.some(resource => url.href.includes(resource));
}

// Cache-first strategy: serve from cache, fallback to network
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Return cached response and update cache in background
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
      })
      .catch(() => {});
    
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, return offline fallback
    return new Response(
      '<html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME + '-cdn');
  const cachedResponse = await cache.match(request);
  
  const networkFetch = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);
  
  return cachedResponse || networkFetch;
}

// Network-first strategy: try network, fallback to cache
async function networkFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return generic offline response
    return new Response(
      JSON.stringify({ offline: true, error: 'Network unavailable' }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 503 
      }
    );
  }
}

// Message handling for client communication
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'getVersion') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Background sync for analytics (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Placeholder for analytics sync
  console.log('[SW] Syncing analytics...');
}

// Push notification handling (if needed in future)
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'HUMAN.OS', {
      body: data.body || 'New update available',
      icon: '/assets/icon-192x192.png',
      badge: '/assets/badge-72x72.png',
      data: data
    })
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});
