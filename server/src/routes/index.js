const router = require("express").Router();

const authRoute = require("./auth.js");

router.use("/auth", authRoute);

module.exports = router;
