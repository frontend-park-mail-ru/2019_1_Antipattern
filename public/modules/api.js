'use strict'

(function() {
	const noop = () => null;
  const ajax = window.AjaxModule;
  const apiPreffix = "";
	class API {
    _sendRequest(url, body, callback) {
      ajax.doPost(
        (xhr) => {
          const object = JSON.parse(xhr.response);
          if (object.type != 'reg') {
            callback('wrong_response', null)
            return
          }
          callback(object.status, object.payload);
      }, apiPreffix + url, body);
    }

		register(login, email, password, name, callback) {
      const url = '/api/register';
      const data = {
        login : login,
        email : email,
        password : password,
        name : name
      };
      _sendRequest(url, data, callback)
    }

    authorize(login, password, callback) {
      url = '/api/auth';
      const data = {
        login : login,
        password : password
      };
      _sendRequest(url, data, callback)
    }

    updateProfile(login, password, callback) {
      url = '/api/update';
    }
    
    getUserInfo(login, password, callback) {
      url = '/api/get_info'
    
    }
    
    isAuthorized(callback) {
      url = '/api/is_authorized'

    }
	}
	window.API = new API();
})();

