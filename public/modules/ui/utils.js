'use strict';

/**
 * Shows the error message near the form's input field which contains
 *  statement caused the error
 * @param {HTMLFormElement} form - target form
 * @param {String} field - input field id
 * @param {String} errorMsg - error message
 */
export function showErrorMsg(form, field, errorMsg) {
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
export function clearErrors(form) {
  const errors = form.getElementsByClassName('error-msg');
  Array.prototype.forEach.call(errors, (element) => {
    element.innerHTML = '';
  });
}
