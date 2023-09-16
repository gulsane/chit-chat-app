const router = require("express").Router();

const authRoute = require("./auth.js");
const userRoute = require("./user.js");

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
