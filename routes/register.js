var express = require("express");
var router = express.Router();
var users = require("./userModel.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("register", { title: "Register", error: "" });
});

router.post("/", async function (req, res, next) {
  console.log(req.body);

  try {
    const user = await users.isEmailAlreadyExit(req.body.email);
    console.log(user);
    const session = req.session;
    if (user) {
      res.render("register", {
        title: "Register",
        error: "Email already exits",
      });
    } else {
      session.email = req.body.email;
      await users.create(req.body.email, req.body.password);
      res.render("index", {
        title: `Welcome ${req.body.email}`,
        user: session.email,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
