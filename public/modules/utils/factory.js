'use strict';

/**
 * Factory class implementing method to add new factory methods
 */
export default class Factory {
  /**
   * Factory constructor
   * @param {Object} injections - injections to all
   * new classes fabricted by concrete object
   */
  constructor(injections = {}) {
    this._generalInjections = injections;
    this._singletons = {};
  }

  /**
   * Method to add new factory methods
   * @param {Class} C - class to be fabricated by new method
   * @param {Array} concInjections - injections to new instances of C class
   */
  addConstructor(Constructor, constructorArgs = [], {
    factoryArgs = [],
    injections = {},
    singleton = false
  } = {}) {
    if (!Constructor) {
      return;
    }

    this['new' + Constructor.name] = 
        this._new.bind(this, Constructor, constructorArgs, factoryArgs, injections, singleton);
    this['resolving' + Constructor.name] = 
        this._resolve.bind(this, Constructor, constructorArgs, injections, singleton);
  }

  _new(Constructor, constructorArgsNames, factoryArgsNames, injections, isSingleton, ...receivedArgs) {
    let ctx = {};

    for (let k in this._generalInjections) {
      ctx[k] = this._generalInjections[k];
    }
    for (let k in injections) {
      ctx[k] = injections[k];
    }
    for (let i = 0; i < factoryArgsNames.length && i < receivedArgs.length; i++) {
      ctx[factoryArgsNames[i]] = receivedArgs[i];
    }

    return this._constructRespectingSingletons(Constructor, constructorArgsNames, isSingleton, ctx);
  }

  _resolving(Constructor, constructorArgsNames, injections, isSingleton) {
    return new ResolvingInjection(Constructor, constructorArgsNames, injections, this._generalInjections, isSingleton, this);
  }

  _constructRespectingSingletons(Constructor, constructorArgsNames, isSingleton, ctx) {
    if (isSingleton && this._singletons.hasOwnProperty(Constructor.name)) {
      return this._singletons[Constructor.name];
    }

    const obj = this._construct(Constructor, constructorArgsNames, ctx);

    if (isSingleton) {
      this._singletons[Constructor.name] = obj;
    }

    return obj;
  }

  _construct(Constructor, constructorArgsNames, ctx) {
    const resolvedArgs = constructorArgsNames.map((name) => {
      if (ctx.hasOwnProperty(name)) {
        if (ctx[name] instanceof ResolvingInjection) {
          return ctx[name].construct(ctx);
        }
        return ctx[name];
      } else {
        throw Error(`failed constructing ${Constructor.name}: no attribute ${name} in received args or injections`);
      }
    });

    return new Constructor(...resolvedArgs);
  }
}

class ResolvingInjection {
  constructor(Constructor, constructorArgsNames, injections, generalInjections, isSingleton, factory) {
    this._Constructor = Constructor; 
    this._constructorArgsNames = constructorArgsNames; 
    this._injections = injections; 
    this._generalInjections = generalInjections;
    this._isSingleton = isSingleton;
    this._factory = factory;
  }

  construct(callerCtx) {
    let ctx = {};

    for (let k in this._generalInjections) {
      ctx[k] = this._generalInjections[k];
    }
    for (let k in this._injections) {
      ctx[k] = injections[k];
    }
    for (let k in callerCtx) {
      ctx[k] = callerCtx[k];
    }

    this._factory._constructRespectingSingletons(this._Constructor, this._constructorArgsNames, this._isSingleton, ctx);
  }
}
