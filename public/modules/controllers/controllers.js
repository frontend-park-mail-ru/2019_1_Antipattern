'use strict';

import {validateLogin, validateRegistration, validateUpdate} from '../utils/validations.js';
import UserModel from './models.js';

/**
 * Class implementing leaderboard logic
 */
export class LeaderboardController {
  /**
   * LeaderboardController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   * @param {API} api - api accesser
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }

  /**
   * Gets data to diplay specific leaderboard page
   * @param {Number} page - number of page to get data for
   */
  getLeaderboard(page) {
    this._api.getUsers(page)
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
export class LoginController {
  /**
   * LoginController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }

  /**
   * Tries to user in using passed data
   * @param {String} login - user login
   * @param {String} password - user password
   */
  login(login, password) {
    const errorStruct = validateLogin(login, password);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
      return;
    }

    this._api.authorize(login, password)
        .then((object) => {
          const image = object.avatar || '';
          this._dispatcher.dispatchEvent('User', new UserModel(
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
export class UserController {
  /**
   * UserController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }

  /**
   * Gets current user
   */
  getUser() {
    const state = this._dispatcher.getState();
    if (state['User']) {
      this._dispatcher.dispatchEvent('UserLoaded', state['User']);
      return;
    } else if (state['User'] === null) {
      this._dispatcher.dispatchEvent('UserLoaded', null);
      return;
    }

    this._api.getUserInfo()
        .then((object) => {
          const image = object.avatar || '';
          this._dispatcher.dispatchEvent('User', new UserModel(
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
export class SignUpController {
  /**
   * SignUpController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }


  /**
   * Tries to sign user up using passed data
   * @param {String} login - user login
   * @param {String} email - user email
   * @param {String} password - user password
   * @param {String} repassword - password confirmation
   */
  signUp(login, email, password, repassword) {
    const errorStruct = validateRegistration(login, password,
        email, repassword);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('SignedUp', errorStruct);
      return;
    }

    this._api.register(login, email, password)
        .then((object) => {
          this._dispatcher.dispatchEvent('User', new UserModel(
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
export class LogoutController {
  /**
   * LogoutController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }

  /**
   * Logs user out
   */
  logout() {
    this._api.logout()
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
export class SettingsController {
  /**
   * SettingsController constructor
   * @param {DispatchAdapter} dispatcher - internal dispatcher
   */
  constructor(dispatcher, api) {
    this._dispatcher = dispatcher;
    this._api = api;
  }

  /**
   * Tries to update user frofile using passed data
   * @param {String} login - user login
   * @param {String} password - user password
   * @param {String} repassword - password confirmation
   * @param {Object} input - image form input
   */
  updateProfile(login, password, repassword, input) {
    const errorStruct = validateUpdate(login, password,
        repassword);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('ProfileUpdated', errorStruct);
      return;
    }

    this._api.updateUserInfo(login, password)
        .then((object) => {
          const image = object.avatar || null;
          this._dispatcher.dispatchEvent('User', new UserModel(
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
      this._api.uploadAvatar(avatar)
          .then((object) => {
            const image = object.avatar || null;
            this._dispatcher.dispatchEvent('User', new UserModel(
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