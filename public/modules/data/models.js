'use strict';

/**
 * Class implementing user model
 */
export class UserModel {
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
   * Email getter
   * @return {string} - email
   */
  get email() {
    return this._email;
  }

  /**
   * Login getter
   * @return {string} - login
   */
  get login() {
    return this._login;
  }

  /**
   * Img path getter
   * @return {string} - img path
   */
  get img() {
    return this._img;
  }

  /**
   * Score getter
   * @return {string} - score
   */
  get score() {
    return this._score;
  }
}

// TODO(AntonyMoes): implement UserModel holder
