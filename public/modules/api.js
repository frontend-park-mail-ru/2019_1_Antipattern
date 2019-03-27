'use strict';

import ajax from './ajax.js';
const apiPrefix = '';

class API {
  /**
   * doAjax wrapper that execs callback and passes request result and payload
   * @param {string} method - GET/POST/... method
   * @param {string} url - target URL
   * @param {*} body - request body
   * @param {string} type - expected response type
   * @private
   */
  _sendRequest(method, url, body, type) {
    return ajax.doAjax( {
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
          // const resp = response.body;
        })
        .then((data) => {
          if (data && data.status !== 'success') {
            throw data;
          }

          return data;
        });
  }

  /**
   * API method to register a new user
   * @param {string} login - user login
   * @param {string} email - user email
   * @param {string} password - user password
   */
  register(login, email, password) {
    const url = '/api/register';
    const data = {
      login: login,
      email: email,
      password: password,
    };

    return this._sendRequest('POST', url, data, 'reg')
        .then((response) => {
          if (response.type !== 'reg') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to authorize a user
   * @param {string} login - user login
   * @param {string} password - user password
   */
  authorize(login, password) {
    const url = '/api/auth';
    const data = {
      login: login,
      password: password,
    };


    return this._sendRequest('POST', url, data, 'log')
        .then((response) => {
          if (response.type !== 'log') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to update user login and/or password
   * @param {string} newLogin - new user login
   * @param {string} newPassword - new user password
   */
  updateUserInfo(newLogin, newPassword) {
    const url = '/api/profile';
    const data = {
      login: newLogin,
      password: newPassword,
    };

    return this._sendRequest('PUT', url, data, 'usinfo')
        .then((response) => {
          if (response.type !== 'usinfo') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to get current user's info
   */
  getUserInfo() {
    const url = '/api/profile';
    const data = {};

    return this._sendRequest('GET', url, data, 'usinfo')
        .then((response) => {
          if (response.type !== 'usinfo') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to gey user list for leaderboard
   * @param {number} page - page of the leaderboard
   * @return {Promise} - promise as a return value of fetch function
   */
  getUsers(page) {
    const url = '/api/leaderboard/' + page;

    return this._sendRequest('GET', url, {}, 'uslist')
        .then((response) => {
          if (response.type !== 'uslist') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to upload user avatar
   * @param {FormData} avatar - FormData var with avatar file
   * @param {function} callback - function with 2 params that executes when
   *                            the response is returned
   */
  uploadAvatar(avatar) {
    const imgUrl = '/api/upload_avatar';

    return this._sendRequest('POST', imgUrl, avatar, 'usinfo')
        .then((response) => {
          if (response.type !== 'usinfo') {
            throw 'wrong response type';
          }

          return response.payload;
        });
  }

  /**
   * API method to logout
   * @return {Boolean} - true, if logout was successfull
   */
  logout() {
    const logoutUrl = '/api/login';
    const data = {};

    return this._sendRequest('DELETE', logoutUrl, data, 'logout');
  }
}

const apiModule = new API();
export default apiModule;
