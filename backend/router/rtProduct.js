const express = require('express')
const rtProduct = express.Router()
const productController= require('../controllers/productController')


rtProduct.get("/:category", productController.listProduct)
rtProduct.get("/id/:id", productController.showDetailProduct)
rtProduct.post("/pedido", productController.saveOrder)
rtProduct.put("/pago", productController.payment)

module.exports= rtProduct