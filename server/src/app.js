const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const express = require("express");
const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
		credentials: true,
	})
);

module.exports = app;
