'use strict';

(function() {
  class UserModel {
    /**
     * Default UserModel constructor
     * @param {string} username - user name
     * @param {string} email - user email
     * @param {string} login - user login
     * @param {string} score - user score
     * @param {string} img - user avatar path
     */
    constructor(username, email, login, score, img = '') {
      this._username = username;
      this._email = email;
      this._login = login;
      this._img = img;
      this._score = score;
    }

    /**
     * Returns user name
     * @return {string} - user name
     */
    getUsername() {
      return this._username;
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
     * Updates username
     * @param {string} username - new user name
     */
    updateUsername(username) {
      this._username = username;
    }
  }

  window.UserModel = UserModel;
})();
