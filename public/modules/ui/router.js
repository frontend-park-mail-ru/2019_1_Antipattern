'use strict';

/**
 * Class used to manage views (routes) switching
 */
export class Router {
  /**
   * Router constructor
   * @param {Node} rootEl - DOM element
   */
  constructor(rootEl) {
    if (!(rootEl instanceof Node)) {
      throw new TypeError('rootEl must be Node');
    }
    this._rootEl = rootEl;
    this._routeMakerFns = {};
    this._defaultRoutePath = null;
    this._currentRoute = null;
  }

  /**
   * Adds route to the router
   * @param {String} path - url
   * @param {Function} routeMakerFn - function returning new Route object
   */
  addRoute(path, routeMakerFn) {
    if (typeof path !== 'string') {
      return;
    }
    if (typeof routeMakerFn !== 'function') {
      return;
    }

    this._routeMakerFns[path] = routeMakerFn;
  }

  /**
   * Sets default route
   * @param {String} path - url
   */
  setDefaultRoute(path) {
    if (typeof path !== 'string') {
      return;
    }
    if (!this._routeMakerFns[path]) {
      return;
    }

    this._defaultRoutePath = path;
  }

  /**
   * Initializes the router
   */
  init() {
    this.routeTo(this._defaultRoutePath, false);
  }

  /**
   * Redirects and renders required page
   * @param {String} path - url
   */
  routeTo(path, shouldBePushed = true) {
    if (typeof path !== 'string') {
      return;
    }

    if (shouldBePushed) {
      console.log('Pushing', path);

      // TODO: maybe we shouldn't push logout?
      history.pushState(null, null, path);
    } else {
      console.log('Poping', path);
    }

    if (this._currentRoute) {
      if (this._currentRoute.deinit) {
        this._currentRoute.deinit();
      }
      this._currentRoute = null;
    }

    const routeMakerFn = this._routeMakerFns[path];
    if (!routeMakerFn) {
      return;
    }

    const route = routeMakerFn(this._rootEl, this);
    if (!route) {
      return;
    }

    if (route.init) {
      route.init();
    }
    this._currentRoute = route;
  }
}

/**
 * Anchors routes on link by event listeners
 * @param {Node} rootEl - DOM element
 * @param {Router} router - router object
 */
export function initAnchorsRouting(rootEl, router) {
  if (!(rootEl instanceof Node)) {
    return;
  }
  if (!(router instanceof Router)) {
    return;
  }

  rootEl.addEventListener('click', (ev) => {
    if (!(ev.target instanceof HTMLAnchorElement)) {
      return;
    }

    ev.preventDefault();

    const path = ev.target.getAttribute('href');
    router.routeTo(path);
    console.log(`<a> go to ${path}`);
  });

  window.addEventListener('popstate', function(e) {
    console.log(location.pathname);
    router.routeTo(location.pathname, false);
  }, false);
}
