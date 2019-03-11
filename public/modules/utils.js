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

  window.wrapConstructorToFactory = wrapConstructorToFactory;
})();
