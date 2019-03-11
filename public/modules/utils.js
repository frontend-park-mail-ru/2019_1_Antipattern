(function() {
  function wrapConstructorToFactory(C) {
    return (...args) => new C(...args);
  }

  window.wrapConstructorToFactory = wrapConstructorToFactory;
})();
