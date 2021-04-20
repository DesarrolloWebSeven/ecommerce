const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const pageController = require('../controllers/staticPageController')
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
rtAdmin.get('/productos', requireAuth, productController.productsIndex)
rtAdmin.post('/productos', requireAuth, productController.productsSave)
rtAdmin.get('/productos/listar', requireAuth, productController.productsList)
rtAdmin.delete('/productos/:id', requireAuth, productController.productsDelete)
rtAdmin.get('/productos/:id', requireAuth, productController.productsFindById)
rtAdmin.delete('/productos/imagenes/:id', requireAuth, productController.imagesDelete)
rtAdmin.post('/productos/update', requireAuth, productController.productsUpdate)

//Content editor
rtAdmin.post('/project', requireAuth, pageController.pageSave)
rtAdmin.get('/pages/:title', pageController.pageList)

module.exports= rtAdmin