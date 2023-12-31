const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

userSchema.pre("save", async function (next) {
	if (!this.isModified("otp") || !this.otp) {
		return next();
	}

	this.otp = await bcrypt.hash(this.otp.toString(), 12);

	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password") || !this.password) {
		return next();
	}

	this.password = await bcrypt.hash(this.password.toString(), 12);

	next();
});

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew || !this.password) {
		return next();
	}

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.isCorrectOTP = async function (candidateOTP, userOTP) {
	return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.isCorrectPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = async function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimeStamp < changedTimeStamp;
	}

	return false;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
