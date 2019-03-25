'use strict';

/**
 * Wraps a constructor.
 * @function
 * @param {constructor} C - constructor to be wrapped
 * @return {function} - wrapper function that returns a new object
 */
function wrapConstructorToFactory(C) {
  return (...args) => new C(...args);
}

/**
 * Shows the `errMsg` in the div block with the error-msg class,
 * located in the `form` after input with id = `field`.
 * Example:
 * <input type="" id="field">
 * <div class="error-msg">{message will be here}</div>
 * @function
 * @param {object HTMLFormElement} form - invalid form
 * @param {string} field - input field id
 * @param {string} errorMsg - error message
 */
function showErrorMsg(form, field, errorMsg) {
  const errorInput = form.elements[field];
  const errorElement = document.createElement('p');
  errorElement.setAttribute('style', 'margin: 0;');
  errorElement.innerText = errorMsg;
  errorInput.nextElementSibling.appendChild(errorElement);
}

/**
 * Clear all div blocks with error-msg class in this form, like a:
 * <div class="error-msg"><p>error</p></div>
 * @function
 * @param {object HTMLFormElement} form - form to be cleaned
 */
function clearErrors(form) {
  const errors = form.getElementsByClassName('error-msg');
  Array.prototype.forEach.call(errors, (element) => {
    element.innerHTML = '';
  });
}

//window.wrapConstructorToFactory = wrapConstructorToFactory;
//window.showErrorMsg = showErrorMsg;
//window.clearErrors = clearErrors;
export {
  wrapConstructorToFactory,
  showErrorMsg,
  clearErrors
};
