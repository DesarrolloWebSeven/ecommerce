const express = require('express')
const rtUser = express.Router()
const userController = require('../controllers/userController')

rtUser.post('/registro', userController.registerUser)
rtUser.get('/registro/:id', userController.confirmationUser)
rtUser.post('/login', userController.login)
rtUser.post('/password', userController.forgotPassword)
rtUser.get('/password/:id', userController.getPassword)
rtUser.put('/password/:id', userController.changePassword)
rtUser.get('/permiso', userController.auth)
rtUser.post('/contacto', userController.contactMail)

module.exports= rtUser