const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

const app = express();

app.listen(PORT, () => {
	console.log(`Server is running on PORT : ${PORT}`);
});
