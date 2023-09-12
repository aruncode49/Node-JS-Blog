const express = require("express");
const path = require("path");

const router = express.Router();

// import User model
const User = require("../models/admin");
const { verifyToken } = require("../service/auth");

/**
 * Get -> Login
 */
router.get("/login", async (req, res) => {
  const title = "Admin";

  return res.render("login", { title });
});

/**
 * Get -> Register
 */
router.get("/register", async (req, res) => {
  const title = "Admin";

  return res.render("register", { title });
});

/**
 * Post -> Login
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await User.matchUser(username, password);
    if (token) {
      res.cookie("token", token);
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Post -> Register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({
      username,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log("Error: ", error);
  }
});

/**
 * Get -> Dashboard
 */
router.get("/dashboard", verifyToken, async (req, res) => {
  return res.render("dashboard", { title: "Dashboard" });
});

module.exports = router;
