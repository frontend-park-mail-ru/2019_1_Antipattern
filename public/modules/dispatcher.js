'use strict';

/**
 * State holder capable of dispatching events
 */
class Dispatcher {
  /**
   * Dispatcher constructor
   */
  constructor() {
    this._state = {};
    this._subscribers = {};
  }

  /**
   * Returns dispatcher's state copy
   * @return {Object} - state
   */
  getState() {
    // TODO: make deep copy w/ methods n shiet
    // return JSON.parse(JSON.stringify(this._state));
    return this._state;
  }

  /**
   * Subscribes callback to a specific event type
   * @param {String} key - event type
   * @param {Function} callback - callback to be subscribed
   */
  subscribeEvent(key, callback) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback expected to be a function');
    }

    if (this._subscribers[key] === undefined) {
      this._subscribers[key] = [];
    }

    this._subscribers[key].push(callback);
  }

  /**
   * Unsubscribes callback from a specific event type
   * @param {String} key - event type
   * @param {Function} callback - callback to be unsubscribed
   */
  unsubscribeEvent(key, callback) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback expected to be a function');
    }

    if (this._subscribers[key] === undefined) {
      return;
    }

    const index = this._subscribers[key].indexOf(callback);
    if (index === -1) {
      return;
    }
    this._subscribers[key].splice(index, 1);
  }

  /**
   * Dispatches new event that modifies internal state
   * @param {String} key - event type
   * @param {*} value - event data
   */
  dispatchEvent(key, value) {
    if (typeof key !== 'string') {
      throw new TypeError('key expected to be string');
    }

    this._state[key] = value;

    if (this._subscribers[key]) {
      for (const cb of this._subscribers[key]) {
        cb(this.getState(), key, value);
      }
    }
  }
}

/**
 * Dispatcher adapter allowing to dispatch events
 */
class DispatchAdapter {
  /**
   * DispatchAdapter constructor
   * @param {Dispatcher} dispatcher - dispatcher to be adapted
   */
  constructor(dispatcher) {
    if (!dispatcher instanceof Dispatcher) {
      throw new TypeError('instance of Dispatcher expected');
    }

    this._dispatcher = dispatcher;
  }

  /**
   * See Dispatcher.dispatchEvent()
   * @param {String} key - event type
   * @param {*} value - event data
   */
  dispatchEvent(key, value) {
    this._dispatcher.dispatchEvent(key, value);
  }

  /**
   * See Dispatcher.getState()
   * @return {Object} - state
   */
  getState() {
    return this._dispatcher.getState();
  }
}

/**
 * Dispatcher adapter allowing to (un)subscribe (from)to events
 */
class SubscribeAdapter {
  /**
   * SubscribeAdapter constructor
   * @param {Dispatcher} dispatcher - dispatcher to be adapted
   */
  constructor(dispatcher) {
    if (!dispatcher instanceof Dispatcher) {
      throw new TypeError('instance of Dispatcher expected');
    }

    this._dispatcher = dispatcher;
  }

  /**
   * See Dispatcher.subscribeEvent()
   * @param {String} key - event type
   * @param {Function} callback - callback to be subscribed
   */
  subscribeEvent(key, callback) {
    this._dispatcher.subscribeEvent(key, callback);
  }

  /**
   * See Dispatcher.unsubscribeEvent()
   * @param {String} key - event type
   * @param {Function} callback - callback to be unsubscribed
   */
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
