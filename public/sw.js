const STORAGE_NAME = 'kpacubo_storage';
const STATIC = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/layout.css',
  '/css/fonts.css',
  '/js/index.js',
  '/css/modules.css',
  '/fonts/BrandonGrotesque-Regular.eot',
  '/fonts/BrandonGrotesque-Regular.woff',
  '/fonts/BrandonGrotesque-Regular.ttf',
  '/css/states.css',
  '/css/themes.css',
  'js/lib/handlebars.runtime-v4.1.0.js',
  '/templates/build/all.js',
  '/modules/basevalidator.js',
  '/modules/ajax.js',
  '/modules/models.js',
  '/modules/routes.js',
  '/modules/router.js',
  '/modules/utils.js',
  '/modules/api.js',
  '/modules/factory.js',
];

self.addEventListener('install', (event) => {
  console.log('service worker');
  event.waitUntil(
      caches.open(STORAGE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(STATIC)
      })
      .catch(err => console.log(err) ) 
  );
});

self.addEventListener('activate', event => {
  console.log('claiming control')
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});







/**
 * Tries to refresh target page in cache
 * @param {Request} request - request to be cached
 * @return {Promise<Response | never>}
 */
// function getFromNetwork(request) {
//   if (navigator.onLine) {
//     return caches.open(STORAGE_NAME).then((cache) => {
//       return fetch(request).then((response) => {
//         cache.put(request, response.clone());
//         return response;
//       }).catch((err) => {
//         console.log('REQUEST: ', request);
//         console.error('ERROR: ', err);
//       });
//     });
//   }
// }

// /**
//  * Gets page from cache and tries to refresh it if cache contains target page,
//  *  otherwise fetches request
//  * @param {Event} event - fetch event object containing request
//  * @return {Promise<Response|undefined>} - response to be returned to fetches
//  */
// function getFromCache(event) {
//   console.log(event)
//   return caches.open(STORAGE_NAME).then((cache) => {
//     return cache.match(event.request).then((cacheResponce) => {
//       if (cacheResponce) {
//         event.waitUntil(getFromNetwork(event.request));
//         return cacheResponce;
//       }
//       return fetch(event.request);
//     });
//   });
// }