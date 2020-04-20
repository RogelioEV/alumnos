var express = require("express");
var router = express.Router();

// Mongoose alumno model
const Alumno = require("../bin/db/models/alumno");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    var logged = false;
    // Revisar si la busqueda está vacía y cambiarlo a una string vacía.
    if (req.query.query == undefined) req.query.query = "";
    // Función de busqueda de Mongoose, busca a través del nombre y la matricula con regular expresions para ver si lo contiene.
    alumnos = await Alumno.find({
      $or: [
        { nombre: { $regex: req.query.query, $options: "i" } },
        { matricula: { $regex: req.query.query } }
      ]
    });

    //Revisa si un administrativo se loggeo
    if (req.session.user && req.cookies.user_sid) {
      logged = true;
    }
    //Renderea la información encontrada.
    res.render("alumnos", { alumnos, logged });
  } catch (e) {
    console.log("Something went wrong");
    res.send(e);
  }
});

// Maneja las rutas individuales de cada alumno
router.use("/:id", async (req, res) => {
  try {
    // Inicializa las variables logged y error en false
    let logged = (error = false);
    //Busca el alumno con el id escrito en la dirección, es el id del documento en MongoDB
    let alumno = await Alumno.findById(req.params.id);
    // Revisa si se envió una fecha de nacimiento con la petición al servidor, en caso de que sí, las compara para ver si es correcta
    if (req.body.fecha != undefined) {
      var fecha = new Date(req.body.fecha);
      fecha.setUTCHours(06);
      // Si la fecha es correcta logged es true
      logged = fecha.getTime() == alumno.fecha.getTime();
      // Cuando se envía una fecha error siempre es lo contrario de logged
      error = !logged;
    }
    /*
    Renderea el documento, si logged es true se muestra el usuario y contraseña, si es falso se muestra el formulario para ingresar
    una fecha. Si error es true se muestra un mensaje de que se ingresó una fecha de nacimiento erronea.
    */
    res.render("alumno", { alumno, logged, error });
  } catch (e) {
    res.send(e);
    console.log("Something went wrong");
  }
});
module.exports = router;
