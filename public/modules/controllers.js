import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';
import validator from './basevalidator.js';
import UserModel from './models.js';
import Factory from './factory.js';

class LeaderboardController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

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

class LoginController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  login(login, password) {
    const errorStruct = validator.validateLogin(login, password);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
      return;
    }

    apiModule.authorize(login, password)
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

class UserController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  getUser() {
    if (window.User) {
      this._dispatcher.dispatchEvent('UserLoaded', window.User);
      return;
    } else if (window.User === null) {
      this._dispatcher.dispatchEvent('UserLoaded', null);
      return;
    }

    apiModule.getUserInfo()
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

class SignUpController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  signUp(login, email, password, repassword) {
    const errorStruct = validator.validateRegistration(login, password, email,
      repassword);

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('SignedUp', errorStruct);
      return;
    }

    apiModule.register(login, email, password)
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

class LogoutController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  logout() {
    apiModule.logout()
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

class SettingsController {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  updateProfile(login, password, repassword, input) {
    const errorStruct = validator.validateUpdate(login, password, repassword);
    const error = errorStruct.error;
    const errorField = errorStruct.errorField;

    if (error !== null) {
      //showErrorMsg(form, errorField, error);
      this._dispatcher.dispatchEvent('ProfileUpdated', errorStruct);
      return;
    }

    apiModule.updateUserInfo(login, password)
      .then((object) => {
        const image = object.avatar || null;
        window.User = new UserModel(object.email, object.login,
          object.score, image);
        this._dispatcher.dispatchEvent('ProfileUpdated', 'success');
        //this._router.routeTo('/');
      })
      .catch((error) => {
        if (typeof error === 'string') {
          console.log(error);
        } else {
          error = error.payload;
          //showErrorMsg(form, error.field, error.message);
          const errorStruct = {
            error: error.message,
            errorField: error.field
          };
          this._dispatcher.dispatchEvent('ProfileUpdated', errorStruct);
        }
      });

    if (input.value) {
      const avatar = new FormData();
      avatar.append('avatar', input.files[0]);
      apiModule.uploadAvatar(avatar)
        .then((object) => {
          const image = object.avatar || null;
          window.User = new UserModel(object.email, object.login,
            object.score, image);
          //this._router.routeTo('/');
          this._dispatcher.dispatchEvent('AvatarUpdated', 'success');
        })
        .catch((error) => {
          if (typeof error === 'string') {
            console.log(error);
          } else {
            error = error.payload;
            //showErrorMsg(form, error.field, error.message);
            const errorStruct = {
              error: error.message,
              errorField: error.field
            };
            this._dispatcher.dispatchEvent('AvatarUpdated', errorStruct);
          }
        });
    }
  }
}

const controllerFactory = new Factory(dispatchAdapter);
controllerFactory.addConstructor(LeaderboardController);
controllerFactory.addConstructor(LoginController);
controllerFactory.addConstructor(UserController);
controllerFactory.addConstructor(SignUpController);
controllerFactory.addConstructor(LogoutController);
controllerFactory.addConstructor(SettingsController);

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
  settingsController
};
