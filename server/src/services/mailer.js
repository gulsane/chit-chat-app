const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const sendNodemailerGmail = async ({
	to,
	sender,
	subject,
	html,
	attachments,
	text,
}) => {
	const from = process.env.MAIL_SENDER;
	const mailPasskey = process.env.MAIL_PASSKEY;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: from,
			pass: mailPasskey,
		},
	});

	const mailOptions = {
		from: from,
		to: to,
		sender: sender,
		subject: subject,
		text: text,
		html: html,
		attachments: attachments,
	};
	try {
		return transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(error);
	}
};

module.exports = sendEmail = async (args) => {
	if (process.env.NODE_ENV === "development") {
		return Promise.resolve();
	} else {
		return sendNodemailerGmail(args);
	}
};
