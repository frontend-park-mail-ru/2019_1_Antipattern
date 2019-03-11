'use strict';

(function() {
  class UserModel {
    constructor(username, email, login, score, img = null) {
      this._username = username;
      this._email = email;
      this._login = login;
      this._img = img;
      this._score = score;
    }

    getUsername() {
      return this._username;
    }

    getEmail() {
      return this._email;
    }

    getImg() {
      return this._img;
    }

    getScore() {
      return this._score;
    }

    updateUsername(username) {
      this._username = username;
    }
  }

  window.UserModel = UserModel;
})();
