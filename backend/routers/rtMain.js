const express = require('express')
const rtMain = express.Router()
const adminController = require('../controllers/adminController')

rtMain.get('/', adminController.home)

module.exports= rtMain