'use strict';

class Dispatcher {
  constructor() {
    this._state = {};
    this._subscribers = {};
  }

  getState() {
    // TODO(AntonyMoes): refactor this later. May throw exceptions.
    const stateCopy = JSON.parse(JSON.stringify(this._state));
    return this._state;
  }

  subscribeEvent(key, callback) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback expected to be a function');
    }

    if (this._subscribers.key === undefined) {
      this._subscribers.key = [];
    }

    this._subscribers.key.push(callback);
  }

  unsubscribeEvent(key, callback) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback expected to be a function');
    }

    if (this._subscribers.key === undefined) {
      return;
    }

    this._subscribers.key.filter((cb) => cb !== callback);
  }

  dispatchEvent(key, value) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    if (this._subscribers.key) {
      for (const cb of this._subscribers.key) {
        cb(this.getState(), key, value);
      }
    }
  }
}

class DispatchAdapter {
  constructor(dispatcher) {
    if (!dispatcher instanceof Dispatcher) {
      throw new TypeError('instance of Dispatcher expected');
    }

    this._dispatcher = dispatcher;
  }

  dispatchEvent(key, value) {
    this._dispatcher.dispatchEvent(key, value);
  }
}

class SubscribeAdapter {
  constructor(dispatcher) {
    if (!dispatcher instanceof Dispatcher) {
      throw new TypeError('instance of Dispatcher expected');
    }

    this._dispatcher = dispatcher;
  }

  subscribeEvent(key, callback) {
    this._dispatcher.subscribeEvent(key, callback);
  }

  unsubscribeEvent(key, callback) {
    this._dispatcher.unsubscribeEvent(key, callback);
  }
}


const dispatcher = new Dispatcher();
const subscribeAdapter = new SubscribeAdapter(dispatcher);
const dispatchAdapter = new DispatchAdapter(dispatcher);

export {
  subscribeAdapter,
  dispatchAdapter,
};