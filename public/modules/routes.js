(function() {
  class BaseRoute {
    /**
     * Default BaseRoute constructor
     * @param {Node} rootEl - DOM element
     * @param {function} router - route object
     */
    constructor(rootEl, router) {
      if (!(rootEl instanceof Node)) {
        throw new TypeError('rootEl must be Node');
      }
      if (!(router instanceof Router)) {
        throw new TypeError('router must be Router');
      }

      this._rootEl = rootEl;
      this._router = router;
      this._eventHandlers = {};
    }

    _addListener(event, handler) {
      if (!(event in this._eventHandlers)) {
        this._eventHandlers[event] = [];
      }

      this._eventHandlers[event].push(handler);
      this._rootEl.addEventListener(event, handler);
    }

    _removeAllListeners(event) {
      if (event in this._eventHandlers) {
        const eventHandlers = this._eventHandlers[event];
        for (let i = eventHandlers.length; i--;) {
          const handler = eventHandlers[i];
          this._rootEl.removeEventListener(event, handler);
        }
      }
    }

    /**
     * Inits route
     */
    init() {}

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
      for (event in this._eventHandlers) {
        if (this._eventHandlers.hasOwnProperty(event)) {
          this._removeAllListeners(event);
        }
      }
    }
  }

  class IndexRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      this._rootEl.innerHTML = Handlebars.templates['menu.html']({
        isAuthorized: window.User,
      });
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  class LoginRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      this._rootEl.innerHTML = Handlebars.templates['login.html']();
      this._addListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        window.clearErrors(form);

        const login = form.elements['login'].value;
        const password = form.elements['password'].value;

        const errorStruct = window.BaseValidator.validateLogin(login,
            password);
        const error = errorStruct.error;
        const errorField = errorStruct.errorField;

        if (error !== null) {
          window.showErrorMsg(form, errorField, error);
          return;
        }

        window.API.authorize(login, password, (status, object) => {
          if (status === 'success') {
            const image = object.avatar || null;
            window.User = new window.UserModel(object.name, object.email,
                object.login, object.score, image);
            this._router.routeTo('/');
          } else {
            window.showErrorMsg(form, object.field, object.message);
          }
        });
      });
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  class SettingsRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      this._rootEl.innerHTML = Handlebars.templates['settings.html']();
      this._addListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        window.clearErrors(form);

        const username = form.elements['username'].value;
        const password = form.elements['password'].value;
        const rePassword = form.elements['repeat_password'].value;

        const errorStruct = window.BaseValidator.validateUpdate(username,
            password,
            rePassword);
        const error = errorStruct.error;
        const errorField = errorStruct.errorField;

        if (error !== null) {
          window.showErrorMsg(form, errorField, error);
          return;
        }

        window.API.updateUserInfo(username, password, (status, object) => {
          if (status === 'success') {
            const image = object.avatar || null;
            window.User = new window.UserModel(object.name, object.email,
                object.login, image);
            this._router.routeTo('/');
          } else {
            window.showErrorMsg(form, object.field, object.message);
          }
        });
      });
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  class ProfileRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      super.init();
      if (window.User !== undefined) {
        /* TODO(everyone): make settings file */
        const avatarPath = window.User.getImg() || 'public/img/avatar.jpg';
        this._rootEl.innerHTML = Handlebars.templates['profile.html']({
          username: window.User.getUsername(),
          email: window.User.getEmail(),
          avatar_path: avatarPath,
          score: window.User.getScore(),
        });
      } else {
        this._router.routeTo('/');
      }
    }

    deinit() {
      super.deinit();
    }
  }

  class SignUpRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      this._rootEl.innerHTML = Handlebars.templates['signup.html']();
      this._addListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        window.clearErrors(form);

        const username = form.elements['username'].value;
        const login = form.elements['login'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const repassword = form.elements['repeat_password'].value;

        const errorStruct = window.BaseValidator.validateRegistration(login,
            password, username, email, repassword);
        const error = errorStruct.error;
        const errorField = errorStruct.errorField;

        if (error !== null) {
          window.showErrorMsg(form, errorField, error);
          return;
        }

        window.API.register(login, email, password, username,
            (status, object) => {
              if (status === 'success') {
                const image = object.avatar || null;
                window.User = new window.UserModel(object.name, object.email,
                    object.login, object.score, image);
                this._router.routeTo('/');
              } else {
                window.showErrorMsg(form, object.field, object.message);
              }
            });
      });
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  class LeaderBoardRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      window.API.getUsers(1, (status, object) => {
        if (status === 'success') {
          this._rootEl.innerHTML =
            Handlebars.templates['leaderboard.html']({
              users: object.users,
              pageCount: Math.ceil(object.count / 10),
              currentPage: '0',
              size: '5'});
        }
      });
      this._addListener('submit', (event) => {
        event.preventDefault();
        const link = event.target;

        const page = link.getAttribute('href');
        window.API.getUsers(page, (status, object) => {
          if (status === 'success') {
            this._rootEl.innerHTML = '';
            this._rootEl.innerHTML =
              Handlebars.templates['leaderboard.html']({
                users: object.users,
                pageCount: Math.ceil(object.count / 10),
                currentPage: page,
                size: '5'});
          } else {
            console.log(page);
          }
        });
      });
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  class AboutRoute extends BaseRoute {
    constructor(rootEl, router) {
      super(rootEl, router);
    }

    init() {
      this._rootEl.innerHTML = Handlebars.templates['about.html']();
      super.init();
    }

    deinit() {
      super.deinit();
    }
  }

  window.IndexRoute = IndexRoute;
  window.LoginRoute = LoginRoute;
  window.LeaderBoardRoute = LeaderBoardRoute;
  window.SignUpRoute = SignUpRoute;
  window.ProfileRoute = ProfileRoute;
  window.SettingsRoute = SettingsRoute;
  window.AboutRoute = AboutRoute;
})();
