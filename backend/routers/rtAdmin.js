const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
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
rtAdmin.get('/productos', isAdmin, adminController.productsIndex)
rtAdmin.post('/productos', isAdmin, adminController.productsSave)
rtAdmin.get('/productos/listar', isAdmin, adminController.productsList)
rtAdmin.delete('/productos/:id', isAdmin, adminController.productsDelete)
rtAdmin.get('/productos/:id', isAdmin, adminController.productsFindById)
rtAdmin.delete('/productos/imagenes/:id', isAdmin, adminController.imagesDelete)
rtAdmin.post('/productos/update', isAdmin, adminController.productsUpdate)
    
module.exports= rtAdmin