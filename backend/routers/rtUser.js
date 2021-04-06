const express = require('express')
const rtUser = express.Router()
const userController = require('../controllers/userController')

rtUser.post('/registro', userController.register)

module.exports= rtUser