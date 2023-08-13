const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const routes = require("./routes/index.js");
const express = require("express");
const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		secret: "anonymous monkey",
		proxy: true,
		resave: true,
		saveUnintialized: true,
		cookie: {
			secure: false,
		},
	})
);

app.use(helmet());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

const limiter = rateLimit({
	max: 3000,
	windowMs: 60 * 60 * 1000,
	message: "Too many Requests from this IP, please try again in an hour!",
});

app.use("/tawk", limiter);

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(mongosanitize());
app.use(xss());
app.use(routes);
module.exports = app;
