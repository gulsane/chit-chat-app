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

const getAllVerifiedUsers = catchAsync(async (req, res, next) => {
	const all_users = await User.find({
		verified: true,
	}).select("firstName lastName _id");

	const remaining_users = all_users.filter(
		(user) => user._id.toString() !== req.user._id.toString()
	);

	res.status(200).json({
		status: "success",
		data: remaining_users,
		message: "Users found successfully!",
	});
});

module.exports = { getMe, updateMe, getAllVerifiedUsers };
