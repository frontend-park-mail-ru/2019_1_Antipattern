'use strict';

(function() {
	class UserModel {
		constructor(username, email, login, img = null) {
			this._username = username;
			this._email = email;
			this._login = login;
			this._img = img;
		}

		updateUsername(username) {
			this._username = username
		}
	}

	window.UserModel = UserModel;
})();