const express = require('express')
const rtProduct = express.Router()
const productController= require('../controllers/productController')


rtProduct.get("/:category", productController.listProduct)

module.exports= rtProduct