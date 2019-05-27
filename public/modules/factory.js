'use strict';

/**
 * Factory class implementing method to add new factory methods
 */
class Factory {
  /**
   * Factory constructor
   * @param {Object} injections - injections to all
   * new classes fabricted by concrete object
   */
  constructor(injections = {}) {
    this._generalInjections = injections;
    this._constructors = new Map();
  }

  /**
   * Method to add new factory methods
   * @param {Class} C - class to be fabricated by new method
   * @param {Array} concInjections - injections to new instances of C class
   */
  addConstructor(Constructor, constructorArgs = [], {
    factoryArgs = [],
    injections = {},
  } = {}) {
    if (!Constructor) {
      return;
    }

    this._constructors[Constructor] = (...receivedArgs) => {
      const resolvedArgs = constructorArgs.map((name) => {
        const factoryArgsIndex = factoryArgs.indexOf(name);
        if (factoryArgsIndex >= 0) {
          return receivedArgs[factoryArgsIndex];
        } else if (injections.hasOwnProperty(name)) {
          return injections[name];
        } else if (this._generalInjections.hasOwnProperty(name)) {
          return this._generalInjections[name];
        } else {
          throw Error('no such attribute in received args or injections');
        }
      });
      return new Constructor(...resolvedArgs);
    };
  }
  getFabricator(Class) {
    return this._constructors[Class];
  }
}

export default Factory;
