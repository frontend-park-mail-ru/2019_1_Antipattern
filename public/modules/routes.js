(function() {
  class IndexRoute {
    /**
     * Default IndexRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['menu.html']({
        isAuthorized: window.User,
      });
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }
  }

  class LoginRoute {
    /**
     * Default LoginRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['login.html']();
      this.addListeners();
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }

    /**
     *
     */
    addListeners() {
      this._rootEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;

        const login = form.elements['login'].value;
        const password = form.elements['password'].value;

        const errorStruct = window.BaseValidator.validateLogReg(login,
            password);
        const error = errorStruct.error;
        // const errorField = errorStruct.errorField;

        if (error !== null) {
          // TODO: reimplement the next line
          alert(error);
          return;
        }

        window.API.authorize(login, password, (status, object) => {
          if (status === 'success') {
            const image = object.avatar || null;
            window.User = new window.UserModel(object.name, object.email,
                object.login, object.score, image);
            this._router.routeTo('/');
          } else {
            alert(object.message);
          }
        });
      });
    }
  }

  class SettingsRoute {
    /**
     * Default SettingsRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['settings.html']();
      this.addListeners();
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }

    /**
     * Adds event listeners
     */
    addListeners() {
      this._rootEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;

        const username = form.elements['username'].value;
        const password = form.elements['password'].value;
        const rePassword = form.elements['repeat_password'].value;
        console.log(username);
        console.log(password);
        console.log(rePassword);

        const errorStruct = window.BaseValidator.validateUpdate(username,
            password,
            rePassword);
        const error = errorStruct.error;
        // const errorField = errorStruct.errorField;

        if (error !== null) {
          // TODO: reimplement the next line
          alert(error);
          return;
        }

        window.API.updateUserInfo(username, password, (status, object) => {
          if (status === 'success') {
            const image = object.avatar || null;
            window.User = new window.UserModel(object.name, object.email,
                object.login, image);
            this._router.routeTo('/');
          } else {
            alert(object.message);
          }
        });
      });
    }
  }

  class ProfileRoute {
    /**
     * Default ProfileRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
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

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }
  }

  class SignUpRoute {
    /**
     * Default SignUpRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['signup.html']();
      this.addListeners();
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }

    /**
     * Adds event listeners
     */
    addListeners() {
      this._rootEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;

        const username = form.elements['username'].value;
        const login = form.elements['login'].value;
        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const repassword = form.elements['repeat_password'].value;

        const errorStruct = window.BaseValidator.validateLogReg(login,
            password, username, email, repassword);
        const error = errorStruct.error;
        // const errorField = errorStruct.errorField;

        if (error !== null) {
          // TODO: reimplement the next line
          alert(error);
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
                alert(object.message);
              }
            });
      });
    }
  }

  class LeaderBoardRoute {
    /**
     * Default IndexRoute constructor
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
    }

    /**
     * Inits route
     */
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
      this.addListeners();
    }

    /**
     * Adds event listeners
     */
    addListeners() {
      this._rootEl.addEventListener('click', (event) => {
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
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
    }
  }

  class AboutRoute {
    /**
     * Default AboutRoute constructor
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
    }

    /**
     * Inits route
     */
    init() {
      this._rootEl.innerHTML = Handlebars.templates['about.html']();
    }

    /**
     * Reverts route init
     */
    deinit() {
      this._rootEl.innerHTML = '';
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
