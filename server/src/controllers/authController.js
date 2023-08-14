const User = require("../models/user");
const otpGenerator = require("otp-generator");

const register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const existing_user = User.findOne({ email: email });

		if (existing_user && existing_user.verified) {
			res.status(400).json({
				status: "error",
				message: "Email already in use, Please login",
			});
		} else if (existing_user) {
			await User.findOneAndUpdate(
				{ email: email },
				{ firstName, lastName, email, password },
				{ new: true, validateModifiedOnly: true }
			);
			req.user_id = existing_user._id;
			next();
		} else {
			const new_user = await User.create({
				firstName,
				lastName,
				email,
				password,
			});
			req.user_id = new_user._id;
			next();
		}
	} catch (error) {
		next(error);
	}
};

const sendOTP = async (req, res, next) => {
	try {
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

		//TODO -> Add mailer service here

		res.status(200).json({
			status: "success",
			message: "OTP Sent Successfully!",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { register, sendOTP };
