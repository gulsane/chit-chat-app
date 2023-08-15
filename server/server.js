const http = require("http");
const mongoose = require("mongoose");
mongoose.set({ strictQuery: true });
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./src/app.js");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`Server is running on PORT : ${PORT}`);
});

const DATABASE = process.env.DATABASE;
mongoose
	.connect(DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB connection succefully");
	});
