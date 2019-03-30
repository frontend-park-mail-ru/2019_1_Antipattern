'use strict';

/**
 * Wraps a constructor.
 * @param {constructor} C - constructor to be wrapped
 * @return {function} - wrapper function that returns a new object
 */

/**
 *
 * @param {Class} C - class to be wrapped to factory
 * @param {Array} injectedArgs - arguments to be injected in each object
 *  fabricated by returning method
 * @return {function(...[*]): C} - fabricator
 */
function wrapConstructorToFactory(C, ...injectedArgs) {
  return (...args) => new C(...args, ...injectedArgs);
}

/**
 * Shows the error message near the form's input field which contains
 *  statement caused the error
 * @param {HTMLFormElement} form - target form
 * @param {String} field - input field id
 * @param {String} errorMsg - error message
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
 * @param {HTMLFormElement} form - form to be cleaned
 */

/**
 * Cleans error messages in the target form
 * @param {HTMLFormElement} form - form to be cleaned
 */
function clearErrors(form) {
  const errors = form.getElementsByClassName('error-msg');
  Array.prototype.forEach.call(errors, (element) => {
    element.innerHTML = '';
  });
}

export {
  wrapConstructorToFactory,
  showErrorMsg,
  clearErrors,
};
