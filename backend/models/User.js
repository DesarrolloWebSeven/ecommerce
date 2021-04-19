const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const { isEmail, isStrongPassword } = require('validator');

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [ true, "Debes introducir un email"],
    validate: [isEmail, "Introduce un email válido"]
  },
  password: { 
    type: String, 
    required: [ true, "Debes introducir una contraseña"], 
    validate: [isStrongPassword, "Introduce un password válido"],
  },
  active: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  avatar: { type: String, default: null },
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
