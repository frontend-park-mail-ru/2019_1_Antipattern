'use strict';

/** class performing Ajax requests with following callbacks. */
export default class Ajax {
  /**
   * Make a fetch request.
   * @param {String} method - GET/POST/... method.
   * @param {String} path - URL path for making a xhr request.
   * @param {Object} body - context object for callbacks.
   * @return {Promise<Response>} - fetch promise returned
   * @private
   */
  doFetch({
    method = 'GET',
    path = '/',
    body = {},
  } = {}) {
    // Body must be empty with GET and HEAD requests
    if (method === 'GET' || method === 'HEAD') {
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
}
