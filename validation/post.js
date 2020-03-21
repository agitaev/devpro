const Validator = require('validator');
const isEmpty = require('is-empty');

const validatePostInput = data => {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.title = !isEmpty(data.title) ? data.title : '';
	data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : '';
	data.body = !isEmpty(data.body) ? data.body : '';

	// Title checks
	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required';
	} else if (data.title.length > 50) {
		errors.title =
			"Let's keep it short and clear. Title must include no more than 50 characters";
	}

	// Subtitle checks
	if (data.subtitle.length > 140) {
		errors.subtitle =
			"That's too long. Subtitle can include no more than 140 characters";
	}

	// Body checks
	if (Validator.isEmpty(data.body)) {
		errors.body = 'Body is missing';
	} else if (data.body.length < 30) {
		errors.body = "We both know it's not enough decriptive";
	}

	// Check if person is authorized (less likely)
	if (Validator.isEmpty(data.author)) {
		errors.author = 'How did you get here?';
	}

	// Check if it includes at least one tag
	if (data.tags === undefined || data.tags.length == 0) {
		errors.tags = 'Please include at least one tag';
	} else if (data.tags.length > 4) {
		errors.tags = 'Cannot accept more than 4 tags';
	}

	return { errors, isValid: isEmpty(errors) };
};

module.exports = validatePostInput;
