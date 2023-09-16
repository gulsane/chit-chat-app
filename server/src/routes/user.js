const router = require("express").Router();
const { protect } = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/get-me", protect, userController.getMe);

module.exports = router;
