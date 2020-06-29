const validator = require('validator');
const empty = require('is-empty');

module.exports = data => {
	// const { name, email, password, password2 } = data;
	const errors = {};

	data.name = !empty(data.name) ? data.name : "";
  data.email = !empty(data.email) ? data.email : "";
  data.password = !empty(data.password) ? data.password : "";
  data.password2 = !empty(data.password2) ? data.password2 : "";

	// Name checks
	if (!data.name) {
		errors.name = 'Name field is required';
	}

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

	if (!data.password2) {
		errors.password2 = 'Confirm password field is required';
	}

	if (!validator.isLength(data.password, { min: 5, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,
		isValid: empty(errors),
	};
};
