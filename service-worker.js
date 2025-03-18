// Имя кэша
const CACHE_NAME = 'pro-tattoo-cache-v2';

// Список URL, которые нужно кэшировать для офлайн-режима
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/clear-cache.html',
  '/assets/index-*.js',
  '/assets/index-*.css'
];

// При установке сервис-воркера
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// При запросе ресурсов
self.addEventListener('fetch', event => {
  // Не перехватываем запросы к серверу разработки Vite
  if (
    event.request.url.includes('/__repl') || 
    event.request.url.includes('/@vite') || 
    event.request.url.includes('/@fs') ||
    event.request.url.includes('/@id') ||
    event.request.url.includes('hot-update') ||
    event.request.url.includes('hmr')
  ) {
    // Просто пропускаем запрос на сетевое соединение
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          return response;
        }
        
        // Если кэша нет, делаем сетевой запрос
        return fetch(event.request)
          .then(response => {
            // Если запрос не успешен, просто возвращаем его
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Клонируем ответ, так как он может быть использован только один раз
            const responseToCache = response.clone();
            
            // Добавляем ответ в кэш
            caches.open(CACHE_NAME)
              .then(cache => {
                // Не кэшируем ресурсы, которые могут быть горячими обновлениями
                if (!event.request.url.includes('.hot-update.')) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          })
          .catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
            // В случае ошибки сети можно показать офлайн страницу
            // return caches.match('/offline.html');
          });
      })
  );
});

// При активации нового сервис-воркера
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Удаляем неактуальные кэши
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});