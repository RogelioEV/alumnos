var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const Usuario = require("../bin/db/models/usuario");
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("login");
});

/*
Punto de entrada del formulario para iniciar sesión como administrativo.
Los errores dan información de qué está mal, pero nunca se envían, solo los usé para debuggear.
*/
router.post("/", async (req, res) => {
  try {
    var user = req.body.user.toLowerCase();
    var doc = await Usuario.findOne({ user });
    if (!doc) throw new Error("No hay usuario");
    var logged = await bcrypt.compare(req.body.password, doc.password);
    if (!logged) throw new Error("No coincide el pass");
    req.session.user = doc;
    res.redirect("/alumnos");
  } catch (e) {
    res.render("login", { error: true });
  }
});
module.exports = router;
