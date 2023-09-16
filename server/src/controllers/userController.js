const catchAsync = require("../utils/catchAsync");

const getMe = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: "success",
		data: req.user,
	});
});

module.exports = { getMe };
