// require .env file
require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = 3000 || process.env.PORT;

// Serving Static files
app.use(express.static("public"));

// Templating Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/mainRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
