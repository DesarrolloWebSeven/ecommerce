const express = require('express')
const rtUser = express.Router()
const userController = require('../controllers/userController')

rtUser.post('/registro', userController.register)
rtUser.get('/registro/:id', userController.confirmation)

module.exports= rtUser