'use strict';

import * as r from '../modules/routes.js';
import {wrapConstructorToFactory} from '../modules/utils.js';
import {Router, initAnchorsRouting} from '../modules/router.js';
import * as c from '../modules/controllers.js';
import {subscribeAdapter as subscriber} from '../modules/dispatcher.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((reg) => { console.log('Successfully registered:', reg); })
    .catch((err) => {console.error('Error: ',err); });
}

function initUI(root, router) {
  router.addRoute('/', wrapConstructorToFactory(r.IndexRoute, c.userController, subscriber));
  router.addRoute('/login', wrapConstructorToFactory(r.LoginRoute, c.loginController, subscriber));
  router.addRoute('/profile', wrapConstructorToFactory(r.ProfileRoute, c.userController, subscriber));
  router.addRoute('/settings', wrapConstructorToFactory(r.SettingsRoute, c.settingsController, subscriber));
  router.addRoute('/signup', wrapConstructorToFactory(r.SignUpRoute, c.signUpController, subscriber));
  router.addRoute('/leaderboard', wrapConstructorToFactory(r.LeaderBoardRoute, c.leaderboardController, subscriber));
  router.addRoute('/about', wrapConstructorToFactory(r.AboutRoute));
  router.addRoute('/logout', wrapConstructorToFactory(r.LogoutRoute, c.logoutController, subscriber));
  router.setDefaultRoute('/');

  router.init();
  initAnchorsRouting(root, router);
}

window.onload = () => {
  const root = document.getElementById('root');
  const router = new Router(root);
  initUI(root, router);
};
