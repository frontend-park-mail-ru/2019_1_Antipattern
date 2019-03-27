import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';
import {clearErrors, showErrorMsg} from "./utils.js";
import validator from "./basevalidator.js";
import UserModel from "./models.js";

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
    //const error = errorStruct.error;
    //const errorField = errorStruct.errorField;

    if (errorStruct.error !== null) {
      this._dispatcher.dispatchEvent('LoggedIn', errorStruct);
      //showErrorMsg(form, errorField, error);
      return;
    }

    apiModule.authorize(login, password)
      .then((object) => {
        const image = object.avatar || '';
        window.User = new UserModel(object.email, object.login,
          object.score, image);
        //this._router.routeTo('/');
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
          //showErrorMsg(form, error.field, error.message);
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

const leaderboardController = new LeaderboardController(dispatchAdapter);
const loginController = new LoginController(dispatchAdapter);
const userController = new UserController(dispatchAdapter);

export {
  leaderboardController,
  loginController,
  userController
};
