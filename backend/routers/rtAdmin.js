const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const { isAdmin, passLocal } = require('../helpers/auth')

// Login routes
rtAdmin.get('/login', adminController.login)
rtAdmin.post('/login', passLocal)

// Project info routes
rtAdmin.get('/equipo', isAdmin, adminController.team)
rtAdmin.get('/proyecto', isAdmin, adminController.project)

// Client routes
rtAdmin.get('/clientes', isAdmin, adminController.clients)
rtAdmin.get('/pedidos', isAdmin, adminController.orders)

// Product routes
rtAdmin.get('/productos', isAdmin, productController.productsIndex)
rtAdmin.post('/productos', isAdmin, productController.productsSave)
rtAdmin.get('/productos/listar', isAdmin, productController.productsList)
rtAdmin.delete('/productos/:id', isAdmin, productController.productsDelete)
rtAdmin.get('/productos/:id', isAdmin, productController.productsFindById)
rtAdmin.delete('/productos/imagenes/:id', isAdmin, productController.imagesDelete)
rtAdmin.post('/productos/update', isAdmin, productController.productsUpdate)
    
module.exports= rtAdmin