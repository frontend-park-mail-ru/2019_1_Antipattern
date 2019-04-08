'use strict';

import makeDataFactory from '../modules/data/factory.js';
import makeNetFactory from '../modules/net/factory.js';
import makeControllersFactory from '../modules/controllers/factory.js';
import {makeUIFactory, initUI} from '../modules/ui/factory.js';

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
          console.log('Successfully registered:', reg);
        })
        .catch((err) => {
          console.error('Error: ', err);
        });
  }
}

window.onload = () => {
  const dataFactory = makeDataFactory();

  const netFactory = makeNetFactory();

  const controllersFactory = makeControllersFactory({
    dispatcher: dataFactory.newDispatcherAdapter(),
    api:        netFactory.newAPI();
  });

  const uiFactory = makeUIFactory({
    userController:        controllersFactory.newUserController(), 
    loginController:       controllersFactory.newLoginController()
    settingsController:    controllersFactory.newSettingsController(),
    signUpController:      controllersFactory.newSignUpController(),
    leaderboardController: controllersFactory.newLeaderboardController(),
    logoutController:      controllersFactory.newLogoutController(),
    subscriber:            dataFactory.newSubscribeAdapter()
  });
  const rootEl = document.getElementById('root');
  initUI(rootEl, uiFactory);

  registerServiceWorker();
};
