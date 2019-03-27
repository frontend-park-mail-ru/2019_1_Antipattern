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
    console.log('controller started working');
    apiModule.getUsers(page)
        .then((object) => {
          console.log('controller got request');
          this._dispatcher.dispatchEvent('LeaderboardLoaded', {
            users: object.users,
            pageCount: Math.ceil(object.count / 10),
            currentPage: page - 1,
          });
          console.log('event emitted');
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
        //this._router.routeTo('/');
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

const controllerFactory = new Factory(dispatchAdapter);
controllerFactory.addConstructor(LeaderboardController);
controllerFactory.addConstructor(LoginController);
controllerFactory.addConstructor(UserController);
controllerFactory.addConstructor(SignUpController);

const leaderboardController = controllerFactory.newLeaderboardController();
const loginController = controllerFactory.newLoginController();
const userController = controllerFactory.newUserController();
const signUpController = controllerFactory.newSignUpController();

export {
  leaderboardController,
  loginController,
  userController,
  signUpController
};
