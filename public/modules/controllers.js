import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';
import validator from './basevalidator.js';
import UserModel from './models.js';
import Factory from './factory.js';
import {SinglePlayerController} from './gamecontrollers.js';
/* eslint-disable no-console */

/**
 * Class implementing leaderboard logic
 */
class LeaderboardController {
  /**
   * LeaderboardController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
  }

  /**
   * Gets data to diplay specific leaderboard page
   * @param {Number} page - number of page to get data for
   */
  getLeaderboard(page) {
    apiModule.getUsers(page)
        .then((object) => {
          this._dispatcher.dispatchEvent('LeaderboardLoaded', {
            users: object.users,
            pageCount: Math.ceil(object.count / 10),
            currentPage: page - 1,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

/**
 * Class implementing login logic
 */
class LoginController {
  /**
   * LoginController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule, validator, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._UserModel = UserModel;
  }

  /**
   * Tries to user in using passed data
   * @param {String} login - user login
   * @param {String} password - user password
   */
  login(login, password) {
    const errorStruct = this._validator.validateLogin(login, password);
    console.log(errorStruct);
    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
      return;
    }

    this._apiModule.authorize(login, password)
        .then((object) => {
          const image = object.avatar || '';
          this._dispatcher.dispatchEvent('User', new this._UserModel(
              object.email, object.login, object.score, image
          ));
          this._dispatcher.dispatchEvent('LoggedIn', 'success');
        })
        .catch((error) => {
          if (typeof error === 'string') {
            console.log(error);
          } else {
            error = error.payload;
            errorStruct.error = error.message;
            errorStruct.errorField = error.field;

            this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
          }
        });
  }
}

/**
 * Class implementing method to get current user
 */
class UserController {
  /**
   * UserController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._UserModel = UserModel;
  }

  /**
   * Gets current user
   */
  getUser() {
    const state = this._dispatcher.getState();
    if (state['User']) {
      if (!state['User'].img) {
        const us = state['User'];
        const newUser = new this._UserModel(us.email, us.login,
            us.score, 'public/img/avatar.jpg');
        this._dispatcher.dispatchEvent('User', newUser);
      }

      this._dispatcher.dispatchEvent('UserLoaded', state['User']);
      return;
    } else if (state['User'] === null) {
      this._dispatcher.dispatchEvent('UserLoaded', null);
      return;
    }

    this._apiModule.getUserInfo()
        .then((object) => {
          const image = object.avatar || 'public/img/avatar.jpg';
          this._dispatcher.dispatchEvent('User', new this._UserModel(
              object.email, object.login, object.score, image
          ));

          this._dispatcher.dispatchEvent('UserLoaded', state['User']);
        })
        .catch((error) => {
          console.log(error);
          this._dispatcher.dispatchEvent('User', null);
          this._dispatcher.dispatchEvent('UserLoaded', null);
        });
  }
}

/**
 * Class implementing signup logic
 */
class SignUpController {
  /**
   * SignUpController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule, validator, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._UserModel = UserModel;
  }


  /**
   * Tries to sign user up using passed data
   * @param {String} login - user login
   * @param {String} email - user email
   * @param {String} password - user password
   * @param {String} repassword - password confirmation
   */
  signUp(login, email, password, repassword) {
    const errorStruct = this._validator.validateRegistration(login, password,
        email, repassword);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('SignedUp', errorStruct);
      return;
    }

    this._apiModule.register(login, email, password)
        .then((object) => {
          this._dispatcher.dispatchEvent('User', new this._UserModel(
              object.email, object.login, object.score
          ));
          this._dispatcher.dispatchEvent('SignedUp', 'success');
        })
        .catch((error) => {
          if (typeof error === 'string') {
            console.log(error);
          } else {
            error = error.payload;
            errorStruct.error = error.message;
            errorStruct.errorField = error.field;

            this._dispatcher.dispatchEvent('SignedUp', errorStruct);
          }
        });
  }
}

/**
 * Class implementing logout logic
 */
class LogoutController {
  /**
   * LogoutController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._UserModel = UserModel;
  }

  /**
   * Logs user out
   */
  logout() {
    this._apiModule.logout()
        .then(() => {
          this._dispatcher.dispatchEvent('User', null);
          this._dispatcher.dispatchEvent('LoggedOut', 'success');
        })
        .catch((error) => {
          console.log(error);
          this._dispatcher.dispatchEvent('LoggedOut', error);
        });
  }
}

/**
 * Class implementing settings logic
 */
class SettingsController {
  /**
   * SettingsController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule, validator, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._UserModel = UserModel;
  }

  /**
   * Tries to update user frofile using passed data
   * @param {String} login - user login
   * @param {String} password - user password
   * @param {String} repassword - password confirmation
   * @param {Object} input - image form input
   */
  updateProfile(login, password, repassword, input) {
    const errorStruct = this._validator.validateUpdate(login, password,
        repassword);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('ProfileUpdated', errorStruct);
      return;
    }

    this._apiModule.updateUserInfo(login, password)
        .then((object) => {
          const image = object.avatar || null;
          this._dispatcher.dispatchEvent('User', new this._UserModel(
              object.email, object.login, object.score, image
          ));
          this._dispatcher.dispatchEvent('ProfileUpdated', 'success');
        })
        .catch((error) => {
          if (typeof error === 'string') {
            console.log(error);
          } else {
            error = error.payload;
            const errorStruct = {
              error: error.message,
              errorField: error.field,
            };
            this._dispatcher.dispatchEvent('ProfileUpdated', errorStruct);
          }
        });

    if (input.value) {
      const avatar = new FormData();
      avatar.append('avatar', input.files[0]);
      this._apiModule.uploadAvatar(avatar)
          .then((object) => {
            const image = object.avatar || null;
            this._dispatcher.dispatchEvent('User', new this._UserModel(
                object.email, object.login, object.score, image
            ));
            this._dispatcher.dispatchEvent('AvatarUpdated', 'success');
          })
          .catch((error) => {
            if (typeof error === 'string') {
              console.log(error);
            } else {
              error = error.payload;
              const errorStruct = {
                error: error.message,
                errorField: error.field,
              };
              this._dispatcher.dispatchEvent('AvatarUpdated', errorStruct);
            }
          });
    }
  }
}

class ChatController {
  /**
   * SettingsController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, apiModule) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;

    this._socket = new WebSocket('wss://chat.kpacubo.xyz:2000/ws');

    this._socket.onopen = () => {
      console.log('Соединение установлено.');
    };

    this._socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    this._socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.uid !== '') {
        this._apiModule.getUserById(msg.uid)
            .then((payload) => {
              this._dispatcher.dispatchEvent('Msg', {
                text: payload.login + ':' + msg.text,
                avatar: payload.avatar || 'public/img/avatar.jpg',
              });
            });
      } else {
        this._dispatcher.dispatchEvent('Msg', {
          text: 'anon' + ':' + msg.text,
          avatar: 'public/img/avatar.jpg',
        });
      }
    };

    this._socket.onerror = (error) => {
      console.log('Ошибка ' + error.message);
    };
  }

  sendMsg(msg) {
    this._socket.send(JSON.stringify({text: msg}));
  }

  loadHistory() {
    this._apiModule.getChatHistory()
        .then((payload) => {
          payload = payload.reverse();
          this._dispatcher.dispatchEvent('Msgs', payload);
          console.log(payload);
        })
        .catch((govno) => {
          console.log(govno);
        });
  }
  getLogin() {
    return this._apiModule.getUserInfo();
  }
}


const controllerFactory = new Factory({
  'apiModule': apiModule,
  'validator': validator,
  'UserModel': UserModel,
  'dispatcher': dispatchAdapter,
});
controllerFactory.addConstructor(LeaderboardController,
    ['dispatcher', 'apiModule']);
controllerFactory.addConstructor(LoginController,
    ['dispatcher', 'apiModule', 'validator', 'UserModel']);
controllerFactory.addConstructor(UserController,
    ['dispatcher', 'apiModule', 'UserModel']);
controllerFactory.addConstructor(SignUpController,
    ['dispatcher', 'apiModule', 'validator', 'UserModel']);
controllerFactory.addConstructor(LogoutController,
    ['dispatcher', 'apiModule', 'UserModel']);
controllerFactory.addConstructor(SettingsController,
    ['dispatcher', 'apiModule', 'validator', 'UserModel']);
controllerFactory.addConstructor(SinglePlayerController,
    ['dispatcher', 'apiModule', 'UserModel']);
controllerFactory.addConstructor(ChatController,
    ['dispatcher', 'apiModule']);

const leaderboardController = controllerFactory.getFabricator(LeaderboardController)();
const loginController = controllerFactory.getFabricator(LoginController)();
const userController = controllerFactory.getFabricator(UserController)();
const signUpController = controllerFactory.getFabricator(SignUpController)();
const logoutController = controllerFactory.getFabricator(LogoutController)();
const settingsController = controllerFactory.getFabricator(SettingsController)();
const singlePlayerController = controllerFactory.getFabricator(SinglePlayerController)();
const chatController = controllerFactory.getFabricator(ChatController)();

export {
  leaderboardController,
  loginController,
  userController,
  signUpController,
  logoutController,
  settingsController,
  singlePlayerController,
  chatController,
};
