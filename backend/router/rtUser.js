const express = require('express')
const rtUser = express.Router()
const userController = require('../controllers/userController')

// Sign Up
rtUser.post('/registro', userController.registerUser)
rtUser.get('/registro/:id', userController.confirmationUser)

// Sign In
rtUser.post('/login', userController.login)

// Change Password
rtUser.post('/password', userController.forgotPassword)
rtUser.get('/password/:id', userController.getPassword)
rtUser.put('/password/:id', userController.changePassword)

// Authentication
rtUser.get('/permiso', userController.auth)

// Contact Information
rtUser.post('/contacto', userController.contactMail)

// User profile
rtUser.get('/perfil/:id', userController.getInfoUser)

module.exports= rtUser