(function() {
	const noop = () => null;
	/** class performing Ajax requests with following callbacks. */
	class AjaxModule {

		/**
     * Make an ajax request.
     * @param {function} callback - Function to perform on xhr object.
     * @param {string} method - GET/POST method.
		 * @param {string} path - URL path for making a xhr request.
		 * @param {Object} body - context object for callbacks.
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

			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) {
					return;
				}

				callback(xhr);
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send();
			}
		}

		/**
     * Decorator with POST request logic.
     * @param {Object} - Same params as _ajax({}) func.
     */
		doGet({
			callback = noop,
			path = '/',
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
	}

	window.AjaxModule = new AjaxModule();
})();
