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


<<<<<<< HEAD

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
=======
>>>>>>> 3f9e912c41e9be7f21a65f41c1f04e0a74dbdc4b
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
            let users = {};
            window.API.getUsers(1,(status, object) => {
              if (status === 'success') {
                users = [{name: "rk6_student"}, {name: "indiagolph99"}];
                // users = JSON.parse(object.users);
                console.log(object.users);
                console.log(users)
              }
            })
            this._rootEl.innerHTML = Handlebars.templates['leaderboard.html']({users:users});
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
