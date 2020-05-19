const nodemailer = require('nodemailer');

const sendConfirmationEmail = async ({ user, url }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	return await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@bar.com>',
		to: user.email,
		subject: 'Confirm your M1R7D3 account', // Subject line
		text: `Hello world? Here's your confirmation link: ${url}`,
		html: `<b>Hello world? Here's your <a href='${url}'>confirmation link</a>.</b>`,
	});
};

module.exports = sendConfirmationEmail;
