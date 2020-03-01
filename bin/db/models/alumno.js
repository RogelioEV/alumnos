const mongoose = require("mongoose");
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
