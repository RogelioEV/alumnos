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

userSchema.pre("save", async function(next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
var UserModel = mongoose.model("usuario", userSchema);

module.exports = UserModel;
