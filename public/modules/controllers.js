import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';
import validator from './basevalidator.js';
import UserModel from './models.js';
import Factory from './factory.js';

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
  constructor(dispatcher, apiModule, validator, userStorage) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._userStorage = userStorage;
    console.log(this._dispatcher);
    console.log(this._apiModule);
    console.log(this._validator);
    console.log(this._userStorage);
  }

  /**
   * Tries to user in using passed data
   * @param {String} login - user login
   * @param {String} password - user password
   */
  login(login, password) {
    const errorStruct = this._validator.validateLogin(login, password);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
      return;
    }

    this._apiModule.authorize(login, password)
        .then((object) => {
          const image = object.avatar || '';
          window.User = new UserModel(object.email, object.login,
              object.score, image);
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
  constructor(dispatcher, apiModule, userStorage) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._userStorage = userStorage;
  }

  /**
   * Gets current user
   */
  getUser() {
    if (window.User) {
      this._dispatcher.dispatchEvent('UserLoaded', window.User);
      return;
    } else if (window.User === null) {
      this._dispatcher.dispatchEvent('UserLoaded', null);
      return;
    }

    this._apiModule.getUserInfo()
        .then((object) => {
          const image = object.avatar || '';
          window.User = new UserModel(object.email, object.login,
              object.score, image);

          this._dispatcher.dispatchEvent('UserLoaded', window.User);
        })
        .catch((error) => {
          console.log(error);
          window.User = null;
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
  constructor(dispatcher, apiModule, validator, userStorage) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._userStorage = userStorage;
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
          window.User = new UserModel(object.email, object.login,
              object.score);
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
  constructor(dispatcher, apiModule, userStorage) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._userStorage = userStorage;
  }

  /**
   * Logs user out
   */
  logout() {
    this._apiModule.logout()
        .then(() => {
          window.User = null;
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
  constructor(dispatcher, apiModule, validator, userStorage) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._validator = validator;
    this._userStorage = userStorage;
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
          window.User = new UserModel(object.email, object.login,
              object.score, image);
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
            window.User = new UserModel(object.email, object.login,
                object.score, image);
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

const controllerFactory = new Factory({
  'apiModule': apiModule,
  'validator': validator,
  'userStorage': {/* TODO: insert here */},
  'dispatcher': dispatchAdapter,
});
controllerFactory.addConstructor(LeaderboardController,
    ['dispatcher', 'apiModule']);
controllerFactory.addConstructor(LoginController,
    ['dispatcher', 'apiModule', 'validator', 'userStorage']);
controllerFactory.addConstructor(UserController,
    ['dispatcher', 'apiModule', 'userStorage']);
controllerFactory.addConstructor(SignUpController,
    ['dispatcher', 'apiModule', 'validator', 'userStorage']);
controllerFactory.addConstructor(LogoutController,
    ['dispatcher', 'apiModule', 'userStorage']);
controllerFactory.addConstructor(SettingsController,
    ['dispatcher', 'apiModule', 'validator', 'userStorage']);

/*controllerFactory.addConstructor(LeaderboardController);
controllerFactory.addConstructor(LoginController);
controllerFactory.addConstructor(UserController);
controllerFactory.addConstructor(SignUpController);
controllerFactory.addConstructor(LogoutController);
controllerFactory.addConstructor(SettingsController);*/


const leaderboardController = controllerFactory.newLeaderboardController();
const loginController = controllerFactory.newLoginController();
const userController = controllerFactory.newUserController();
const signUpController = controllerFactory.newSignUpController();
const logoutController = controllerFactory.newLogoutController();
const settingsController = controllerFactory.newSettingsController();

export {
  leaderboardController,
  loginController,
  userController,
  signUpController,
  logoutController,
  settingsController,
};
