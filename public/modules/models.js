'use strict';

class UserModel {
  /**
   * Default UserModel constructor
   * @param {string} email - user email
   * @param {string} login - user login
   * @param {string} score - user score
   * @param {string} img - user avatar path
   */
  constructor(email, login, score, img = '') {
    this._email = email;
    this._login = login;
    this._img = img;
    this._score = score;
  }
  get email() {
    return this._email;
  }

  get login() {
    return this._login;
  }

  get img() {
    return this._img;
  }

  get score() {
    return this._score;
  }
}

// TODO(AntonyMoes): implement UserModel holder
export default UserModel;
