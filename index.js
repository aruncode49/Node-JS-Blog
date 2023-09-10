// require .env file
require("dotenv").config();

const express = require("express");
const connectDB = require("./server/config/db");

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect DB
connectDB();

// Serving Static files
app.use(express.static("public"));

// Templating Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/mainRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
