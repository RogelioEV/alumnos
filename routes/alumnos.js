var express = require("express");
var router = express.Router();

// Mongoose alumno model
const Alumno = require("../bin/db/models/alumno");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    var logged = false;
    if (req.query.query == undefined) req.query.query = "";
    alumnos = await Alumno.find({
      $or: [
        { nombre: { $regex: req.query.query, $options: "i" } },
        { matricula: { $regex: req.query.query } }
      ]
    });
    if (req.session.user && req.cookies.user_sid) {
      logged = true;
    }

    res.render("alumnos", { alumnos, logged });
  } catch (e) {
    console.log("something went wrong");
    res.send(e);
  }
});
router.use("/:id", async (req, res) => {
  try {
    let logged = (error = false);
    let alumno = await Alumno.findById(req.params.id);
    if (req.body.fecha != undefined) {
      var fecha = new Date(req.body.fecha);
      fecha.setUTCHours(06);
      logged = fecha.getTime() == alumno.fecha.getTime();
      error = !logged;
    }
    res.render("alumno", { alumno, logged, error });
  } catch (e) {
    res.send(e);
    console.log("Something went wrong");
  }
});
module.exports = router;
