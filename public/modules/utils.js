(function() {
  function wrapConstructorToFactory(c) {
    return (...args) => new c(...args);
  }

  window.wrapConstructorToFactory = wrapConstructorToFactory;
})();
