!function(){var t=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["about.html"]=t({compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){return'<div id = "about" name = "about">\n<img src="public/img/about.jpg">\n</div>\n'},useData:!0}),n["leaderboard.html"]=t({1:function(t,n,e,a,l){var s=t.lambda,o=t.escapeExpression;return"\t\t\t<tr>\n\t\t\t\t<th>"+o(s(null!=n?n.name:n,n))+"</th>\n\t\t\t\t<th>"+o(s(null!=n?n.score:n,n))+"</th>\n\t\t\t</tr>\n"},3:function(t,n,e,a,l){var s,o=null!=n?n:t.nullContext||{};return'<div class="pagination">\n'+(null!=(s=e.unless.call(o,null!=n?n.startFromFirstPage:n,{name:"unless",hash:{},fn:t.program(4,l,0),inverse:t.noop,data:l}))?s:"")+"\n"+(null!=(s=e.each.call(o,null!=n?n.pages:n,{name:"each",hash:{},fn:t.program(6,l,0),inverse:t.noop,data:l}))?s:"")+"\n"+(null!=(s=e.unless.call(o,null!=n?n.endAtLastPage:n,{name:"unless",hash:{},fn:t.program(9,l,0),inverse:t.noop,data:l}))?s:"")+"</div>\n"},4:function(t,n,e,a,l){return'    <a href="#">&lt;</a>\n'},6:function(t,n,e,a,l){var s,o,i=null!=n?n:t.nullContext||{},r=e.helperMissing,u="function",d=t.escapeExpression;return(null!=(s=e.if.call(i,null!=n?n.isCurrent:n,{name:"if",hash:{},fn:t.program(7,l,0),inverse:t.noop,data:l}))?s:"")+'\t\t<a href="/'+d(typeof(o=null!=(o=e.page||(null!=n?n.page:n))?o:r)===u?o.call(i,{name:"page",hash:{},data:l}):o)+'">'+d(typeof(o=null!=(o=e.page||(null!=n?n.page:n))?o:r)===u?o.call(i,{name:"page",hash:{},data:l}):o)+"</a>\n"+(null!=(s=e.unless.call(i,null!=n?n.isCurrent:n,{name:"unless",hash:{},fn:t.program(7,l,0),inverse:t.noop,data:l}))?s:"")},7:function(t,n,e,a,l){var s,o=null!=n?n:t.nullContext||{},i=e.helperMissing,r="function",u=t.escapeExpression;return'      <a href="/'+u(typeof(s=null!=(s=e.page||(null!=n?n.page:n))?s:i)===r?s.call(o,{name:"page",hash:{},data:l}):s)+'">'+u(typeof(s=null!=(s=e.page||(null!=n?n.page:n))?s:i)===r?s.call(o,{name:"page",hash:{},data:l}):s)+"</a>\n"},9:function(t,n,e,a,l){return'    <a href="#">&gt;</a>\n'},compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){var s,o=null!=n?n:t.nullContext||{};return'<div class="container align-items-center text-center">\n\t<div id="menu">\n\t\t<a href="/" class="neon-text-red font-xl font-street-gathering">Leaderboard</a>\n\t\t<div class="align-items-center d-flex-row">\n\t\t</div>\n\t\t<div class="align-items-center d-flex-column scroll height-md">\n\t\t\t\x3c!-- TODO(Xenobyte): адаптация font-size под мобилки --\x3e\n\t\t\t<table class="neon-text-yellow font-md font-brandon" id="leaderboard">\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Nickname</th>\n\t\t\t\t\t<th>Scores</th>\n\t\t\t\t</tr>\n'+(null!=(s=e.each.call(o,null!=n?n.users:n,{name:"each",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l}))?s:"")+'\t\t\t</table>\n\t\t</div>\n\t\t<div class="font-brandon neon-text-blue font-md">\n\n'+(null!=(s=(e.pagination||n&&n.pagination||e.helperMissing).call(o,null!=n?n.currentPage:n,null!=n?n.pageCount:n,null!=n?n.size:n,{name:"pagination",hash:{},fn:t.program(3,l,0),inverse:t.noop,data:l}))?s:"")+"\n\t\t</div>\n\t</div>\n</div>\n"},useData:!0}),n["login.html"]=t({compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){return'<div class="container align-items-center text-center font-street-gathering font-lg">\n\t<div class="form text-center justify-center d-flex-column">\n\t\t<div class="logo">\n\t\t\t<p><a name="menu" href=\'/\' class="neon-button-red font-lg px-4 py-4">KPACUBO</a></p>\n\t\t</div>\n\t\t<form action="" class="d-flex-column justify-center" method="POST">\n\t\t\t<input class="input-dark" type="text" id="login" placeholder="Login">\n\t\t\t<input class="input-dark" type="password" id="password" placeholder="Password">\n\t\t\t<input class="neon-button-blue font-brandon button-sm align-items-center justify-center" value="SUBMIT" type="submit" name="submit">\n\t\t</form>\n\t</div>\n</div>\n'},useData:!0}),n["menu.html"]=t({1:function(t,n,e,a,l){return"            <div class=\"neon-button-cyan menu-button-md menu-button mx-1\">\n                <a href='/profile'>Profile</a>\n            </div>\n            <div class=\"neon-button-blue menu-button-md menu-button mx-1\">\n                <a href='/settings'>Settings</a>\n            </div>\n"},3:function(t,n,e,a,l){return"            <div class=\"neon-button-green menu-button-md menu-button mx-1\">\n                <a href='/signup'>Signup</a>\n            </div>\n            <div class=\"neon-button-yellow menu-button-md menu-button mx-1\">\n                <a href='/login'>Login</a>\n            </div>\n"},compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){var s;return'<div class="menu">\n    <div class="menu-logo">\n        <a name="index" class="neon-button-red font-xl px-4 py-4" href=\'/\' >KPACUBO</a>\n    </div>\n\n    <div class="menu-auth">\n'+(null!=(s=e.if.call(null!=n?n:t.nullContext||{},null!=n?n.isAuthorized:n,{name:"if",hash:{},fn:t.program(1,l,0),inverse:t.program(3,l,0),data:l}))?s:"")+'    </div>\n\n    <div class="menu-game">\n        <div class="neon-button-cyan menu-button-md menu-button mx-1">\n            <a href=\'/\'>Single</a>\n        </div>\n        <div class="neon-button-blue menu-button-md menu-button mx-1">\n            <a href=\'/\'>Multiplayer</a>\n        </div>\n    </div>\n    \n    <div class="menu-help">\n        <div class="neon-button-purple menu-button-md menu-button mx-1">\n            <a href=\'/leaderboard\'>Leaderboard</a>\n        </div>\n        <div class="neon-button-blue menu-button-md menu-button mx-1">\n            <a href=\'/about\'>About</a>\n        </div>\n    </div>\n</div>\n'},useData:!0}),n["profile.html"]=t({compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){var s,o=null!=n?n:t.nullContext||{},i=e.helperMissing,r="function",u=t.escapeExpression;return'<div class="container align-items-center text-center">\n\t<div id="menu">\n\t\t<a href=\'/\' class="neon-text-red font-lg font-brandon">Profile</a>\n\t\t<div class="align-items-center d-flex-column font-brandon font-md">\n\t\t\t<img src="'+u(typeof(s=null!=(s=e.avatar_path||(null!=n?n.avatar_path:n))?s:i)===r?s.call(o,{name:"avatar_path",hash:{},data:l}):s)+'" class="img-avatar neon-button-white">\n\t\t\t<p class="neon-text-white my-2">Username: '+u(typeof(s=null!=(s=e.username||(null!=n?n.username:n))?s:i)===r?s.call(o,{name:"username",hash:{},data:l}):s)+'</p>\n\t\t\t<p class="neon-text-white my-2">Email: '+u(typeof(s=null!=(s=e.email||(null!=n?n.email:n))?s:i)===r?s.call(o,{name:"email",hash:{},data:l}):s)+'</p>\n\t\t\t<p class="neon-text-white my-2">Scores: 228</p>\n\t\t\t<a href="/settings" class="neon-button-white align-items-center button-md align-items-center">\n\t\t\t\t<img src="public/img/settings.svg" class="img-icon">\n\t\t\t\tSettings\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>\n'},useData:!0}),n["settings.html"]=t({compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){return'<div class="container align-items-center text-center font-brandon font-md">\n\t<div class="form text-center justify-center d-flex-column">\n\t\t<div id="logo" class="justify-around align-items-center my-4 font-street-gathering">\n\t\t\t<a name="index" class="neon-button-red font-xl px-4 py-4" href=\'/\' >KPACUBO</a>\n\t\t</div>\n\n\t\t<form action="" class="d-flex-column justify-center" method="POST">\n\t\t\t<div class="justify-end">\n\t\t\t\t<label class="neon-text-yellow font-brandon font-md" for="username" style="text-align: center; float: left;">Change username</label>\n\t\t\t\t<input type="text" id="username"  placeholder="Username" class="input-dark font-md">\n\t\t\t</div>\n\t\t\t<div class="justify-end">\n\t\t\t\t<label class="neon-text-yellow font-brandon font-md" for="password" style="text-align: center; float: left;">Change password</label>\n\t\t\t\t<input type="password" id="password" placeholder="Password" class="input-dark font-md">\n\t\t\t</div>\n\t\t\t<div class="justify-end">\n\t\t\t\t<label class="neon-text-yellow font-brandon font-md" for="repeat_password" style="text-align: center; float: left;">Repeat password</label>\n\t\t\t\t<input type="password" id="repeat_password" placeholder="Confirm password" class="input-dark font-md">\n\t\t\t</div>\n\n\t\t\t<input class="neon-button-blue px-4 py-4 font-brandon button-md" value="SUBMIT" type="submit" name="submit">\n\t\t</form>\n\t</div>\n</div>\n'},useData:!0}),n["signup.html"]=t({compiler:[7,">= 4.0.0"],main:function(t,n,e,a,l){return'<div class="container align-items-center text-center font-street-gathering font-lg">\n\t<div class="form text-center justify-center d-flex-column">\n\t\t<div class="logo">\n\t\t\t<p><a name="menu"href=\'/\' class="neon-button-red font-lg px-4 py-4">KPACUBO</a></p>\n\t\t</div>\n\t\t<form action="" class="d-flex-column justify-center" method="POST">\n\t\t\t<input class="input-dark" type="text" id="username" placeholder="Username">\n\t\t\t<input class="input-dark" type="text" id="login" placeholder="Login">\n\t\t\t<input class="input-dark" type="email" id="email" placeholder="Email">\n\t\t\t<input class="input-dark" type="password" id="password" placeholder="Password">\n\t\t\t<input class="input-dark" type="password" id="repeat_password" placeholder="Repeat password">\n\t\t\t<input class="neon-button-blue font-brandon button-sm align-items-center justify-center" value="SUBMIT" type="submit" name="submit">\n\t\t</form>\n\t</div>\n</div>\n'},useData:!0})}();