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
rtAdmin.get('/productos', isAdmin, adminController.products_index)
rtAdmin.post('/productos', isAdmin, adminController.products_save)
rtAdmin.get('/productos/listar', isAdmin, adminController.products_list)
rtAdmin.delete('/productos/:id', isAdmin, adminController.products_delete)
rtAdmin.get('/productos/:id', isAdmin, adminController.products_findById)
rtAdmin.delete('/productos/imagenes/:id', isAdmin, adminController.images_delete)
rtAdmin.put('/productos/:id', isAdmin, adminController.products_update)
    
module.exports= rtAdmin