(function () {

    class IndexRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['menu.html']({
                isAuthorized: window.User,
            });
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };

    class LoginRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['login.html']();
            this.addListeners();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }

        addListeners() {
            this._rootEl.addEventListener("submit", (event) => {
                event.preventDefault();
                let form = event.target;

                let login = form.elements["login"].value;
                let password = form.elements["password"].value;

                let errorStruct = window.BaseValidator.validateLogReg(login, password);
                let error = errorStruct.error;
                let errorField = errorStruct.errorField;

                if (error !== null) {
                    // TODO: reimplement the next line
                    alert(error);
                    return;
                }

                window.API.authorize(login, password, (status, object) => {
                    if (status === 'success') {
                        let image = object.avatar || null;
                        window.User = new window.UserModel(object.name, object.email, object.login, image);
                        this._router.routeTo('/')
                    } else {
                        alert(object.message);
                    }
                });
            });
        }
    };

    class SettingsRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['settings.html']();
            this.addListeners();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }

        addListeners() {
            this._rootEl.addEventListener("submit", (event) => {
                event.preventDefault();
                let form = event.target;

                let username = form.elements["username"].value;
                let password = form.elements["password"].value;
                let rePassword = form.elements["repeat_password"].value;
                console.log(username);
                console.log(password);
                console.log(rePassword);

                let errorStruct = window.BaseValidator.validateUpdate(username, password, rePassword);
                let error = errorStruct.error;
                let errorField = errorStruct.errorField;

                if (error !== null) {
                    // TODO: reimplement the next line
                    alert(error);
                    return;
                }

                window.API.updateUserInfo(username, password, (status, object) => {
                    if (status === 'success') {
                        let image = object.avatar || null;
                        window.User = new window.UserModel(object.name, object.email, object.login, image);
                        this._router.routeTo('/')
                    } else {
                        alert(object.message);
                    }
                });
            });
        }

    };

    class ProfileRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            if (window.User !== undefined) {
                /* TODO(everyone): make settings file */
                let avatar_path = window.User.getImg() || "public/img/avatar.jpg";
                this._rootEl.innerHTML = Handlebars.templates['profile.html']({
                    username: window.User.getUsername(),
                    email: window.User.getEmail(),
                    avatar_path: avatar_path,
                });
            } else {
                this._router.routeTo('/');
            }
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };

    class SignUpRoute {
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['signup.html']();
            this.addListeners();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }

        addListeners() {
            this._rootEl.addEventListener("submit", (event) => {
                event.preventDefault();
                let form = event.target;

                let username = form.elements["username"].value;
                let login = form.elements["login"].value;
                let email = form.elements["email"].value;
                let password = form.elements["password"].value;
                let repassword = form.elements["repeat_password"].value;

                let errorStruct = window.BaseValidator.validateLogReg(login, password, username, email, repassword);
                let error = errorStruct.error;
                let errorField = errorStruct.errorField;

                if (error !== null) {
                    // TODO: reimplement the next line
                    alert(error);
                    return;
                }

                window.API.register(login, email, password, username, (status, object) => {
                    if (status === 'success') {
                        let image = object.avatar || null;
                        window.User = new window.UserModel(object.name, object.email, object.login, image);
                        this._router.routeTo('/')
                    } else {
                        alert(object.message);
                    }
                });
            });
        }
    };

    class LeaderBoardRoute{
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            window.API.getUsers(1,(status, object) => {
              if (status === 'success') {
                this._rootEl.innerHTML = Handlebars.templates['leaderboard.html']({users:object.users});
              }
            });

        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };

    class AboutRoute{
        constructor(rootEl, router) {
            if (!(rootEl instanceof Node)) {
                throw TypeError('rootEl must be Node');
            }
            if (!(router instanceof Router)) {
                throw TypeError('router must be Router');
            }

            this._rootEl = rootEl;
            this._router = router;
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['about.html']();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }
    };

    window.IndexRoute = IndexRoute;
    window.LoginRoute = LoginRoute;
    window.LeaderBoardRoute = LeaderBoardRoute;
    window.SignUpRoute = SignUpRoute;
    window.ProfileRoute = ProfileRoute;
    window.SettingsRoute = SettingsRoute;
    window.AboutRoute = AboutRoute;
})();
