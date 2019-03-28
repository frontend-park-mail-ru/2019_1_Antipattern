'use strict';

class Factory {
  constructor(...injections) {
    this._injections = injections;
  }

  addConstructor(C, ...args) {
    this['new' + C.name] = () => new C(...args, ...this._injections);
  }
}

export default Factory;