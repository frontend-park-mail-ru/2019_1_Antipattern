const STORAGE_NAME = 'kpacubo_storage';
const STATIC = [
  '/',
  '/public/css/base.css',
  '/public/css/fonts.css',
  '/public/css/layout.css',
  '/public/css/modules.css',
  '/public/css/states.css',
  '/public/css/themes.css',
  '/public/fonts/8693.ttf',
  '/public/fonts/BrandonGrotesque-Regular.eot',
  '/public/fonts/BrandonGrotesque-Regular.ttf',
  '/public/fonts/BrandonGrotesque-Regular.woff',
  '/public/fonts/Street_Gathering.eot',
  '/public/fonts/Street_Gathering.svg',
  '/public/fonts/Street_Gathering.ttf',
  '/public/fonts/Street_Gathering.woff',
  '/public/fonts/stylesheet.css',
  '/public/js/lib/handlebars-v4.1.0.js',
  '/public/js/lib/handlebars.runtime-v4.1.0.js',
  '/public/js/index.js',
  '/public/modules/ajax.js',
  '/public/modules/api.js',
  '/public/modules/basevalidator.js',
  '/public/modules/models.js',
  '/public/modules/router.js',
  '/public/modules/routes.js',
  '/public/modules/utils.js',
  '/public/templates/build/all.js',
  '/public/templates/about.html',
  '/public/templates/leaderboard.html',
  '/public/templates/login.html',
  '/public/templates/menu.html',
  '/public/templates/profile.html',
  '/public/templates/settings.html',
  '/public/templates/signup.html',
  '/public/game.html',
  '/public/index.html',
  '/public/vhs.jpeg',
  '/public/prey-2_bg.jpg',
  '/public/img/about.jpg',
  '/public/img/avatar.jpg',
  '/public/img/settings.svg',
  '/public/sw.js',
];

self.addEventListener('install', (event) => {
  console.log(event.request);
  event.waitUntil(
      caches.open(STORAGE_NAME)
          .then((cache) => {
            return cache.addAll(STATIC);
          })
          .catch((err) => {
            console.error('Storage initiation failed:', err);
          })
  );
});

function getFromNetwork(request) {
  if (navigator.onLine) {
    return caches.open(STORAGE_NAME).then((cache) => {
      return fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
      }).catch((err) => {
        console.log('REQUEST: ', request);
        console.error('ERROR: ', err);
      });
    });
  }
}

function getFromCache(event) {
  return caches.open(STORAGE_NAME).then((cache) => {
    return cache.match(event.request).then((cacheResponce) => {
      if (cacheResponce) {
        event.waitUntil(getFromNetwork(event.request));
        return cacheResponce;
      }
      return fetch(event.request);
    });
  });
}

self.addEventListener('fetch', (event) => {
  event.respondWith(getFromCache(event));
});

