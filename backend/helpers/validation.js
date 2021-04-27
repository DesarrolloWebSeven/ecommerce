const jwt = require('jsonwebtoken')
const User = require('../models/User')

// User Registration validation
const signupValidation = (err) => {
  let errors = { email: '', password: ''}

  // Duplicated email
  if (err.code === 11000) {
    errors.email = "El email ya está registrado"
    return errors
  }

  if (err.message.includes('validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// User SignIn Validation
const signinValidation = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes('usuario')) errors.email = err
  else errors.password = err

  return errors
}

// Create Token
const createToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60
  return jwt.sign({ id }, process.env.TOKEN, { expiresIn: maxAge })
}

// Check Valid Token
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if(token) {
    jwt.verify(token, process.env.TOKEN, (err) => {
      (err) ? res.redirect('/admin') : next()
    })
  } else res.redirect('/admin')
}

// Check if User has already signed in
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if(token) {
    jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        const user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = {
  signupValidation,
  signinValidation,
  createToken,
  requireAuth,
  checkUser
}