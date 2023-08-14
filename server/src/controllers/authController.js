const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const sendEmail = require("../services/mailer");
const otpTemplate = require("../Templates/otpTemplate");

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

module.exports = { register, sendOTP, verifyOTP };
