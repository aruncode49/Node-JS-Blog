// require .env file
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./server/config/db");

const app = express();
const PORT = 3000 || process.env.PORT;

// Connect DB
connectDB();

// Serving Static files
app.use(express.static("public"));

// Templating Engine
app.set("view engine", "ejs");

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", require("./server/routes/mainRoutes"));
app.use("/", require("./server/routes/adminRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
