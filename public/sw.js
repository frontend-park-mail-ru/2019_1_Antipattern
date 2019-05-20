const STORAGE_NAME = 'kpacubo_storage';
const STATIC = [
  '/',
  '/public/index.html',
  '/public/css/base.css',
  '/public/css/layout.css',
  '/public/css/fonts.css',
  '/public/js/index.js',
  '/public/css/modules.css',
  '/public/fonts/BrandonGrotesque-Regular.eot',
  '/public/fonts/BrandonGrotesque-Regular.woff',
  '/public/fonts/BrandonGrotesque-Regular.ttf',
  '/public/css/states.css',
  '/public/css/themes.css',
  '/public/js/lib/handlebars.runtime-v4.1.0.js',
  '/public/templates/build/all.js',
  '/public/modules/basevalidator.js',
  '/public/modules/ajax.js',
  '/public/modules/models.js',
  '/public/modules/routes.js',
  '/public/modules/router.js',
  '/public/modules/utils.js',
  '/public/modules/api.js',
  '/public/modules/factory.js',
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
    caches.open(STORAGE_NAME)
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