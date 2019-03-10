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

            this.addListeners();
        }

        init() {
            this._rootEl.innerHTML = Handlebars.templates['settings.html']();
        }

        deinit() {
            this._rootEl.innerHTML = '';
        }

        addListeners() {
            this._rootEl.addEventListener("submit", (event) => {
                event.preventDefault();
                let form = event.target;

                let username = form.elements["username"].value;
                let password = form.elements["pass"].value;
                let repassword = form.elements["repeat_pass"].value;

                let failedField, errorMsg = this.invalid(username, password, repassword)
                if (failedField != null) {
                    alert(errorMsg);
                    return;
                }

                window.API.updateUserInfo(username, password, (status, object) => {
                    /* Errors not implemented yet */

                    if (status === "success") {
                        window.User.updateUsername(object.name);
                        this._router.routeTo('/profile');
                    }
                });
            });
        }

        invalid(username, password, repassword) {
            let validator = window.BaseValidator;
            if (username && !validator.correctUsername(username)) {
                return "username", "Username contains extraneous characters. Use: a-z, A-Z, 0-9, \"_\".";
            }

            if (!validator.correctLength(username)) {
                return "username", "Username must be >= 4 and <= 25 long.";
            }

            if (password && !validator.correctLength(password)) {
                return "pass", "Password must be >= 4 and <= 25 long.";
            }

            if (!repassword || repassword !== password) {
                return "repeat_pass", "Passwords do not match.";
            }
            return null, null;
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
                let avatar_path = window.User.getImg() || "../img/avatar.jpg";
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
                if (this.validate(login, username, email, password, repassword)) {
                    alert("invalid");
                    return;
                }

                window.API.register(login, email, password, username, (status, object) => {
                    console.log(status);
                    console.log(object);
                });
            });
        }

        validate(login, username, email, password, repassword) {
            let validator = window.BaseValidator;
            if (!validator.correctLogin(login) || !validator.correctLength(login)) {
                return "login";
            }

            if (!validator.correctUsername(username) || !validator.correctLength(username)) {
                return "username";
            }

            if (!validator.correctEmail(email)) {
                alert("email");
                return "email";
            }            

            if (!validator.correctLength(password)) {
                alert("pas");
                return "password";
            }

            if (password !== repassword) {
                alert("rpas");
                return "repeat_password";
            }

            return null;
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
