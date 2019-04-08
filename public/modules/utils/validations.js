'use strict';

/**
 * Checks whether text's length is correct
 * @param {string} text - text to check the length
 * @return {boolean} - result of a check
 * @private
 */
function correctLength(text) {
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
function correctLengthOrEmpty(text) {
  return correctLength(text) || text.length === 0;
}

/**
 * Checks whether email is correct
 * @param {string} email - email to be tested
 * @return {boolean} - result of a check
 * @private
 */
function correctEmail(email) {
  // eslint-disable-next-line
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(email.match(emailRegexp));
}

/**
 * Checks whether login is correct
 * @param {string} login - login to be tested
 * @return {boolean} - result of a check
 * @private
 */
function correctLogin(login) {
  const loginRegexp = /^[a-zA-Z0-9_]+$/;
  return Boolean(login.match(loginRegexp));
}

/**
 * Checks whether login is correct or empty
 * @param {string} login - login to be tested
 * @return {boolean} - result of a check
 * @private
 */
function correctLoginOrEmpty(login) {
  return login.length === 0 || _correctLogin(login);
}

/**
 * Validates user registration
 * @param {string} login - user login
 * @param {string} password - user password
 * @param {string} email - user email
 * @param {string} repassword - user password confirmation
 * @return {*} - error message and name of the field that caused an error
 */
export function validateRegistration(login, password,
    email = '', repassword = '') {
  if (!correctLogin(login)) {
    return {
      error: 'Login is incorrect',
      errorField: 'login',
    };
  }

  if (!correctLength(login)) {
    return {
      error: 'Login should be from 4 to 25 symbols long',
      errorField: 'login',
    };
  }

  if (!correctLength(password)) {
    return {
      error: 'Password should be from 4 to 25 symbols long',
      errorField: 'password',
    };
  }

  if (!correctEmail(email)) {
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


  return {
    error: null,
    errorField: null,
  };
}

/**
 * Validates login
 * @param {string} login - user login
 * @param {string} password - user password
 * @return {*} - error message and name of the field that caused an error
 */
export function validateLogin(login, password) {
  if (!correctLogin(login)) {
    return {
      error: 'Login is incorrect',
      errorField: 'login',
    };
  }

  if (!correctLength(login)) {
    return {
      error: 'Login should be from 4 to 25 symbols long',
      errorField: 'login',
    };
  }

  if (!correctLength(password)) {
    return {
      error: 'Password should be from 4 to 25 symbols long',
      errorField: 'password',
    };
  }

  return {
    error: null,
    errorField: null,
  };
}

/**
 * Validates user data update
 * @param {string} login - user login
 * @param {string} password - user password
 * @param {string} repassword - user password confirmation
 * @return {*} - error message and name of the field that caused an erro
 */
export function validateUpdate(login, password, repassword) {
  if (!correctLoginOrEmpty(login)) {
    return {
      error: 'New login is incorrect',
      errorField: 'login',
    };
  }

  if (!correctLengthOrEmpty(login)) {
    return {
      error: 'Login should be empty or from 4 to 25 symbols long',
      errorField: 'login',
    };
  }

  if (!correctLengthOrEmpty(password)) {
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
