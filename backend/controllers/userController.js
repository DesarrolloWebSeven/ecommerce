const User = require("../models/User");
const mailer = require("../helpers/mailer");
const bcrypt = require('bcryptjs');
const errorHandler = require('../helpers/validation')
const jwt = require('jsonwebtoken');

// User Sign Up
const registerUser = async (req, res) => {

  try {
    const user = await User.create(req.body)
    mailer.send(user.email, user._id, 'Bienvenido a Geeky', 'confirmationEmail')
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = errorHandler.signupValidation(err)
    res.json(errors)
  }

}

// Account confirmation
const confirmationUser = (req, res) => {
  User.updateOne({_id: req.params.id}, {$set: {active: true}})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

// User Sign In
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) res.json('Usuario no encontrado')
    else {
      if(!user.active) res.json('Usuario no activado')
      else {
        const isValid = user.matchPassword(password)
        if(!isValid) res.json('Contraseña no válida')
        if(isValid) {
          const token = errorHandler.createToken(user._id)
          const usuario = { _id: user._id , email: user.email , token }
          res.status(201).json(usuario); 
        }
      }
    }
  } catch (err) {
    res.status(400).json(err)
  }

}

// Change password
const forgotPassword = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        if(user.active === true) {
          return new Promise((resolve, reject) => {
            mailer.send(user.email, user._id, 'Cambiar contraseña', 'changePassword')
            resolve(res.json(user))
          }) 
        }
        if(user.active !== true) res.json("Usuario no confirmado")
      } else res.json("Usuario no encontrado")
      })
    .catch(err => res.json(err))
}

// Form to change password
const getPassword = (req, res) => {
  User.find({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

// Change password on the database
const changePassword = async (req, res) => {
    const salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(req.body.password, salt);
    User.updateOne({_id: req.params.id}, {$set: {password: passwordHash}})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

const auth = (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1]
  
  jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
    (err) ? res.json({ message: 'fail', err }) : res.json({ message: 'success', decodedToken })
  })

}

const contactMail = async (req, res) => {

  const user = req.body
  
  try {
    mailer.send('geeky@gmail.com', user, 'Consulta cliente', 'contactEmail')
    res.json('Consulta ok')
  } catch (err) {
    res.json(err)
  }

}

const getInfoUser =(req, res) => {
  const user = req.body
  console.log(user)
}

module.exports = {
  registerUser,
  confirmationUser,
  login,
  forgotPassword,
  getPassword,
  changePassword,
  auth,
  contactMail,
  getInfoUser
}
