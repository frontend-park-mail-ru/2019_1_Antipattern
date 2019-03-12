'use strict';

(function() {
  class BaseValidator {
    /**
     * Checks whether text's length is correct
     * @param {string} text - text to check the length
     * @return {boolean} - result of a check
     * @private
     */
    _correctLength(text) {
      const MIN_LEN = 4;
      const MAX_LEN = 25;

      return text.length >= MIN_LEN && text.length <= MAX_LEN;
    }

    /**
     * Checks whether text's length is correct or text is empty
     * @param {string} text - text to check the length
     * @return {boolean} - result of a check
     * @private
     */
    _correctLengthOrEmpty(text) {
      return this._correctLength(text) || text.length === 0;
    }

    /**
     * Checks whether email is correct
     * @param {string} email - email to be tested
     * @return {boolean} - result of a check
     * @private
     */
    _correctEmail(email) {
      // eslint-disable-next-line
      const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return Boolean(email.match(emailRegexp));
    }

    /**
     * Checks whether username is correct
     * @param {string} username - username to be tested
     * @return {boolean} - result of a check
     * @private
     */
    _correctUsername(username) {
      const usernameRegexp = /^[a-zA-Z0-9 .-_]+$/;
      return Boolean(username.match(usernameRegexp));
    }

    /**
     * Checks whether username is correct or empty
     * @param {string} username - username to be tested
     * @return {boolean} - result of a check
     * @private
     */
    _correctUsernameOrEmpty(username) {
      return username.length === 0 || this._correctUsername(username);
    }

    /**
     * Checks whether login is correct
     * @param {string} login - login to be tested
     * @return {boolean} - result of a check
     * @private
     */
    _correctLogin(login) {
      const loginRegexp = /^[a-zA-Z0-9_]+$/;
      return Boolean(login.match(loginRegexp));
    }

    /**
     * Validates user registration or login
     * @param {string} login - user login
     * @param {string} password - user password
     * @param {string} username - user name
     * @param {string} email - user email
     * @param {string} repassword - user password confirmation
     * @return {*} - error message and name of the field that caused an error
     */
    validateLogReg(login, password, username = '',
        email = '', repassword = '') {
      const validator = window.BaseValidator;
      if (!validator._correctLogin(login)) {
        return {
          error: 'Login is incorrect',
          errorField: 'login',
        };
      }

      if (!validator._correctLength(login)) {
        return {
          error: 'Login should be from 4 to 25 symbols long',
          errorField: 'login',
        };
      }

      if (!validator._correctLength(password)) {
        return {
          error: 'Password should be from 4 to 25 symbols long',
          errorField: 'password',
        };
      }

      if (username !== '' && email !== '' && repassword !== '') {
        if (!validator._correctUsername(username)) {
          return {
            error: 'Name should consist on a-z, A-Z and 0-9',
            errorField: 'username',
          };
        }

        if (!validator._correctLength(username)) {
          return {
            error: 'Name should be from 4 to 25 symbols long',
            errorField: 'username',
          };
        }

        if (!validator._correctEmail(email)) {
          return {
            error: 'Email is incorrect',
            errorField: 'email',
          };
        }

        if (password !== repassword) {
          return {
            error: 'Passwords do not match',
            errorField: 'repeat_password',
          };
        }
      }

      return {
        error: null,
        errorField: null,
      };
    }

    /**
     * Validates user data update
     * @param {string} username - user name
     * @param {string} password - user password
     * @param {string} repassword - user password confirmation
     * @return {*} - error message and name of the field that caused an erro
     */
    validateUpdate(username, password, repassword) {
      console.log(username);
      console.log(password);
      console.log(repassword);
      const validator = window.BaseValidator;
      if (!validator._correctUsernameOrEmpty(username)) {
        return {
          error: 'New username is incorrect',
          errorField: 'username',
        };
      }

      if (!validator._correctLengthOrEmpty(username)) {
        return {
          error: 'Username should be empty or from 4 to 25 symbols long',
          errorField: 'username',
        };
      }

      if (!validator._correctLengthOrEmpty(password)) {
        return {
          error: 'Password should be from 4 to 25 symbols long',
          errorField: 'password',
        };
      }

      if (password !== repassword) {
        return {
          error: 'Passwords do not match',
          errorField: 'repeat_password',
        };
      }

      return {
        error: null,
        errorField: null,
      };
    }
  }

  window.BaseValidator = new BaseValidator();
})();
