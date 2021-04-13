const express = require('express')
const rtUser = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')

rtUser.post('/registro', userController.registerUser)
rtUser.get('/registro/:id', userController.confirmationUser)
rtUser.post('/login', passport.authenticate('local', {
  successRedirect: 'http://localhost:8080/',
  failureRedirect: 'http://localhost:8080/usuario/login',
  passReqToCallback: true
}))
rtUser.post('/password', userController.forgotPassword)
rtUser.get('/password/:id', userController.getPassword)
rtUser.put('/password/:id', userController.changePassword)

module.exports= rtUser