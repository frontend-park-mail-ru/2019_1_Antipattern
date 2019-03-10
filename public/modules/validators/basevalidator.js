'use strict';

(function() {
	class BaseValidator {
		_correctLength(text) {
            const MIN_LEN = 4;
            const MAX_LEN = 25;

            return text.length >= MIN_LEN && text.length <= MAX_LEN;
        }

        _correctEmail(email) {
            const email_regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return email.match(email_regexp);

        }

        _correctUsername(username) {
            const username_regexp = /^[a-zA-Z0-9 .-_]+$/;
            return username.match(username_regexp);

        }

        _correctLogin(login) {
            const login_regexp = /^[a-zA-Z0-9_]+$/;
            return login.match(login_regexp);

        }

        validateLogReg(login, password, username = null, email = null, repassword = null) {
            let validator = window.BaseValidator;
            if (!validator._correctLogin(login)) {
                return {
                    error: "Login is incorrect",
                    errorField: "login"
                };
            }

            if (!validator._correctLength(login)) {
                return {
                    error: "Login should be from 4 to 25 symbols long",
                    errorField: "login"
                };
            }

            if (!validator._correctLength(password)) {
                return {
                    error: "Password should be from 4 to 25 symbols long",
                    errorField: "password"
                };
            }

            if (username !== null && email !== null && repassword !== null) {
                if (!validator._correctUsername(username)) {
                    return {
                        error: "Name should consist on a-z, A-Z and 0-9",
                        errorField: "name"
                    };
                }

                if (!validator._correctLength(username)) {
                    return {
                        error: "Name should be from 4 to 25 symbols long",
                        errorField: "name"
                    };
                }

                if (!validator._correctEmail(email)) {
                    return {
                        error: "Email is incorrect",
                        errorField: "email"
                    };
                }

                if (password !== repassword) {
                    return {
                        error: "Passwords do not match",
                        errorField: "repassword"
                    };
                }
            }


            return {
                error: null,
                errorField: null
            };
        }
	}

	window.BaseValidator = new BaseValidator();
})();
