const nodemailer = require('nodemailer');

const sendConfirmationEmail = async ({ user, url }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '30f2b8cc9949b1',
			pass: '8a5cf24a5c435d'
		}
	});

	// console.log('user', user);
	// console.log('url', url);
	return await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@bar.com>',
		to: user.email,
		subject: 'Confirm your DEVPRO account', // Subject line
		text: `Hello world? Here's your confirmation link: ${url}`,
		html: `<b>Hello world? Here's your <a href='${url}'>confirmation link</a>.</b>`
	});
};

module.exports = sendConfirmationEmail;
