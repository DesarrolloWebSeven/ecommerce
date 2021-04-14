const User = require("../models/User");
const mailer = require("../helpers/mailer");
const bcrypt = require('bcrypt')

const registerUser = (req, res) => {
  let user = new User(req.body)
  user.save()
    .then(async user => {
      await mailer.send(user, user._id, 'Bienvenido a Geeky', 'confirmationEmail')
      res.json(user)
    })
    .catch(err => res.json(err))
}

const confirmationUser = (req, res) => {
  User.updateOne({_id: req.params.id}, {$set: {active: true}})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        if(user.active !== true) res.json("Usuario no confirmado")
        if(!user.matchPassword(req.body.password)) res.json("Password incorrecto")
        if(user.matchPassword(req.body.password)) res.json(user)
      } else res.json("Usuario no encontrado")
      })
    .catch(err => res.json(err))
}

const forgotPassword = (req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      if(user.length) {
        if(user[0].active === true) {
          return new Promise((resolve, reject) => {
            mailer.send(user[0], user[0]._id, 'Cambiar contraseña', 'changePassword')
            resolve(res.json(user))
          }) 
        }
        if(user[0].active !== true) res.json("Usuario no confirmado")
      } else res.json("Usuario no encontrado")
      })
    .catch(err => res.json(err))
}

const getPassword = (req, res) => {
  User.find({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

const changePassword = async (req, res) => {
    const salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(req.body.password, salt);
    User.updateOne({_id: req.params.id}, {$set: {password: passwordHash}})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports = {
  registerUser,
  confirmationUser,
  login,
  forgotPassword,
  getPassword,
  changePassword
}
