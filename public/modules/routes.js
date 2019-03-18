/* eslint-disable require-jsdoc */
'use strict';

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
    /**
     * Adds listener of specific event
     * @param {Event} event - DOM event
     * @param {function} handler - handler, duh
     */
    _addListener(event, handler) {
      if (!(event in this._eventHandlers)) {
        this._eventHandlers[event] = [];
      }

      this._eventHandlers[event].push(handler);
      this._rootEl.addEventListener(event, handler);
    }
    /**
     * Remove listeners of specific event
     * @param {Event} event - event to remove
     */
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
    init() { }

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
  /**
   * BaseRoute extension for index.html render
   */
  class IndexRoute extends BaseRoute {
    /**
     *
     * @param {Node} rootEl - DOM element in which to insert template
     * @param {BaseRoute} router - class which constructor needs to be called
     */
    constructor(rootEl, router) {
      super(rootEl, router);
    }
    /**
     * initializer
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['menu.html']({
        isAuthorized: window.User,
      });
      super.init();
    }
    /**
     * deinitializer
     */
    deinit() {
      super.deinit();
    }
  }
  /**
   * login route
   */
  class LoginRoute extends BaseRoute {
    /**
     *
     * @param {Node} rootEl - DOM element in which to insert template
     * @param {BaseRoute} router - class which constructor needs to be called
     */
    constructor(rootEl, router) {
      super(rootEl, router);
    }
    /**
     * initializer
     */
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
        const input = form.elements['avatar'];

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
                object.login, object.score, image);
            this._router.routeTo('/');
          } else {
            window.showErrorMsg(form, object.field, object.message);
          }
        });

        if (input.value) {
          const avatar = new FormData();
          avatar.append('avatar', input.files[0]);
          window.API.uploadAvatar(avatar, (status, object) => {
            if (status === 'success') {
              window.User = new window.UserModel(object.name, object.email,
                  object.login, object.score, object.avatar);
              this._router.routeTo('/');
            } else {
              window.showErrorMsg(form, object.field, object.message);
            }
          });
        }
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
      window.API.getUsers(1)
          .then(function(response) {
            return response.json();
          })
          .then((data) => {
            if (data.status === 'success') {
              this._rootEl.innerHTML =
              Handlebars.templates['leaderboard.html']({
                users: data.payload.users,
                pageCount: Math.ceil(data.payload.count / 10),
                currentPage: '0',
                size: '5',
              });
            }
          })
          .this(() => {
            const pagination = document.getElementById('pagination');
            pagination.addEventListener('click', (event) => {
              event.preventDefault();
              const link = event.target;
              const page = link.getAttribute('href');
              console.log('sasatt');
              window.API.getUsers(page)
                  .then(function(response) {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.status === 'success') {
                      this._rootEl.innerHTML =
                    Handlebars.templates['leaderboard.html']({
                      users: data.payload.users,
                      pageCount: Math.ceil(data.payload.count / 10),
                      currentPage: '0',
                      size: '5',
                    });
                    }
                  });
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
