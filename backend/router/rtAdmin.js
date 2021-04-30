const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const pageController = require('../controllers/pageController')
const clientController = require('../controllers/clientController')
const { checkUser, requireAuth } = require('../helpers/validation')


// Check User
rtAdmin.get('*', checkUser)

// Login routes
rtAdmin.get('/', adminController.login)
rtAdmin.post('/', adminController.signin)
rtAdmin.get('/logout', adminController.logout)

// Project info routes
rtAdmin.get('/proyecto', requireAuth, adminController.project)

// Client routes
rtAdmin.get('/clientes', requireAuth, clientController.clientsList)
rtAdmin.get('/clientes/:id', requireAuth, clientController.clientsFindById)
rtAdmin.put('/clientes/:id', requireAuth, clientController.clientsUpdate)


// Orders routes
rtAdmin.get('/pedidos', requireAuth, adminController.orders)
rtAdmin.get('/pedidos', requireAuth, adminController.orders)

// Product routes
rtAdmin.get('/productos', requireAuth, productController.productsList)
rtAdmin.post('/productos', requireAuth, productController.productsSave)
rtAdmin.delete('/productos/:id', requireAuth, productController.productsDelete)
rtAdmin.get('/productos/:id', requireAuth, productController.productsFindById)
rtAdmin.delete('/:img', requireAuth, productController.imagesDelete)
rtAdmin.put('/productos/:id', requireAuth, productController.productsUpdate)

// Content editor
rtAdmin.post('/editor/:title', requireAuth, pageController.pageUpdate)
rtAdmin.get('/editor/:title', pageController.pageList)

module.exports= rtAdmin