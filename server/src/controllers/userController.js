const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");

const getMe = catchAsync(async (req, res) => {
	res.status(200).json({
		status: "success",
		data: req.user,
	});
});

const updateMe = catchAsync(async (req, res) => {
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

const getAllVerifiedUsers = catchAsync(async (req, res) => {
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

const getUsers = catchAsync(async (req, res) => {
	const all_users = await User.find({
		verified: true,
	}).select("firstName lastName _id");

	const this_user = req.user;

	const remaining_users = all_users.filter(
		(user) =>
			!this_user.friends.includes(user._id) &&
			user._id.toString() !== req.user._id.toString()
	);

	res.status(200).json({
		status: "success",
		data: remaining_users,
		message: "Users found successfully!",
	});
});

const getFriendRequests = catchAsync(async (req, res) => {
	const requests = await FriendRequest.find({ recipient: req.user._id })
		.populate("sender")
		.select("_id firstName lastName");

	res.status(200).json({
		status: "success",
		data: requests,
		message: "Requests found successfully!",
	});
});

const getFriends = catchAsync(async (req, res) => {
	const this_user = User.findById(req.user._id).populate(
		"friends",
		"firstName lastName _id"
	);

	res.status(200).json({
		status: "success",
		data: this_user.friends,
		message: "Friends found successfully",
	});
});

module.exports = {
	getMe,
	updateMe,
	getAllVerifiedUsers,
	getUsers,
	getFriendRequests,
	getFriends,
};
