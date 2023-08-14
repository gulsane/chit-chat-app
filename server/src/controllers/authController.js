const User = require("../models/user");

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

module.exports = { register };
