const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// createTokenForUser function for user
function createTokenForUser(user) {
  try {
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    return token;
  } catch (error) {
    console.log("Error in auth.js: ", error);
  }
}

// verify jwt token
function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.userId = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  createTokenForUser,
  verifyToken,
};
