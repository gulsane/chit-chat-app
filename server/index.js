const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./src/app.js");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on PORT : ${PORT}`);
});
