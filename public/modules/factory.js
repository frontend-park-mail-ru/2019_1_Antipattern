'use strict';

class Factory {
  constructor(...injections) {
    this._injections = injections;
  }

  addConstructor(C, ...args) {
    this['new' + C.name] = () => new C(...args, ...this._injections);
    console.log('new' + C.name);
    console.log(this['new' + C.name]);
  }
}

export default Factory;