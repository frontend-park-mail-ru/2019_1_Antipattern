'use strict';
import apiModule from "../modules/api.js";

function initUI(root, router) {
  router.addRoute('/', wrapConstructorToFactory(IndexRoute));
  router.addRoute('/login', wrapConstructorToFactory(LoginRoute));
  router.addRoute('/profile', wrapConstructorToFactory(ProfileRoute));
  router.addRoute('/settings', wrapConstructorToFactory(SettingsRoute));
  router.addRoute('/signup', wrapConstructorToFactory(SignUpRoute));
  router.addRoute('/leaderboard', wrapConstructorToFactory(LeaderBoardRoute));
  router.addRoute('/about', wrapConstructorToFactory(AboutRoute));
  router.setDefaultRoute('/');

  router.init();
  initAnchorsRouting(root, router);
}

function loadUser(router) {
  apiModule.getUserInfo()
    .then((object) => {
      const image = object.avatar || null;
      window.User = new window.UserModel(object.name, object.email,
        object.login, object.score, image);
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
