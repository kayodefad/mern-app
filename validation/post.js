const empty = require('is-empty')

module.exports = data => {
  const errors = {}

  data.title = !empty(data.title) ? data.title : '';
	data.body = !empty(data.body) ? data.body : '';

	// Title Checks
	if (!data.title) {
		errors.title = 'Title field is required';
	} 

	// Body checks
	if (!data.body) {
		errors.body = 'Body field is required';
	}

	return {
		errors,
		isValid: empty(errors),
	};
}