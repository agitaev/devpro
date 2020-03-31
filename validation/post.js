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
	} else if (!Validator.isLength(data.title, { max: 96 })) {
		errors.title =
			"Let's keep it short and clear. Title must include no more than 96 characters";
	} else if (!Validator.isLength(data.title, { min: 24 })) {
		errors.title =
			"That's pretty short. Title must at least 24 characters long";
	}

	// Subtitle checks
	if (!Validator.isLength(data.subtitle, { max: 200 })) {
		errors.subtitle =
			"That's too long. Subtitle can include no more than 200 characters";
	}

	// Body checks
	if (Validator.isEmpty(data.body)) {
		errors.body = 'Body is missing';
	} else if (data.body.length < 30) {
		errors.body = "We both know it's not enough decriptive";
	}

	// Check if person is authorized (less likely)
	// if (Validator.isEmpty(data.author)) {
	// 	errors.author = 'How did you get here?';
	// }

	// Check if it includes at least one tag
	if (!data.tags || data.tags.length === 0) {
		errors.tags = 'Please include at least one tag';
	} else if (data.tags.length > 4) {
		errors.tags = 'Cannot accept more than 4 tags';
	}

	return { errors, isValid: isEmpty(errors) };
};

module.exports = validatePostInput;
