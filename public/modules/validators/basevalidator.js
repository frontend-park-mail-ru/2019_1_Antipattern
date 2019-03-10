'use strict';

(function() {
	class BaseValidator {
		correctLength(text) {
            const MIN_LEN = 4;
            const MAX_LEN = 25;

            return text.length >= MIN_LEN && text.length <= MAX_LEN;
        }

        correctEmail(email) {
            const email_regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email.match(email_regexp)) {
                return false;
            }
            return true;
        }

        correctUsername(username) {
            const username_regexp = /^[a-zA-Z0-9]+$/;
            if (!username.match(username_regexp)) {
                return false;
            }
            return true;
        }
	}

	window.BaseValidator = new BaseValidator();
})();
