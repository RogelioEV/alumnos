/* 
Abre la conexión a la base de datos.

Utiliza el módulo mongoose.
*/

const uri =
  "uri";

const mongoose = require("mongoose");

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  e => {
    if (e) return console.log(e);
    console.log("Connected to db");
  }
);
