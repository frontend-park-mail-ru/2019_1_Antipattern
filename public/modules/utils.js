(function() {
  /**
   * Wraps a constructor.
   * @function
   * @param {constructor} C - constructor to be wrapped
   * @return {function} - wrapper function that returns a new object
   */
  function wrapConstructorToFactory(C) {
    return (...args) => new C(...args);
  }

  function showErrorMsg(form, field, errorMsg) {
    const errorInput = form.elements[field];
    const errorElement = document.createElement('p');
    errorElement.setAttribute('style', 'margin: 0;');
    errorElement.innerText = errorMsg;
    errorInput.nextElementSibling.appendChild(errorElement);
  }

  function clearErrors(form) {
    let errors = form.getElementsByClassName('error-msg');
    Array.prototype.forEach.call(errors, (element) => {
      element.innerHTML = '';
    });
  }

  window.wrapConstructorToFactory = wrapConstructorToFactory;
  window.showErrorMsg = showErrorMsg;
  window.clearErrors = clearErrors;
})();
