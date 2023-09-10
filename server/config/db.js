const mongoose = require("mongoose");

// connect mongodb
function connectMongoDB() {
  mongoose
    .connect(process.env.MONOGDB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error: ", err));
}

module.exports = connectMongoDB;
