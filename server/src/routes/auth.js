const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register, authController.sendOTP);
router.post("/send-otp", authController.sendOTP);

module.exports = router;
