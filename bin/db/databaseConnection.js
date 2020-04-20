/* 
Abre la conexión a la base de datos.

Utiliza el módulo mongoose.
*/

const uri =
  "mongodb+srv://User1:toDUPmWcf4sQNlrk@cluster0-7bi2h.mongodb.net/UDT";

const mongoose = require("mongoose");

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  e => {
    if (e) return console.log(e);
    console.log("Connected to db");
  }
);
