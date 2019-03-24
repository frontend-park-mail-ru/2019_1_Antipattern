'use strict';
import apiModule from "../modules/api.js";

//(function() {
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
  //window.API.getUserInfo((status, object) => {
  apiModule.getUserInfo((status, object) => {
    if (status === 'success') {
      const image = object.avatar || null;
      window.User = new window.UserModel(object.name, object.email,
          object.login, object.score, image);
      router.routeTo('/');
    }
  });
}

window.onload = () => {
  const root = document.getElementById('root');
  const router = new Router(root);
  initUI(root, router);
  loadUser(router);
};
//})();
