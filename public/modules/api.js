'use strict';

(function() {
  const noop = () => null;
  const ajax = window.AjaxModule;
  const apiPrefix = '';

  class API {
    _sendRequest(method, url, body, callback, type) {
      ajax.doAjax( {
        callback: (xhr) => {
          let object;

          if (!callback) {
            return true;
          }

          try {
            object = JSON.parse(xhr.response);
          } catch (SyntaxError) {
            if (callback) {
              callback('broken_response', null);
            }
            return false;
          }

          if (xhr.status == 403) {
            callback('unauthorized', null);
            return false;
          }
          if (object.type !== type) {
            callback('wrong_response', null);
            return false;
          }

          callback(object.status, object.payload);
          return true;
        },
        path: apiPrefix + url,
        body: body,
        method: method,
      });
    }

    register(login, email, password, name, callback) {
      // Success:
      // {"type":"reg","status":"success","payload":{"login":"user_login","email":"death.pa_cito@mail.yandex.ru","name":"kek"}}
      // Errors:
      // Already exists: {"type":"reg","status":"error","payload":{"message":"User already exists","field":"login"}}

      const url = '/api/register';
      const data = {
        login: login,
        email: email,
        password: password,
        name: name,
      };

      this._sendRequest('POST', url, data, callback, 'reg');
    }

    authorize(login, password, callback) {
      // Success:
      // {"type":"log","status":"success","payload":{"login":"user_login","email":"death.pa_cito@mail.yandex.ru","name":"kek"}}
      // Errors:
      // Wrong login: {"type":"log","status":"error","payload":{"message":"Incorrectlogin","field":"login"}}
      // Wrong password: {"type":"log","status":"error","payload":{"message":"Incorrectpassword","field":"password"}}
      const url = '/api/auth';
      const data = {
        login: login,
        password: password,
      };


      this._sendRequest('POST', url, data, callback, 'log');
    }

    updateUserInfo(newName, newPassword, callback) {
      // Success:
      // {"type":"usinfo","status":"success","payload":{"login":"fake_user_login","email":"mail@mail.ru","name":"new name"}}
      // Errors:
      // Not implemeted yet
      const url = '/api/profile';
      const data = {
        name: newName,
        password: newPassword,
      };

      this._sendRequest('PUT', url, data, callback, 'usinfo');
    }

    getUserInfo(callback) {
      // Request:
      // Method: "GET"
      // Url: /api/profile
      // Body: empty
      // Success:
      // {"type":"usinfo","status":"success","payload":{"login":"fake_user_login","email":"mail@mail.ru","name":"yasher"}}
      // or
      // {"type":"usinfo","status":"success","payload":{"login":"fake_user_login","email":"mail@mail.ru","name":"yasher","avatar":"/path/to/avatar.png"}}
      // expectedBody := ``  or
      // expectedBody := ``

      const url = '/api/profile';
      const data = {};

      this._sendRequest('GET', url, data, callback, 'usinfo');
    }

    getUsers(page, callback) {
      const url = '/api/leaderboard/' + page;
      const data = {};

      this._sendRequest('GET', url, data, callback, 'uslist');
    }
  }

  window.API = new API();
})();

