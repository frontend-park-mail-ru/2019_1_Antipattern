'use strict';
import apiModule from '../modules/api.js';
import UserModel from '../modules/models.js';
import * as r from '../modules/routes.js';
import {wrapConstructorToFactory} from '../modules/utils.js';
import {Router, initAnchorsRouting} from '../modules/router.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((reg) => { console.log('Successfully registered:', reg); })
    .catch((err) => {console.error('Error: ',err); });
}

function initUI(root, router) {
  router.addRoute('/', wrapConstructorToFactory(r.IndexRoute));
  router.addRoute('/login', wrapConstructorToFactory(r.LoginRoute));
  router.addRoute('/profile', wrapConstructorToFactory(r.ProfileRoute));
  router.addRoute('/settings', wrapConstructorToFactory(r.SettingsRoute));
  router.addRoute('/signup', wrapConstructorToFactory(r.SignUpRoute));
  router.addRoute('/leaderboard', wrapConstructorToFactory(r.LeaderBoardRoute));
  router.addRoute('/about', wrapConstructorToFactory(r.AboutRoute));
  router.addRoute('/logout', wrapConstructorToFactory(r.LogoutRoute));
  router.setDefaultRoute('/');

  router.init();
  initAnchorsRouting(root, router);
}

function loadUser(router) {
  apiModule.getUserInfo()
      .then((object) => {
        const image = object.avatar || '';
        window.User = new UserModel(object.email, object.login,
                                    object.score, image);
        router.routeTo('/');
      })
      .catch((error) => {
        console.log(error);
      });
}

window.onload = () => {
  const root = document.getElementById('root');
  const router = new Router(root);
  initUI(root, router);
  loadUser(router);
};
