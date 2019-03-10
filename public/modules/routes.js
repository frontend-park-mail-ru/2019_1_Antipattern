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
            this._rootEl.innerHTML = Handlebars.templates['menu.html']();
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
        }

        deinit() {
            this._rootEl.innerHTML = '';
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
        }

        deinit() {
            this._rootEl.innerHTML = '';
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
            this._rootEl.innerHTML = Handlebars.templates['profile.html']();
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


                let errorStruct = this.invalidate(login, username, email, password, repassword);
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

        invalidate(login, username, email, password, repassword) {
            let validator = window.BaseValidator;
            if (!validator.correctLogin(login)) {
                return {
                    error: "Login is incorrect",
                    errorField: "login"
                };
            }

            if (!validator.correctLength(login)) {
                return {
                    error: "Login should be from 4 to 25 symbols long",
                    errorField: "login"
                };
            }


            if (!validator.correctUsername(username)) {
                return {
                    error: "Name should consist on a-z, A-Z and 0-9",
                    errorField: "name"
                };
            }

            if (!validator.correctLength(username)) {
                return {
                    error: "Name should be from 4 to 25 symbols long",
                    errorField: "name"
                };
            }

            if (!validator.correctEmail(email)) {
                return {
                    error: "Email is incorrect",
                    errorField: "email"
                };
            }            

            if (!validator.correctLength(password)) {
                return {
                    error: "Password should be from 4 to 25 symbols long",
                    errorField: "password"
                };
            }

            if (password !== repassword) {
                return {
                    error: "Passwords do not match",
                    errorField: "repassword"
                };
            }

            return {
                error: null,
                errorField: null
            };
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
            this._rootEl.innerHTML = Handlebars.templates['leaderboard.html']();
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
