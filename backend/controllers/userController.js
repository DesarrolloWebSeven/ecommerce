const User = require("../models/User");
const mailer = require("../helpers/mailer");
const bcrypt = require('bcrypt')

const registerUser = (req, res) => {
  let user = new User(req.body)
  user.save()
    .then(async user => {
      await mailer.send(user.email, 'Hola', 'recover')
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
  console.log("Login", req.body)
  res.send(req.body)
}

const forgotPassword = (req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      if(user.length) {
        res.json(user)
        mailer.send(user[0])
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
