'use strict';

import apiModule from './api.js';
import validator from './basevalidator.js';
import UserModel from './models.js';
import {showErrorMsg, clearErrors} from './utils.js';
import {Router} from './router.js';

class BaseRoute {
  /**
   * Default BaseRoute constructor
   * @param {Node} rootEl - DOM element
   * @param {function} router - route object
   */
  constructor(rootEl, router, controller = null, subscriber = null) {
    if (!(rootEl instanceof Node)) {
      throw new TypeError('rootEl must be Node');
    }
    if (!(router instanceof Router)) {
      throw new TypeError('router must be Router');
    }

    this._rootEl = rootEl;
    this._router = router;
    this._controller = controller;
    this._subscriber = subscriber;
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
  constructor(...args) {
    super(...args);
  }
  /**
   * initializer
   */
  prerender() {
    this._rootEl.innerHTML = Handlebars.templates['menu.html']({
      isAuthorized: null,
    });
  }

  render(state, key, value) {
    this._rootEl.innerHTML = Handlebars.templates['menu.html']({
      isAuthorized: value,
    });
  }

  init() {
    this.prerender();
    this._subscriber.subscribeEvent('UserLoaded', this.render.bind(this));
    this._controller.getUser();
    super.init();
  }
  /**
   * deinitializer
   */
  deinit() {
    this._subscriber.unsubscribeEvent('UserLoaded', this.render.bind(this));
    super.deinit();
  }
}

class LoginRoute extends BaseRoute {
  /**
   *
   * @param {Node} rootEl - DOM element in which to insert template
   * @param {BaseRoute} router - class which constructor needs to be called
   */
  constructor(...args) {
    super(...args);
  }

  render(state, key, value) {
    if (value === 'success') {
      this._router.routeTo('/');
      return;
    }

    showErrorMsg(this._form, value.errorField, value.error);
  }

  init() {
    this._rootEl.innerHTML = Handlebars.templates['login.html']();
    this._addListener('submit', (event) => {
      event.preventDefault();
      this._form = event.target;
      clearErrors(this._form);

      const login = this._form.elements['login'].value;
      const password = this._form.elements['password'].value;
      this._controller.login(login, password);
    });

    this._subscriber.subscribeEvent('LoggedIn', this.render.bind(this));
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('LoggedIn', this.render.bind(this));
    super.deinit();
  }
}

class SettingsRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
  }

  render(state, key, value) {
    if (value !== 'success') {
      showErrorMsg(this._form, value.errorField, value.error);
      return;
    }

    if (key === 'ProfileUpdated') {
      this._waitingAvatarUpdate = false;
    }

    if (key === 'AvatarUpdated') {
      this._waitingAvatarUpdate = false;
    }

    if (this._waitingProfileUpdate && this._waitingAvatarUpdate) {
      return;
    }

    this._router.routeTo('/');
  }

  init() {
    this._rootEl.innerHTML = Handlebars.templates['settings.html']();
    this._addListener('submit', (event) => {
      event.preventDefault();
      this._form = event.target;
      clearErrors(this._form);

      let login = this._form.elements['login'].value;
      if (login === window.User.login) {
        login = '';
      }
      const password = this._form.elements['password'].value;
      const repassword = this._form.elements['repeat_password'].value;
      const input = this._form.elements['avatar'];

      this._waitingProfileUpdate = true;
      this._subscriber.subscribeEvent('ProfileUpdated', this.render.bind(this));

      if (input.value) {
        this._subscriber.subscribeEvent('AvatarUpdated', this.render.bind(this));
        this._waitingAvatarUpdate = true;
      }

      this._controller.updateProfile(login, password, repassword, input);
    });
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('ProfileUpdated', this.render.bind(this));
    this._subscriber.unsubscribeEvent('AvatarUpdated', this.render.bind(this));
    super.deinit();
  }
}

class ProfileRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
  }

  render(state, key, value) {
    if (value) {
      /* TODO(everyone): make settings file */
      const user = value;
      const avatarPath = user.img || 'public/img/avatar.jpg';  // TODO: remove this hardcode(incapsulate in user model)
      this._rootEl.innerHTML = Handlebars.templates['profile.html']({
        login: user.login,
        email: user.email,
        avatar_path: avatarPath,
        score: user.score,
      });
    } else {
      this._router.routeTo('/');
    }
  }

  init() {
    this._subscriber.subscribeEvent('UserLoaded', this.render.bind(this));
    this._controller.getUser();
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('UserLoaded', this.render.bind(this));
    super.deinit();
  }
}

class SignUpRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
  }

  render(state, key, value) {
    if (value === 'success') {
      this._router.routeTo('/');
      return;
    }

    showErrorMsg(this._form, value.errorField, value.error);
  }

  init() {
    this._rootEl.innerHTML = Handlebars.templates['signup.html']();
    this._addListener('submit', (event) => {
      event.preventDefault();
      this._form = event.target;
      clearErrors(this._form);

      const login = this._form.elements['login'].value;
      const email = this._form.elements['email'].value;
      const password = this._form.elements['password'].value;
      const repassword = this._form.elements['repeat_password'].value;

      this._controller.signUp(login, email, password, repassword);
    });

    this._subscriber.subscribeEvent('SignedUp', this.render.bind(this));
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('SignedUp', this.render.bind(this));
    super.deinit();
  }
}

class LeaderBoardRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
  }

  prerender() {
    this.render({}, '', {
      users: [],
      pageCount: 0,
      currentPage: 0
    })
  }

  render(state, key, value) {
    this._rootEl.innerHTML =
      Handlebars.templates['leaderboard.html']({
        users: value.users,
        pageCount: value.pageCount,
        currentPage: value.currentPage,
        size: '5',
      });

    const pagination = document.getElementById('pagination');
    pagination.addEventListener('click', (event) => {
      event.preventDefault();
      const link = event.target;
      const page = link.getAttribute('href');
      this._controller.getLeaderboard(page);
    });
  }

  init() {
    this.prerender();
    this._subscriber.subscribeEvent('LeaderboardLoaded', this.render.bind(this));
    this._controller.getLeaderboard(1);
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('LeaderboardLoaded', this.render.bind(this));
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

class LogoutRoute extends BaseRoute {
  constructor(...args) {
    super(...args);
  }

  render(state, key, value) {
    if (value === 'success') {
      this._router.routeTo('/');
    }
  }

  init() {
    this._subscriber.subscribeEvent('LoggedOut', this.render.bind(this));
    this._controller.logout();
    super.init();
  }

  deinit() {
    this._subscriber.unsubscribeEvent('LoggedOut', this.render.bind(this));
    super.deinit();
  }
}

export {
  IndexRoute,
  LoginRoute,
  LeaderBoardRoute,
  SignUpRoute,
  ProfileRoute,
  SettingsRoute,
  AboutRoute,
  LogoutRoute,
};
