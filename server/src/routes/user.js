const router = require("express").Router();
const { protect } = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/get-me", protect, userController.getMe);
router.patch("/update-me", protect, userController.updateMe);
router.get(
	"/get-all-verified-users",
	protect,
	userController.getAllVerifiedUsers
);
router.get("/get-users", protect, userController.getUsers);
router.get("/get-friend-requests", protect, userController.getFriendRequests);

module.exports = router;
