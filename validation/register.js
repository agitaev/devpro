const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = data => {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.passwordVerification = !isEmpty(data.passwordVerification)
		? data.passwordVerification
		: '';

	// Name checks
	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// Password checks
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (Validator.isEmpty(data.passwordVerification)) {
		errors.passwordVerification = 'Confirm password field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (!Validator.equals(data.password, data.passwordVerification)) {
		errors.passwordVerification = 'Passwords must match';
	}

	// Followed tags field check
	if (data.followed_tags.length < 3) {
		errors.followed_tags = 'Choose at least 3 tags to get personalized feed';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateRegisterInput;
