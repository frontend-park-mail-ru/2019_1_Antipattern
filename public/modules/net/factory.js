'use strict';

import Factory from '../utils/factory.js';
import Ajax from './ajax.js';
import API from './api.js';

export default function makeNetFactory() {
  const f = new Factory();

  f.addConstructor(Ajax, [], {
    singleton: true
  });
  f.addConstructor(API, ['ajax'], { 
    injections: { 
      ajax: f.resolvingAjax() 
    },
    singleton: true
  });

  return f;
}
