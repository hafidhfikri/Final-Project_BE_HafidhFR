const express = require("express");
const app = express();
const port = process.env.PORT || 80;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());

app.use("/", require("./routes"));

app.listen(port, () => {
	console.log(`Server running on PORT: ${port}`);
});