(function () {
    let root = document.getElementById('root');
    window.onload = () => {
        const router = new Router(root);
        router.addRoute('/', wrapConstructorToFactory(IndexRoute));
        router.addRoute('/login', wrapConstructorToFactory(LoginRoute));
        router.addRoute('/profile', wrapConstructorToFactory(ProfileRoute));
        router.addRoute('/settings', wrapConstructorToFactory(SettingsRoute));
        router.addRoute('/signup', wrapConstructorToFactory(SignUpRoute));
        router.addRoute('/leaderboard', wrapConstructorToFactory(LeaderBoardRoute));
        router.addRoute('/about', wrapConstructorToFactory(AboutRoute));
        router.setDefaultRoute('/');

        router.init();
        initAnchorsRouting(root, router);

        window.API.getUserInfo((status, object) => {
            if (status === "success") {
                let image = object.avatar || null;
                window.User = new window.UserModel(object.name, object.email, object.login, object.score, image);
                router.routeTo('/')
            }
        })
    };
})();
