'use strict';

import * as r from '../modules/routes.js';
import {wrapConstructorToFactory} from '../modules/utils.js';
import {Router, initAnchorsRouting} from '../modules/router.js';
import * as c from '../modules/controllers.js';
import {subscribeAdapter as subscriber} from '../modules/dispatcher.js';

function initUI(root, router) {
  router.addRoute('/', wrapConstructorToFactory(r.IndexRoute));
  router.addRoute('/login', wrapConstructorToFactory(r.LoginRoute, c.loginController, subscriber));
  router.addRoute('/profile', wrapConstructorToFactory(r.ProfileRoute));
  router.addRoute('/settings', wrapConstructorToFactory(r.SettingsRoute));
  router.addRoute('/signup', wrapConstructorToFactory(r.SignUpRoute));
  router.addRoute('/leaderboard', wrapConstructorToFactory(r.LeaderBoardRoute, c.leaderboardController, subscriber));
  router.addRoute('/about', wrapConstructorToFactory(r.AboutRoute));
  router.addRoute('/logout', wrapConstructorToFactory(r.LogoutRoute));
  router.setDefaultRoute('/');

  router.init();
  initAnchorsRouting(root, router);
}

function loadUser(state, key, value) {
  subscriber.unsubscribeEvent('UserLoaded', loadUser.bind({router: this.router}));

  if (value !== null) {
    this.router.routeTo('/');
  }
}

window.onload = () => {
  const root = document.getElementById('root');
  const router = new Router(root);
  initUI(root, router);

  c.userController.getUser();
  subscriber.subscribeEvent('UserLoaded', loadUser.bind({router: router}))
};
