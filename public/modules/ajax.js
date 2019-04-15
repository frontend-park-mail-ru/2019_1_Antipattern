(function() {
  const noop = () => null;
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
      callback = noop,
      method = 'GET',
      path = '/',
      body = {},
    } = {}) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, path, true);
      xhr.withCredentials = true;

      if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return;
        }

        callback(xhr);
      };

      if (body) {
        xhr.send(JSON.stringify(body));
        // TODO: if method == 'GET' convert body to query-params
      } else {
        xhr.send();
      }
    }

    /**
     * Decorator with GET request logic.
     * @param {Object} - Same params as _ajax({}) func.
     */
    doGet({
      callback = noop,
      path = '/api/',
      body = {},
    } = {}) {
      this._ajax({
        callback,
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
      callback = noop,
      path = '/',
      body = {},
    } = {}) {
      this._ajax({
        callback,
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
      callback = noop,
      path = '/',
      body = {},
    } = {}) {
      this._ajax({
        callback,
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
      callback = noop,
      path = '/',
      body = {},
    } = {}) {
      this._ajax({
        callback,
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
      callback = noop,
      path = '/',
      body = {},
      method = 'GET',
    } = {}) {
      this._ajax({
        callback,
        path,
        body,
        method: method,
      });
    }
  }

  window.AjaxModule = new AjaxModule();
})();
