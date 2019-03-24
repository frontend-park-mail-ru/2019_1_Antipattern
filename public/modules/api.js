'use strict';

//(function() {
const ajax = window.AjaxModule;
const apiPrefix = '';

class API {
  /**
   * doAjax wrapper that execs callback and passes request result and payload
   * @param {string} method - GET/POST/... method
   * @param {string} url - target URL
   * @param {string} body - request body
   * @param {string} callback - function with 1 param that get JSON-data
                                from response body
   * @param {string} type - expected response type
   * @private
   */
  _sendRequest(method, url, body, callback, type) {
    ajax.doAjax( {
      callback: (response) => {
        const reader = response.body.getReader();
        let data = new Uint8Array(0);
        return pump();

        /**
         * Function, pumping data from reader and converting to object format
         * @private
         */
        function pump() {
          reader.read().then(({done, value}) => {
            if (done) {
              if (!callback) {
                return true;
              }
              let object;
              const strBody = String.fromCharCode.apply(null, data);
              try {
                object = JSON.parse(strBody);
              } catch (SyntaxError) {
                if (callback) {
                  callback('broken_response', null);
                }
                return false;
              }

              if (response.status == 403) {
                callback('unauthorized', null);
                return false;
              }
              if (object.type !== type) {
                callback('wrong_response', null);
                return false;
              }
              callback(object.status, object.payload);
              return true;
            }
            const mergedData = new Uint8Array(data.length + value.length);
            mergedData.set(data);
            mergedData.set(value, data.length);
            data = mergedData;
            return pump();
          });
        }
      },
      path: apiPrefix + url,
      body: body,
      method: method,
    });
  }

  /**
   * API method to register a new user
   * @param {string} login - user login
   * @param {string} email - user email
   * @param {string} password - user password
   * @param {string} name - user name
   * @param {string} callback - function with 2 params that executes when
   *                            the response is returned
   */
  register(login, email, password, name, callback) {
    /* Success:
       {"type":"reg","status":"success","payload":{"login":"user_login",
         "email":"death.pa_cito@mail.yandex.ru","name":"kek"}}
       Errors:
       Already exists: {"type":"reg","status":"error","payload":{"message":
         "User already exists","field":"login"}}
    */
    const url = '/api/register';
    const data = {
      login: login,
      email: email,
      password: password,
      name: name,
    };

    this._sendRequest('POST', url, data, callback, 'reg');
  }

  /**
   * API method to authorize a user
   * @param {string} login - user login
   * @param {string} password - user password
   * @param {string} callback - function with 2 params that executes when
   *                            the response is returned
   */
  authorize(login, password, callback) {
    /* Success:
       {"type":"log","status":"success","payload":{"login":"user_login",
         "email":"death.pa_cito@mail.yandex.ru","name":"kek"}}
       Errors:
       Wrong login: {"type":"log","status":"error","payload":{"message":
        "Incorrectlogin","field":"login"}}
       Wrong password: {"type":"log","status":"error","payload":{"message":
        "Incorrectpassword","field":"password"}}
    */
    const url = '/api/auth';
    const data = {
      login: login,
      password: password,
    };


    this._sendRequest('POST', url, data, callback, 'log');
  }

  /**
   * API method to update user name and/or password
   * @param {string} newName - new user name
   * @param {string} newPassword - new user password
   * @param {string} callback - function with 2 params that executes when
   *                            the response is returned
   */
  updateUserInfo(newName, newPassword, callback) {
    /* Success:
       {"type":"usinfo","status":"success","payload":{"login":
         "fake_user_login","email":"mail@mail.ru","name":"new name"}}
       Errors:
       Not implemeted yet
    */
    const url = '/api/profile';
    const data = {
      name: newName,
      password: newPassword,
    };

    this._sendRequest('PUT', url, data, callback, 'usinfo');
  }

  /**
   * API method to get current user's info
   * @param {string} callback - function with 2 params that executes when
   *                            the response is returned
   */
  getUserInfo(callback) {
    // Request:
    // Method: "GET"
    // Url: /api/profile
    // Body: empty
    // Success:
    // {"type":"usinfo","status":"success","payload":{"login":
    //  "fake_user_login","email":"mail@mail.ru","name":"yasher"}}
    // or
    // {"type":"usinfo","status":"success","payload":{"login":
    //  "fake_user_login","email":"mail@mail.ru","name":"yasher","avatar":
    //  "/path/to/avatar.png"}}
    // expectedBody := ``  or
    // expectedBody := ``

    const url = '/api/profile';
    const data = {};

    this._sendRequest('GET', url, data, callback, 'usinfo');
  }

  /**
   * API method to gey user list for leaderboard
   * @param {number} page - page of the leaderboard
   * @return {Promise} - promise as a return value of fetch function
   */
  getUsers(page) {
    const url = '/api/leaderboard/' + page;
    return fetch(url);
    // this._sendRequest('GET', url, data, callback, 'uslist');
  }

  /**
   * API method to upload user avatar
   * @param {FormData} avatar - FormData var with avatar file
   * @param {function} callback - function with 2 params that executes when
   *                            the response is returned
   */
  uploadAvatar(avatar, callback) {
    // Request:
    // Method: "POST"
    // Url: /api/upload_avatar
    // Body: FormData object
    // Success:
    // {"type":"usinfo","status":"success","payload":{"login":
    //  "fake_user_login","email":"mail@mail.ru","name":"yasher",
    //  "score": "20", "avatar": "media/path/to/avatar.jpg"}}
    // Errors:
    // Invalid FormData: {"type":"usinfo","status":"error",
    // "payload":{"message": "Wrong request","field":"avatar"}}
    // File Open Error: {"type":"usinfo","status":"error",
    // "payload":{"message": "Error message","field":"avatar"}}
    const imgUrl = '/api/upload_avatar';

    this._sendRequest('POST', imgUrl, avatar, callback, 'usinfo');
  }
}

const apiModule = new API();
export default apiModule;


//})();

