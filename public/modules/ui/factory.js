'use strict';

import {Router, initAnchorsRouting} from './router.js';
import {IndexRoute, LoginRoute, SettingsRoute, ProfileRoute, 
        SignUpRoute, LeaderBoardRoute, AboutRoute, LogoutRoute} from './routes.js';
import registerHelpers from './helpers.js';

export function makeUIFactory({userController, loginController, settingsController,
                               signUpController, leaderboardController, logoutController, 
                               subscriber} = {}) {
  const f = new Factory();

  f.addConstructor(Router, ['rootEl'], {
    factoryArgs: ['rootEl']
  });
  f.addConstructor(IndexRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: userController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(LoginRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: loginController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(ProfileRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: userController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(SettingsRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: settingsController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(SignUpRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: signUpController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(LeaderBoardRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: leaderboardController,
      subscriber: subscriber
    } 
  });
  f.addConstructor(AboutRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: null,
      subscriber: subscriber
    } 
  });
  f.addConstructor(LogoutRoute, ['rootEl', 'router', 'controller', 'subscriber'], { 
    factoryArgs: ['rootEl', 'router'],
    injections: { 
      controller: logoutController,
      subscriber: subscriber
    } 
  });

  return f;
}

export function initUI(rootEl, uiFactory) {
  const router = uiFactory.newRouter(rootEl);
  router.addRoute('/', uiFactory.newIndexRoute);
  router.addRoute('/login', uiFactory.newLoginRoute);
  router.addRoute('/profile', uiFactory.newProfileRoute);
  router.addRoute('/settings', uiFactory.newSettingsRoute);
  router.addRoute('/signup', uiFactory.newSignUpRoute);
  router.addRoute('/leaderboard', uiFactory.newLeaderBoardRoute);
  router.addRoute('/about', uiFactory.newAboutRoute);
  router.addRoute('/logout', uiFactory.newLogoutRoute);
  router.setDefaultRoute('/');

  registerHelpers();
  initAnchorsRouting(root, router);
  router.init();
}
