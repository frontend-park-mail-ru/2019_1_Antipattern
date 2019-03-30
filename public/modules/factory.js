'use strict';

/**
 * Factory class implementing method to add new factory methods
 */
class Factory {
  /**
   * Factory constructor
   * @param {Array} injections - injections to all
   * new classes fabricted by concrete object
   */
  constructor(...injections) {
    this._injections = injections;
  }

  /**
   * Method to add new factory methods
   * @param {Class} C - class to be fabricated by new method
   * @param {Array} concInjections - injections to new instances of C class
   */
  addConstructor(C, ...concInjections) {
    this['new' + C.name] = (...args) =>
      new C(...args, ...concInjections, ...this._injections);
  }
}

export default Factory;
