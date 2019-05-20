'use strict';

import * as r from '../modules/routes.js';
import {Router, initAnchorsRouting} from '../modules/router.js';
import * as c from '../modules/controllers.js';
import {subscribeAdapter as subscriber} from '../modules/dispatcher.js';
import Factory from '../modules/factory.js';

function initUIFactory() {
  const UIFactory = new Factory({
    'subscriber': subscriber,
  });

  UIFactory.addConstructor(r.IndexRoute,
      ['rootEl', 'router', 'controller', 'subscriber', 'loginController', 'signupController'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.userController, 
        'loginController': c.loginController, 'signupController': c.signUpController,},
      });
  UIFactory.addConstructor(r.LoginRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.loginController},
      });
  UIFactory.addConstructor(r.ProfileRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.userController},
      });
  UIFactory.addConstructor(r.SettingsRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.settingsController},
      });
  UIFactory.addConstructor(r.SignUpRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.signUpController},
      });
  UIFactory.addConstructor(r.LeaderBoardRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.leaderboardController},
      });
  UIFactory.addConstructor(r.AboutRoute,
      ['rootEl', 'router'],
      {
        factoryArgs: ['rootEl', 'router'],
      });
  UIFactory.addConstructor(r.ChatRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.chatController},
      });
  UIFactory.addConstructor(r.LogoutRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.logoutController},
      });
  UIFactory.addConstructor(r.SinglePlayerRoute,
      ['rootEl', 'router', 'controller', 'subscriber'],
      {
        factoryArgs: ['rootEl', 'router'],
        injections: {'controller': c.singlePlayerController},
      });
  UIFactory.addConstructor(r.NotFoundRoute,
      ['rootEl', 'router'],
      {
        factoryArgs: ['rootEl', 'router'],
      });

  return UIFactory;
}


function getDefaultLocation() {
  const loc = window.location.href;

  const ds = loc.indexOf('//');
  let newLoc = loc.slice(ds + 2);
  const ss = newLoc.indexOf('/');
  newLoc = newLoc.slice(ss);

  return newLoc;
}

/**
 * Function initializing UI
 * @param {Node} root - DOM element
 * @param {Router} router - route object
 */
function initUI(UIFactory, root, router) {
  router.addRoute('/', UIFactory.newIndexRoute);
  router.addRoute('/login', UIFactory.newLoginRoute);
  router.addRoute('/profile', UIFactory.newProfileRoute);
  router.addRoute('/settings', UIFactory.newSettingsRoute);
  router.addRoute('/signup', UIFactory.newSignUpRoute);
  router.addRoute('/leaderboard', UIFactory.newLeaderBoardRoute);
  router.addRoute('/about', UIFactory.newAboutRoute);
  router.addRoute('/logout', UIFactory.newLogoutRoute);
  router.addRoute('/singleplayer', UIFactory.newSinglePlayerRoute);
  router.addRoute('/chat', UIFactory.newChatRoute);

  router.notFoundRouteMaker = UIFactory.newNotFoundRoute;

  const loc = getDefaultLocation();
  router.setDefaultRoute(loc);

  router.init();
  initAnchorsRouting(root, router);
}

/**
 * Function registering service worker
 */
// function registerServiceWorker() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register('/sw.js').then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       });
//     });
//   }
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

window.onload = () => {
  const root = document.getElementById('root');
  const router = new Router(root);

  const UIFactory = initUIFactory();
  initUI(UIFactory, root, router);
  // registerServiceWorker();
  window.addEventListener('fetch', (request) => { console.log(request)})
};
