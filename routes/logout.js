var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.cookies.user_sid && req.session.user) {
    res.clearCookie("user");
    req.session.user = undefined;
    res.redirect("/");
  }
});
module.exports = router;
