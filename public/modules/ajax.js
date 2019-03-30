'use strict';

/** class performing Ajax requests with following callbacks. */
class AjaxModule {
  /**
   * Make a fetch request.
   * @param {string} method - GET/POST/... method.
   * @param {string} path - URL path for making a xhr request.
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

const ajaxModule = new AjaxModule();
export default ajaxModule;
