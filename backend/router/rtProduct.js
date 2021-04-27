const express = require('express')
const rtProduct = express.Router()
const productController= require('../controllers/productController')
const orderController = require('../controllers/orderController')

// Show products per category
rtProduct.get("/:category", productController.listProduct)

// Show product details
rtProduct.get("/id/:id", productController.showDetailProduct)

// Save an pending order
rtProduct.post("/pedido", orderController.saveOrder)

// Payment and order confirmation
rtProduct.put("/pago", orderController.payment)

module.exports= rtProduct