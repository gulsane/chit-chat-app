const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register, authController.sendOTP);
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
