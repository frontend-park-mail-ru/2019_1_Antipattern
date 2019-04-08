import {dispatchAdapter} from './dispatcher.js';
import apiModule from './api.js';
import validator from './basevalidator.js';
import UserModel from './models.js';
import Factory from './factory.js';
import {GraphicController} from './graphic/graphic.js';

// TODO: incapsulate figures in GameUI
import * as f from './graphic/figures.js';

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
      this._dispatcher.dispatchEvent('UserLoaded', state['User']);
      return;
    } else if (state['User'] === null) {
      this._dispatcher.dispatchEvent('UserLoaded', null);
      return;
    }

    this._apiModule.getUserInfo()
        .then((object) => {
          const image = object.avatar || '';
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

class SinglePlayerController {
  constructor(dispatcher, apiModule, graphicController) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._graphicController = graphicController;
    this._fps = 50;
  }

  gameloop() {
    if (this.gameloop.dx === undefined) {
      this.gameloop.size = 10;
      const size = this.gameloop.size;
      const dims = this._graphicController.getCanvasSize();

      const xPos = (dims.width - size) / 2;
      const yPos = (dims.height - size) / 2;

      // this.gameloop.figure = new f.Rectangle(xPos, yPos, size, size, 'blue');
      this.gameloop.figure = new f.Rectangle(xPos, yPos, size, size, 'rgb(44, 117, 255)');

      this.gameloop.dx = 2;
      this.gameloop.dy = 2;
    }

    const size = this.gameloop.size;
    const coords = this.gameloop.figure.coordinates;
    const dims = this._graphicController.getCanvasSize();

    if (coords.x + size >= dims.width || coords.x <= 0) {
      this.gameloop.dx = -this.gameloop.dx;
    }

    if (coords.y + size >= dims.height || coords.y <= 0) {
      this.gameloop.dy = -this.gameloop.dy;
    }

    const newx = coords.x + this.gameloop.dx;
    const newy = coords.y + this.gameloop.dy;

    this.gameloop.figure.coordinates = {
      x: newx,
      y: newy,
    };

    this._graphicController.addFigure(this.gameloop.figure);
  }

  uiloop() {
    const dims = this._graphicController.getCanvasSize();
    const background = new f.Rectangle(0, 0, dims.width, dims.height, 'rgb(64,64,64)');
    this._graphicController.addFigure(background);
    this.gameloop();
    this._graphicController.draw();
  }

  _clearParams(obj) {
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        obj[i] = undefined;
      }
    }
  }

  initGame() {
    this._graphicController.initController();
    const binding = this.uiloop.bind(this);
    this._timer = setInterval(binding, 1000 / this._fps);
  }

  deinitGame() {
    clearInterval(this._timer);
    this._clearParams(this.gameloop);
    this._clearParams(this.uiloop);
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
    ['dispatcher', 'apiModule', 'graphicController'], {
      injections: {'graphicController': new GraphicController()},
    });

const leaderboardController = controllerFactory.newLeaderboardController();
const loginController = controllerFactory.newLoginController();
const userController = controllerFactory.newUserController();
const signUpController = controllerFactory.newSignUpController();
const logoutController = controllerFactory.newLogoutController();
const settingsController = controllerFactory.newSettingsController();
const singlePlayerController = controllerFactory.newSinglePlayerController();

export {
  leaderboardController,
  loginController,
  userController,
  signUpController,
  logoutController,
  settingsController,
  singlePlayerController,
};
