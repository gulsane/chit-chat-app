const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last Name is required"],
	},
	about: {
		type: String,
	},
	avatar: {
		type: String,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: function (email) {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			},
			message: (props) => `Email (${props.value}) is invalid!`,
		},
	},
	password: {
		type: String,
	},
	passwordChangedAt: {
		type: Date,
	},
	passwordResetToken: {
		type: String,
	},
	passwordResetExpiresAt: {
		type: Date,
	},
	profileCreatedAt: {
		type: Date,
		default: Date.now(),
	},
	profileUpdatedAt: {
		type: Date,
	},
	profileVerified: {
		type: Boolean,
		default: false,
	},
	otp: {
		type: String,
	},
	otp_expire_time: {
		type: Date,
	},
	socket_id: {
		type: String,
	},
	onlineStatus: {
		type: String,
		enum: ["online", "offline"],
	},
	friends: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
