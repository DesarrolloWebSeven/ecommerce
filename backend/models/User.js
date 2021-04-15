const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const validator = require('validator');

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    required: [ true, "Debes introducir un email"],
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: "Introduce un email válido"
    },
  },
  password: { 
    type: String, 
    required: [ true, "Debes introducir una contraseña"], 
    validate: {
      validator: function(v) {
        return validator.isStrongPassword(v, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        });
      },
      message: "Introduce un password válido"
    },
  },
  active: { type: Boolean, default: false },
  provider: { type: String },
  admin: { type: Boolean, default: false },
  phone: { type: Number },
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
