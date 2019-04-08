'use strict';

import {Dispatcher, DispatchAdapter, SubscribeAdapter} from './controllers.js';

export default function makeDataFactory() {
  const f = new Factory();

  f.addConstructor(Dispatcher, [], {
    singleton: true
  });
  f.addConstructor(DispatchAdapter, ['dispatcher'], {
    injections: {
      dispatcher: f.resolvingDispatcher()
    },
    singleton: true
  });
  f.addConstructor(SubscribeAdapter, ['dispatcher'], {
    injections: {
      dispatcher: f.resolvingDispatcher()
    },
    singleton: true
  });

  return f;
}
