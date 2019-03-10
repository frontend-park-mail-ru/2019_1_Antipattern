'use strict';

(function() {
    const noop = () => null;
    const ajax = window.AjaxModule;
    const apiPrefix = "";

    class API {
        _sendRequest(url, body, callback, type) {
            ajax.doPost( {
                callback: (xhr) => {
                    let object;
                    try {
                        alert(xhr.response);
                        object = JSON.parse(xhr.response);
                    }
                    catch (SyntaxError) {
                        if (callback) {
                            callback('broken_response', null);
                        }
                    }

                    if (!callback) {
                        return
                    }
                    if (object.type !== type) {
                        callback('wrong_response', null);
                        return
                    }

                    callback(object.status, object.payload);
                },
                path : apiPrefix + url,
                body : body
            });
        }

        register(login, email, password, name, callback) {
            const url = '/api/register';
            const data = {
                login : login,
                email : email,
                password : password,
                name : name
            };

            this._sendRequest(url, data, callback, 'register')
        }

        authorize(login, password, callback) {
            const url = '/api/auth';
            const data = {
                login : login,
                password : password
            };

            this._sendRequest(url, data, callback, 'auth')
        }

        updateProfile(newName, newPassword, callback) {
            const url = '/api/update';
            const data = {
                name : login,
                password : password
            };

            this._sendRequest(url, data, callback, 'auth')
        }

        getUserInfo(login, password, callback) {
            const url = '/api/get_info'
        }

        isAuthorized(callback) {
            const url = '/api/is_authorized'
        }
    }

    window.API = new API();
})();

