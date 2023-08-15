const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const sendEmail = require("../services/mailer");
const otpTemplate = require("../Templates/mail/otpTemplate");
const passwordResetTemplate = require("../Templates/mail/passwordResetTemplate");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

const register = catchAsync(async (req, res, next) => {
	const filteredBody = filterObj(req.body, [
		"firstName",
		"lastName",
		"email",
		"password",
	]);

	const existing_user = User.findOne({ email: filteredBody.email });

	if (existing_user && existing_user.verified) {
		res.status(400).json({
			status: "error",
			message: "Email already in use, Please login",
		});
	} else if (existing_user) {
		await User.findOneAndUpdate(
			{ email: filteredBody.email },
			{ ...filteredBody },
			{ new: true, validateModifiedOnly: true }
		);
		req.user_id = existing_user._id;
		next();
	} else {
		const new_user = await User.create({ ...filteredBody });
		req.user_id = new_user._id;
		next();
	}
});

const sendOTP = catchAsync(async (req, res, next) => {
	const { user_id } = req;

	const new_otp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
		lowerCaseAlphabets: false,
	});

	const otp_expiry_time = Date.now() + 10 * 60 * 1000;

	const user = await User.findByIdAndUpdate(user_id, {
		otp_expiry_time: otp_expiry_time,
	});

	user.otp = new_otp.toString();
	await user.save({ new: true, validateModifiedOnly: true });

	sendEmail({
		sender: process.env.MAIL_SENDER,
		to: user.email,
		subject: "OTP Verification",
		html: otpTemplate(user.firstName, new_otp),
		attachments: [],
	});

	res.status(200).json({
		status: "success",
		message: "OTP Sent Successfully!",
	});
});

const verifyOTP = catchAsync(async (req, res, next) => {
	const { email, otp } = req.body;

	const user = await User.findOne({
		email,
		otp_expiry_time: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400).json({
			status: "error",
			message: "Email is invalid of OTP expired",
		});
	}

	if (user.verified) {
		res.status(400).json({
			status: "error",
			message: "Email is already verified, please login",
		});
	}

	if (!(await user.isCorrectOTP(otp, user.otp))) {
		res.status(400).json({
			status: "error",
			message: "OTP is incorrect. Please enter correct OTP",
		});
		return;
	}

	user.verified = true;
	user.otp = undefined;
	await user.save({ new: true, validateModifiedOnly: true });

	const token = signToken(user._id);

	res.status(200).json({
		status: "success",
		message: "OTP verified Successfully!",
		token,
		user_id: user._id,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({
			status: "error",
			message: "Both email and password are required",
		});
		return;
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.isCorrectPassword(password, user.password))) {
		res.status(400).json({
			status: "error",
			message: "Email or Password is correct",
		});
		return;
	}

	const token = signToken(user._id);

	res.status(200).json({
		status: "success",
		message: "Logged In succeffylly",
		token,
		user_id: user._id,
	});
});

const forgetPassword = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		res.status(400).json({
			status: "error",
			message: `There is no user with email (${email})`,
		});
		return;
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;

		sendEmail({
			sender: process.env.MAIL_SENDER,
			to: user.email,
			subject: "Password Reset",
			html: passwordResetTemplate(user.firstName, resetURL),
			attachments: [],
		});

		res.status(200).json({
			status: "succes",
			message: `Password Reset Link is sent to email (${user.email})`,
		});
	} catch (error) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return res.status(500).json({
			message: "There was an error sending the email. Try again later!",
		});
	}
});

module.exports = { register, sendOTP, verifyOTP, login, forgetPassword };
