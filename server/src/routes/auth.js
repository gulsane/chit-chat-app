const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register, authController.sendOTP);

module.exports = router;
