const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const User = require("../models/user");
const FriendRequest = require("../models/friendRequest");
const AudioCall = require("../models/audioCall");
const VideoCall = require("../models/videoCall");

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

const getCallLogs = catchAsync(async (req, res) => {
	const user_id = req.user._id;

	const call_logs = [];

	const audio_calls = await AudioCall.find({
		participants: { $all: [user_id] },
	}).populate("from to");

	const video_calls = await VideoCall.find({
		participants: { $all: [user_id] },
	}).populate("from to");

	for (let elm of audio_calls) {
		const missed = elm.verdict !== "Accepted";
		if (elm.from._id.toString() === user_id.toString()) {
			const other_user = elm.to;

			// outgoing
			call_logs.push({
				id: elm._id,
				img: other_user.avatar,
				name: other_user.firstName,
				online: true,
				incoming: false,
				missed,
			});
		} else {
			// incoming
			const other_user = elm.from;

			// outgoing
			call_logs.push({
				id: elm._id,
				img: other_user.avatar,
				name: other_user.firstName,
				online: true,
				incoming: false,
				missed,
			});
		}
	}

	for (let element of video_calls) {
		const missed = element.verdict !== "Accepted";
		if (element.from._id.toString() === user_id.toString()) {
			const other_user = element.to;

			// outgoing
			call_logs.push({
				id: element._id,
				img: other_user.avatar,
				name: other_user.firstName,
				online: true,
				incoming: false,
				missed,
			});
		} else {
			// incoming
			const other_user = element.from;

			// outgoing
			call_logs.push({
				id: element._id,
				img: other_user.avatar,
				name: other_user.firstName,
				online: true,
				incoming: false,
				missed,
			});
		}
	}

	res.status(200).json({
		status: "success",
		message: "Call Logs Found successfully!",
		data: call_logs,
	});
});

module.exports = {
	getMe,
	updateMe,
	getAllVerifiedUsers,
	getUsers,
	getFriendRequests,
	getFriends,
	getCallLogs,
};
