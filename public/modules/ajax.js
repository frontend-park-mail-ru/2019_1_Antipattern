'use strict';

/** class performing Ajax requests with following callbacks. */
class AjaxModule {
  /**
   * Make an ajax request.
   * @param {function} callback - Function to perform on xhr object.
   * @param {string} method - GET/POST/... method.
   * @param {string} path - URL path for making a xhr request.
   * @param {Object} body - context object for callbacks.
   * @private
   */
  _ajax({
    method = 'GET',
    path = '/',
    body = {},
  } = {}) {
    // Body must be empty with GET and HEAD requests
    if (method == 'GET' || method == 'HEAD') {
      return fetch(path, {
        method: method,
        mode: 'cors',
        credentials: 'include',
      });
    } else {
      let headers = {};
      let bodyToSend = '';
      if (body instanceof FormData) {
        bodyToSend = body;
      } else if (body) {
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
        };
        bodyToSend = JSON.stringify(body);
      }

      return fetch(path, {
        method: method,
        body: bodyToSend,
        headers: headers,
        mode: 'cors',
        credentials: 'include',
      });
    }
  }

  /**
   * Decorator with GET request logic.
   * @param {Object} - Same params as _ajax({}) func.
   */
  doGet({
    path = '/api/',
    body = {},
  } = {}) {
    return this._ajax({
      path,
      body,
      method: 'GET',
    });
  }

  /**
   *  Decorator with POST request logic.
   * @param {Object} - Same params as _ajax({}) func.
   */
  doPost({
    path = '/',
    body = {},
  } = {}) {
    return this._ajax({
      path,
      body,
      method: 'POST',
    });
  }

  /**
   *  Decorator with PUT request logic.
   * @param {Object} - Same params as _ajax({}) func.
   */
  doPut({
    path = '/',
    body = {},
  } = {}) {
    return this._ajax({
      path,
      body,
      method: 'PUT',
    });
  }

  /**
   *  Decorator with DELETE request logic.
   * @param {Object} - Same params as _ajax({}) func.
   */
  doDelete({
    path = '/',
    body = {},
  } = {}) {
    return this._ajax({
      path,
      body,
      method: 'DELETE',
    });
  }

  /**
   *  Decorator for custom request.
   * @param {Object} - Same params as _ajax({}) func.
   */
  doAjax({
    path = '/',
    body = {},
    method = 'GET',
  } = {}) {
    return this._ajax({
      path,
      body,
      method: method,
    });
  }
}

const ajaxModule = new AjaxModule();
export default ajaxModule;
