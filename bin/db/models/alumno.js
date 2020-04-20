const mongoose = require("mongoose");

/* 
Modelo de alumno.

Es la plantilla para crear, leer y modificar los documentos de alumnos en la base de datos.
*/


const Alumno = mongoose.model("Alumno", {
  nombre: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  matricula: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    required: true
  }
});

module.exports = Alumno;
