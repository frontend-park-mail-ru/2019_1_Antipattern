'use strict';

import ajax from './ajax.js';

const apiPrefix = 'https://api.kpacubo.xyz'; // use upstream api; change to blank for local

/**
 * Class containing methods working with application's API
 */
class API {
  constructor() {
    this._userMap = new Map();
  }
  /**
   * doFetch wrapper that returns promises with parsed data
   * @param {String} method - GET/POST/... method
   * @param {String} url - target URL
   * @param {Object} body - request body
   * @param {String} type - expected response type
   * @return {Promise<Object|null>} - response body
   *    parsed into an object
   * @private
   */
  _sendRequest(method, url, body, type, required = []) {
    if (typeof method !== 'string') {
      throw new TypeError('\"method\" is not a string');
    }

    if (typeof url !== 'string') {
      throw new TypeError('\"url\" is not a string');
    }

    if (typeof type !== 'string') {
      throw new TypeError('\"type\" is not a string');
    }

    if (!Array.isArray(required)) {
      throw new TypeError('\"required\" is not an Array');
    }

    return ajax.doFetch( {
      path: apiPrefix + url,
      body: body,
      method: method,
    })
        .then((response) => {
          if (!response.ok) {
            throw response.statusText;
          }
          return response.text().then((text) => {
            return text ? JSON.parse(text) : null;
          });
        })
        .then((data) => {
          if (data && data.status !== 'success') {
            throw data;
          }

          return data;
        })
        .then((response) => {
          if (!response) {
            return response;
          }

          if (response.type !== type) {
            throw 'wrong response type';
          }

          return response.payload;
        })
        .then((payload) => {
          if (required.length === 0) {
            return payload;
          }

          for (const attr of required) {
            if (!payload.hasOwnProperty(attr)) {
              console.log('Lack of property \"' + attr + '\" in payload');
              throw 'payload is missing some required fields';
            }
          }

          return payload;
        });
  }

  /**
   * API method to register a new user
   * @param {String} login - user login
   * @param {String} email - user email
   * @param {String} password - user password
   * @return {Promise<Object|null>} - response body
   */
  register(login, email, password) {
    const url = '/api/register';
    const data = {
      login: login,
      email: email,
      password: password,
    };
    const required = ['login', 'email', 'score'];

    return this._sendRequest('POST', url, data, 'reg', required);
  }

  /**
   * API method to authorize a user
   * @param {String} login - user login
   * @param {String} password - user password
   * @return {Promise<Object|null>} - response body
   */
  authorize(login, password) {
    const url = '/api/auth';
    const data = {
      login: login,
      password: password,
    };
    const required = ['login', 'email', 'score'];

    return this._sendRequest('POST', url, data, 'log', required);
  }

  /**
   * API method to update user login and/or password
   * @param {String} newLogin - new user login
   * @param {String} newPassword - new user password
   * @return {Promise<Object|null>} - response body
   */
  updateUserInfo(newLogin, newPassword) {
    const url = '/api/profile';
    const data = {
      login: newLogin,
      password: newPassword,
    };
    const required = ['login', 'email', 'score'];

    return this._sendRequest('PUT', url, data, 'usinfo', required);
  }

  /**
   * API method to get current user's info
   * @return {Promise<Object|null>} - response body
   */
  getUserInfo() {
    const url = '/api/profile';
    const required = ['login', 'email', 'score'];

    return this._sendRequest('GET', url, {}, 'usinfo', required);
  }

  /**
   * API method to gey user list for leaderboard
   * @param {Number} page - page of the leaderboard
   * @return {Promise<Object|null>} - response body
   */
  getUsers(page) {
    const url = '/api/leaderboard/' + page;
    const required = ['users'];

    return this._sendRequest('GET', url, {}, 'uslist', required);
  }

  /**
   * API method to upload user avatar
   * @param {FormData} avatar - FormData var with avatar file
   * @return {Promise<Object|null>} - response body
   */
  uploadAvatar(avatar) {
    const url = '/api/upload_avatar';
    const required = ['login', 'email', 'avatar', 'score'];

    return this._sendRequest('POST', url, avatar, 'usinfo', required);
  }

  /**
   * API method to logout
   * @return {Promise<Object|null>} - response body
   */
  logout() {
    const url = '/api/login';

    return this._sendRequest('DELETE', url, {}, 'logout');
  }


  getUserById(hexId) {
    if (this._userMap.has(hexId)) {
      return this._userMap[hexId];
    }

    const url = '/api/user/' + hexId;
    // const required = ['login'];

    return this._sendRequest('GET', url, {}, 'usinfo')
        .then((payload) => {
          console.log(payload);
          this._userMap[hexId] = payload;
          return payload;
        });
  }
}

const apiModule = new API();
export default apiModule;
