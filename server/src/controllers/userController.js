const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const User = require("../models/user");

const getMe = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: "success",
		data: req.user,
	});
});

const updateMe = catchAsync(async (req, res, next) => {
	const filteredBody = filterObj(
		req.body,
		"firstName",
		"lastName",
		"about",
		"avatar"
	);

	const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

	res.status(200).json({
		status: "success",
		data: userDoc,
		message: "User Updated successfully",
	});
});

module.exports = { getMe, updateMe };
