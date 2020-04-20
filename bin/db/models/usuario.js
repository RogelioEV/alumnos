/*
Modelo de usuarios administrativos.

Es la plantilla para crear, leer y modificar los documentos de administrativos en la base de datos.

*/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});

/*
Middleware para hashear la contraseña y no se almacene directamente en la base de datos. Se utiliza el hash bcrypt.
*/
userSchema.pre("save", async function(next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});


var UserModel = mongoose.model("usuario", userSchema);

module.exports = UserModel;
