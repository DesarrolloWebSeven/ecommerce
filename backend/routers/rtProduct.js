const express = require('express')
const rtProduct = express.Router()
const productController= require('../controllers/productController')


rtProduct.get("/:category", productController.listProduct)
rtProduct.get("/id/:id", productController.showDetailProduct)

module.exports= rtProduct