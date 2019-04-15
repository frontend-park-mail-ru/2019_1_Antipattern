!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e["about.html"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){return'<div id="container" class="l-flex-column">\n    <a href="/" class="neon-text-red font-xxl">About</a>\n    <div>\n        <img src="public/img/about.jpg" class="fill-width">\n    </div>\n</div>'},useData:!0}),e["leaderboard.html"]=n({1:function(n,e,t,l,a){var o=n.lambda,i=n.escapeExpression;return'                <tr class="neon-text-yellow">\n                    <th>'+i(o(null!=e?e.login:e,e))+"</th>\n                    <th>"+i(o(null!=e?e.score:e,e))+"</th>\n                </tr>\n"},3:function(n,e,t,l,a){var o,i=null!=e?e:n.nullContext||{};return'                <div id="pagination">\n'+(null!=(o=t.unless.call(i,null!=e?e.startFromFirstPage:e,{name:"unless",hash:{},fn:n.program(4,a,0),inverse:n.noop,data:a}))?o:"")+"\n"+(null!=(o=t.each.call(i,null!=e?e.pages:e,{name:"each",hash:{},fn:n.program(6,a,0),inverse:n.noop,data:a}))?o:"")+"\n"+(null!=(o=t.unless.call(i,null!=e?e.endAtLastPage:e,{name:"unless",hash:{},fn:n.program(9,a,0),inverse:n.noop,data:a}))?o:"")+"                </div>\n"},4:function(n,e,t,l,a){return'                        <a href="#">&lt;</a>\n'},6:function(n,e,t,l,a){var o;return null!=(o=t.unless.call(null!=e?e:n.nullContext||{},null!=e?e.isCurrent:e,{name:"unless",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a}))?o:""},7:function(n,e,t,l,a){var o,i=null!=e?e:n.nullContext||{},s=t.helperMissing,r="function",d=n.escapeExpression;return'                            <a href="'+d(typeof(o=null!=(o=t.page||(null!=e?e.page:e))?o:s)===r?o.call(i,{name:"page",hash:{},data:a}):o)+'">'+d(typeof(o=null!=(o=t.page||(null!=e?e.page:e))?o:s)===r?o.call(i,{name:"page",hash:{},data:a}):o)+"</a>\n"},9:function(n,e,t,l,a){return'                        <a class="neon-text-blue" href="#">&gt;</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){var o,i=null!=e?e:n.nullContext||{};return'<div id="container">\n    <div class="l-flex-column height-md">\n        <a href="/" class="neon-text-red font-xxl">Leaderboard</a>\n        <table class="font-md font-brandon leaderboard">\n            <tr class="neon-text-blue">\n                <th>Login</th>\n                <th>Scores</th>\n            </tr>\n'+(null!=(o=t.each.call(i,null!=e?e.users:e,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a}))?o:"")+'        </table>\n    \n        <div class="font-brandon font-md">\n'+(null!=(o=(t.pagination||e&&e.pagination||t.helperMissing).call(i,null!=e?e.currentPage:e,null!=e?e.pageCount:e,null!=e?e.size:e,{name:"pagination",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a}))?o:"")+"        </div>\n    </div>\n</div>\n\n"},useData:!0}),e["login.html"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){return'<div id="container">\n    <div class="l-flex-column">\n        <p><a href=\'/\' class="spread spread-xl neon-text-red font-xxl">Login</a></p>\n        <form action="" class="l-flex-column" method="POST">\n            <input class="spread spread-xl button button-md input-dark my-2" type="text" id="login" placeholder="Login">\n            <div class="error-msg neon-text-white font-brandon"></div>\n            <input class="spread spread-xl button button-md input-dark my-2" type="password" id="password" placeholder="Password">\n            <div class="error-msg neon-text-white font-brandon"></div>\n            <input class="spread spread-xl neon-button-blue font-brandon button-sm" value="SUBMIT" type="submit" name="submit">\n        </form>\n    </div>\n</div>'},useData:!0}),e["menu.html"]=n({1:function(n,e,t,l,a){return'\n            <a class="button button-md button-p-md neon-button-green mx-1 font-lg" href=\'/profile\'>\n                Profile\n            </a>\n            \n            <a class="button button-md button-p-md neon-button-yellow mx-1 font-lg" href=\'/settings\'>\n                Settings\n            </a>\n\n            <a class="button button-md button-p-md neon-button-yellow mx-1 font-lg" href="/logout">\n                Logout\n            </a>\n          \n'},3:function(n,e,t,l,a){return"            <a class=\"button button-md button-p-md neon-button-green mx-1 font-lg\" href='/signup'>\n                Signup\n            </a>\n\n            <a class=\"button button-md button-p-md neon-button-yellow mx-1 font-lg\" href='/login'>\n                Login\n            </a>\n    \n"},compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){var o;return'<div id="menu">\n    <div id="menu-logo">\n        <a class="button button-lg button-p-lg neon-button-red font-lg" href="/">\n            KPACUBO\n        </a>\n    </div>\n\n    <div id="menu-auth">\n'+(null!=(o=t.if.call(null!=e?e:n.nullContext||{},null!=e?e.isAuthorized:e,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a}))?o:"")+'    </div>\n\n    <div id="menu-game">\n        <a class="button button-md button-p-md neon-text-cyan neon-button-cyan mx-1 font-lg" href=\'/singleplayer\'>\n            Single\n        </a>\n     \n        <a class="button button-md button-p-md neon-button-red mx-1 font-lg" href=\'/\'>\n            Multiplayer\n        </a>\n    </div>\n    \n    <div id="menu-help">\n        \n        <a class="button button-md button-p-md neon-button-white mx-1 font-lg" href=\'/leaderboard\'>\n            Leaderboard\n        </a>\n      \n        <a class="button button-md button-p-md neon-button-blue mx-1 font-lg" href=\'/about\'>\n            About\n        </a>\n     \n    </div>\n</div>\n'},useData:!0}),e["profile.html"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){var o,i=null!=e?e:n.nullContext||{},s=t.helperMissing,r="function",d=n.escapeExpression;return'<div id="container">\n    <div class="l-flex-column">\n        <a href="/" class="neon-text-red font-xxl">Profile</a>\n        <div class="font-brandon font-lg">\n            <img src="'+d(typeof(o=null!=(o=t.avatar_path||(null!=e?e.avatar_path:e))?o:s)===r?o.call(i,{name:"avatar_path",hash:{},data:a}):o)+'" class="img-avatar neon-button-white">\n            <p class="neon-text-white my-2">Login: '+d(typeof(o=null!=(o=t.login||(null!=e?e.login:e))?o:s)===r?o.call(i,{name:"login",hash:{},data:a}):o)+'</p>\n            <p class="neon-text-white my-2">Email: '+d(typeof(o=null!=(o=t.email||(null!=e?e.email:e))?o:s)===r?o.call(i,{name:"email",hash:{},data:a}):o)+'</p>\n            <p class="neon-text-white my-2">Score: '+d(typeof(o=null!=(o=t.score||(null!=e?e.score:e))?o:s)===r?o.call(i,{name:"score",hash:{},data:a}):o)+'</p>\n            <a href="/settings" class="neon-button-white button-lg button-round">\n                <img src="public/img/settings.svg" class="img-icon">\n                Settings\n            </a>\n        </div>\n    </div>\n</div>\n'},useData:!0}),e["settings.html"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){return'<div id="container">\n    <div class="l-flex-column">\n        <div class="justify-around my-2">\n            <a class="spread spread-xl neon-text-red font-xxl" href="/" >Settings</a>\n        </div>\n\n        <form action="" class="l-flex-column" method="POST">\n            <div class="justify-end my-4">\n                <div class="l-flex-row">\n                    <label class="spread spread-lg neon-text-yellow font-brandon font-lg" for="username">\n                        Change login\n                    </label>\n                    <input type="text" id="login"  placeholder="Login" class="spread spread-lg button-md input-dark font-md">\n                    <div class="error-msg neon-text-white font-brandon"></div>\n                </div>    \n            </div>\n\n            <div class="justify-end my-4">\n                <div class="l-flex-row">\n                    <label class="spread spread-lg neon-text-yellow font-brandon font-lg" for="password">\n                        Change password\n                    </label>\n                    <input type="password" id="password" placeholder="Password" class="spread spread-lg button-md input-dark font-md">\n                    <div class="error-msg neon-text-white font-brandon"></div>\n                </div>\n            </div>\n\n            <div class="justify-end my-4">\n                <div class="l-flex-row">\n                    <label class="spread spread-lg neon-text-yellow font-brandon font-lg" for="repeat_password">\n                        Repeat password\n                    </label>\n                    <input type="password" id="repeat_password" placeholder="Confirm password" class="spread spread-lg button-md input-dark font-md">\n                    <div class="error-msg neon-text-white font-brandon"></div>\n                </div>\n            </div>\n\n            <div class="justify-end my-4">\n                <input type="file" id="avatar" placeholder="Upload avatar">\n                <div class="error-msg neon-text-white font-brandon"></div>\n            </div>\n\n            <input class="neon-button-blue font-brandon button-md" value="SUBMIT" type="submit" name="submit">\n        </form>\n    </div>\n</div>\n'},useData:!0}),e["signup.html"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){return'<div id="container">\n    <div class="l-flex-column">\n        <p><a href="/" class="spread spread-lg neon-text-red font-xl">SIGN  UP</a></p>\n        <form action="" class="l-flex-column" method="POST">\n            <input class="py-3 button-md input-dark my-2" type="text" id="login" placeholder="Login">\n            <div class="error-msg neon-text-white font-brandon"></div>\n\n            <input class="py-3 button-md input-dark my-2" type="email" id="email" placeholder="Email">\n            <div class="error-msg neon-text-white font-brandon"></div>\n\n            <input class="py-3 button-md input-dark my-2" type="password" id="password" placeholder="Password">\n            <div class="error-msg neon-text-white font-brandon"></div>\n\n            <input class="py-3 button-md input-dark my-2" type="password" id="repeat_password" placeholder="Repeat password">\n            <div class="error-msg neon-text-white font-brandon"></div>\n            \n            <input class="py-1 button-sm neon-button-blue font-brandon" value="SUBMIT" type="submit" name="submit">\n        </form>\n    </div>\n</div>'},useData:!0}),e["svoyak.html"]=n({1:function(n,e,t,l,a){return'            <div id="game-field" class="l-flex-row">\n'},3:function(n,e,t,l,a){return'            <div id="game-field" class="l-flex-column">\n'},5:function(n,e,t,l,a){var o;return null!=(o=t.each.call(null!=e?e:n.nullContext||{},null!=e?e.themes:e,{name:"each",hash:{},fn:n.program(6,a,0),inverse:n.noop,data:a}))?o:""},6:function(n,e,t,l,a){var o;return'                        <div class="item l-flex-row justify-center align-center">\n                            <div>\n                                '+n.escapeExpression(n.lambda(null!=e?e.name:e,e))+"\n                            </div>\n                        </div>\n"+(null!=(o=t.each.call(null!=e?e:n.nullContext||{},null!=e?e.questions:e,{name:"each",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a}))?o:"")},7:function(n,e,t,l,a){var o;return'                            <div class="item l-flex-row justify-center align-center">\n                                <div>\n'+(null!=(o=t.if.call(null!=e?e:n.nullContext||{},null!=e?e.active:e,{name:"if",hash:{},fn:n.program(8,a,0),inverse:n.noop,data:a}))?o:"")+"                                </div>\n                            </div>\n"},8:function(n,e,t,l,a){return"                                        "+n.escapeExpression(n.lambda(null!=e?e.value:e,e))+"\n"},10:function(n,e,t,l,a){var o;return'                <div class="item l-flex-row justify-center align-center">\n                    <div>\n                        '+n.escapeExpression("function"==typeof(o=null!=(o=t.question||(null!=e?e.question:e))?o:t.helperMissing)?o.call(null!=e?e:n.nullContext||{},{name:"question",hash:{},data:a}):o)+"\n                    </div>\n                </div>\n"},12:function(n,e,t,l,a){var o;return'                <div class="item l-flex-row justify-center align-center">\n                    <div>\n                        '+n.escapeExpression("function"==typeof(o=null!=(o=t.message||(null!=e?e.message:e))?o:t.helperMissing)?o.call(null!=e?e:n.nullContext||{},{name:"message",hash:{},data:a}):o)+"\n                    </div>\n                </div>\n"},14:function(n,e,t,l,a){return'                <div id="input" class="l-flex-row">\n                    <form class="l-flex-row justify-center align-center">\n                        <input type="text" id="answer">\n                        <button type="submit">Submit</button>\n                    </form>\n                </div>\n'},16:function(n,e,t,l,a){var o=n.lambda,i=n.escapeExpression;return'            <div class="card l-flex-column justify-center align-center">\n                <img src="'+i(o(null!=e?e.img:e,e))+'" width="50" height="50"></img>\n                <div class="l-flex-column">\n                    <p>'+i(o(null!=e?e.login:e,e))+"</p>\n                    <p>"+i(o(null!=e?e.score:e,e))+"</p>\n                </div>\n             </div>\n"},18:function(n,e,t,l,a){return"            #questions {\n                height: 100%; width: 100%;\n            }\n"},20:function(n,e,t,l,a){return"        #questions {\n            height: 90%; width: 100%;\n        }\n"},compiler:[7,">= 4.0.0"],main:function(n,e,t,l,a){var o,i,s=null!=e?e:n.nullContext||{};return'    <div class="l-flex-row font-brandon">\n    <div id="main-field" class="l-flex-column space-between">\n'+(null!=(o=t.unless.call(s,null!=e?e.isQuestion:e,{name:"unless",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a}))?o:"")+'            <div id="questions" class="grid">\n'+(null!=(o=t.if.call(s,null!=e?e.isQuestionList:e,{name:"if",hash:{},fn:n.program(5,a,0),inverse:n.noop,data:a}))?o:"")+"\n"+(null!=(o=t.if.call(s,null!=e?e.isQuestion:e,{name:"if",hash:{},fn:n.program(10,a,0),inverse:n.noop,data:a}))?o:"")+"\n"+(null!=(o=t.if.call(s,null!=e?e.isMessage:e,{name:"if",hash:{},fn:n.program(12,a,0),inverse:n.noop,data:a}))?o:"")+"            </div>\n"+(null!=(o=t.if.call(s,null!=e?e.isQuestion:e,{name:"if",hash:{},fn:n.program(14,a,0),inverse:n.noop,data:a}))?o:"")+'        </div>\n        <div id="player-field" class="l-flex-row">\n'+(null!=(o=t.each.call(s,null!=e?e.users:e,{name:"each",hash:{},fn:n.program(16,a,0),inverse:n.noop,data:a}))?o:"")+'        </div>\n    </div>\n    <div id="second-field" class="l-flex-column space-between justify-start">\n        <div id="exit-button"><a href="/">FUCK GO BACK</a></div>\n    </div>\n    </div>\n    <style type="text/css">\n        form {\n            width: 100%;\n            height: 100%;\n        }\n        input {\n            width: 90%;\n            height: 100%;\n            box-sizing: border-box;\n        }\n        button {\n            width: 10%;\n            height: 100%;\n        }\n        #main-field { height: 99vh; width: 75vw; padding: 3px; }\n        #second-field { height: 99vh; width: 25vw; padding: 3px;}\n        #game-field { height: 80%; width: auto; border: solid 1px white;}\n        #player-field { height: 18%; width: auto; border: solid 1px white;}\n        #pause-button { height: 100%; width: 8%;}\n'+(null!=(o=t.unless.call(s,null!=e?e.isQuestion:e,{name:"unless",hash:{},fn:n.program(18,a,0),inverse:n.program(20,a,0),data:a}))?o:"")+"        #input {\n            height: 10%; width: 100%;\n        }\n        #exit-button {display: flex; align-items: center;\n            justify-content: center;\n            height: 15%; width: 100%; \n            background-color: blueviolet;}\n        .grid { display: grid; grid-template-columns: repeat("+n.escapeExpression("function"==typeof(i=null!=(i=t.num||(null!=e?e.num:e))?i:t.helperMissing)?i.call(s,{name:"num",hash:{},data:a}):i)+", 1fr);}\n        .item:nth-child(even) { background-color: rgb(39, 189, 189);}\n        .item:nth-child(odd) { background-color: rgb(46, 170, 129)}\n        .card {width: 100%;}\n    </style>"},useData:!0})}();