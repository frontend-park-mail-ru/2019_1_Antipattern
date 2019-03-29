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

  /**
   * Returns user email
   * @return {string} - user email
   */
  getEmail() {
    return this._email;
  }

  /**
   * Returns user avatar path
   * @return {string} - avatar path
   */
  getImg() {
    return this._img;
  }

  /**
   * Returns user score
   * @return {string} - user score
   */
  getScore() {
    return this._score;
  }

  /**
   * Returns user login
   * @return {string} - user login
   */
  getLogin() {
    return this._login;
  }

  /**
   * Updates login
   * @param {string} login - new login
   */
  updateLogin(login) {
    this._login = login;
  }
}

export default UserModel;
