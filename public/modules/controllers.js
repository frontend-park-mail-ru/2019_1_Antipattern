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
  constructor(dispatcher, apiModule, UserModel) {
    this._dispatcher = dispatcher;
    this._apiModule = apiModule;
    this._UserModel = UserModel;
  }

  init() {
    fetch('/public/gameresources/singleplayer.json')
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          this._pack = JSON.parse(response);

          // this._validatePack();

          for (const round of this._pack.rounds) {
            round.questionCount = round.themes[0].questions.length;
          }

          this._pack.currentRound = 0;

          this.displayQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  displayQuestions() {
    const state = this._dispatcher.getState();
    const users = [];

    if (state['User']) {
      users.push(state['User']);
    } else {
      const user = {
        login: 'Guest',
        avatarPath: '/public/img/avatar.jpg',
        score: 0,
      };

      users.push(user);
    }

    const obj = {
      round: this._pack.rounds[this._pack.currentRound],
      users: users,
    };

    this._dispatcher.dispatchEvent('QuestionList', obj);
  }

  displayQuestion(tile) {
    if (!tile instanceof Node) {
      throw new TypeError('node expected');
    }

    let num = -1;
    const parent = tile.parentElement;
    for (const i in parent.childNodes) {
      if (parent.childNodes.hasOwnProperty(i)) {
        if (parent.childNodes[i] === tile) {
          num = i;
          break;
        }
      }
    }

    const actualNum = (num - 1) / 2 - 1;

    console.log(actualNum);
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
