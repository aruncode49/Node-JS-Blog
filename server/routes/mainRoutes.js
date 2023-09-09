const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const title = 'Home';
  res.render("home", { title });
});

router.get("/about", (req, res) => {
  const title = 'About';
  res.render("about", { title });
});

module.exports = router;
