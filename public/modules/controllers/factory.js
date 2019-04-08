'use strict';

import {LeaderboardController, LoginController, UserController, 
        SignUpController, LogoutController, SettingsController} from './controllers.js';

export default function makeControllersFactory({ dispatcher, api } = {}) {
  const f = new Factory({
    'dispatcher': dispatcher,
    'api': api,
  });

  f.addConstructor(LeaderboardController, ['dispatcher', 'api']);
  f.addConstructor(LoginController, ['dispatcher', 'api']);
  f.addConstructor(UserController, ['dispatcher', 'api']);
  f.addConstructor(SignUpController, ['dispatcher', 'api']);
  f.addConstructor(LogoutController, ['dispatcher', 'api']);
  f.addConstructor(SettingsController, ['dispatcher', 'api']);

  return f;
}
