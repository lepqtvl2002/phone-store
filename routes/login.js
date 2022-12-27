var express = require("express");
var router = express.Router();
var users = require("./userModel.js");

router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/", async function (req, res, next) {
  console.log(req.body);
  try {
    const isUser = await users.isValidate(req.body.email, req.body.password);
    const session = req.session;
    console.log(isUser);
    if (isUser) {
      session.email = req.body.email;
      res.render("index", { title: "Phone Store", user: session.email });
    } else {
      res.render("login", { title: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
