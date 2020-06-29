const validator = require('validator');
const empty = require('is-empty');

module.exports = data => {
	const errors = {};

	data.email = !empty(data.email) ? data.email : '';
	data.password = !empty(data.password) ? data.password : '';

	// Email Checks
	if (!data.email) {
		errors.email = 'Email field is required';
	} else if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// Password checks
	if (!data.password) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};
