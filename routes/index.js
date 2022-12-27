var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const session = req.session;
  if (session) {
    res.render("index", { title: "Phone Store", user: session.email });
  } else {
    res.render("index", { title: "Phone Store", user: "" });
  }
});

module.exports = router;
