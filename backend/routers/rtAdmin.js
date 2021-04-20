const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const { isAdmin, passLocal } = require('../helpers/auth')
const { checkUser, requireAuth } = require('../helpers/validation')


// Check User
rtAdmin.get('*', checkUser)

// Login routes
rtAdmin.get('/login', adminController.login)
rtAdmin.post('/login', adminController.signin)
rtAdmin.get('/logout', adminController.logout)

// Project info routes
rtAdmin.get('/equipo', requireAuth, adminController.team)
rtAdmin.get('/proyecto', requireAuth, adminController.project)

// Client routes
rtAdmin.get('/clientes', requireAuth, adminController.clients)
rtAdmin.get('/pedidos', requireAuth, adminController.orders)

// Product routes
rtAdmin.get('/productos', isAdmin, productController.productsIndex)
rtAdmin.post('/productos', isAdmin, productController.productsSave)
rtAdmin.get('/productos/listar', isAdmin, productController.productsList)
rtAdmin.delete('/productos/:id', isAdmin, productController.productsDelete)
rtAdmin.get('/productos/:id', isAdmin, productController.productsFindById)
rtAdmin.delete('/productos/imagenes/:id', isAdmin, productController.imagesDelete)
rtAdmin.post('/productos/update', isAdmin, productController.productsUpdate)
    
module.exports= rtAdmin