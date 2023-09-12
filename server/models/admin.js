const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { createTokenForUser } = require("../service/auth");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before storing into the database
userSchema.pre("save", async function (req, res, next) {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

// Let's verify the user with their login credentials
userSchema.statics.matchUser = async function (username, password) {
  try {
    const user = await User.findOne({ username });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        // Create token for the user
        const token = createTokenForUser(user);
        return token;
      }
      throw Error("Incorrect Password");
    }
    throw Error("Invalid Username");
  } catch (error) {
    console.log("Error: ", error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
