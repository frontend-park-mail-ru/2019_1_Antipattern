'use strict';

import ajax from './ajax.js';

const apiPrefix = 'https://api.kpacubo.xyz'; // use upstream api; change to blank for local

/**
 * Class containing methods working with application's API
 */
class API {
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
  _sendRequest(method, url, body, type) {
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

    return this._sendRequest('POST', url, data, 'reg');
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

    return this._sendRequest('POST', url, data, 'log');
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

    return this._sendRequest('PUT', url, data, 'usinfo');
  }

  /**
   * API method to get current user's info
   * @return {Promise<Object|null>} - response body
   */
  getUserInfo() {
    const url = '/api/profile';
    const data = {};

    return this._sendRequest('GET', url, data, 'usinfo');
  }

  /**
   * API method to gey user list for leaderboard
   * @param {Number} page - page of the leaderboard
   * @return {Promise<Object|null>} - response body
   */
  getUsers(page) {
    const url = '/api/leaderboard/' + page;

    return this._sendRequest('GET', url, {}, 'uslist');
  }

  /**
   * API method to upload user avatar
   * @param {FormData} avatar - FormData var with avatar file
   * @return {Promise<Object|null>} - response body
   */
  uploadAvatar(avatar) {
    const imgUrl = '/api/upload_avatar';

    return this._sendRequest('POST', imgUrl, avatar, 'usinfo');
  }

  /**
   * API method to logout
   * @return {Promise<Object|null>} - response body
   */
  logout() {
    const logoutUrl = '/api/login';
    const data = {};

    return this._sendRequest('DELETE', logoutUrl, data, 'logout');
  }
}

const apiModule = new API();
export default apiModule;
