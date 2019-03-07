(function () {

    class Router {
        constructor(rootEl) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            this._rootEl = rootEl;
            this._routeMakerFns = {};
            this._defaultRoutePath = null;
            this._currentRoute = null;
        }

        addRoute(path, routeMakerFn) {
            if (typeof path !== 'string') {
                return;
            }
            if (typeof routeMakerFn !== 'function') {
                return;
            }

            this._routeMakerFns[path] = routeMakerFn;
        }

        setDefaultRoute(path) {
            if (typeof path !== 'string') {
                return;
            }
            if (!this._routeMakerFns[path]) {
                return;
            }

            this._defaultRoutePath = path;
        }

        init() {
            this.routeTo(this._defaultRoutePath);
        }

        routeTo(path) {
            if (typeof path !== 'string') {
                return;
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

    function initAnchorsRouting(rootEl, router) {
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
    }

    window.Router = Router;
    window.initAnchorsRouting = initAnchorsRouting;

})();
