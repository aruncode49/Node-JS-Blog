const express = require("express");
const path = require("path");

const router = express.Router();
const Post = require("../models/Post");

const dummyData = require("../constant/dummyData");
/**
 * Get
 * Home
 */
router.get("/", async (req, res) => {
  const title = "NodeJs Blog";

  const posts = await Post.find();

  return res.render("home", { title, posts });
});

/**
 * Get
 * About
 */
router.get("/about", (req, res) => {
  const title = "About";
  return res.render("about", { title });
});

/**
 * Get
 * Post
 */
router.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  const title = post.title;
  return res.render("post", { title, post });
});

// Insert Dummy Data in DB
function insertPostData() {
  Post.insertMany(dummyData);
}
// insertPostData();

module.exports = router;
