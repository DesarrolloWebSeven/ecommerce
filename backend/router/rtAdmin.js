const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const { checkUser, requireAuth } = require('../helpers/validation')


// Check User
rtAdmin.get('*', checkUser)

// Login routes
rtAdmin.get('/', adminController.login)
rtAdmin.post('/', adminController.signin)
rtAdmin.get('/logout', adminController.logout)

// Project info routes
rtAdmin.get('/equipo', requireAuth, adminController.team)
rtAdmin.get('/proyecto', requireAuth, adminController.project)

// Client routes
rtAdmin.get('/clientes', requireAuth, adminController.clients)
rtAdmin.get('/pedidos', requireAuth, adminController.orders)

// Product routes
rtAdmin.get('/productos', requireAuth, adminController.products_index)
rtAdmin.post('/productos', requireAuth, adminController.products_save)
rtAdmin.get('/productos/listar', requireAuth, adminController.products_list)
rtAdmin.delete('/productos/:id', requireAuth, adminController.products_delete)
rtAdmin.get('/productos/:id', requireAuth, adminController.products_findById)
rtAdmin.delete('/productos/imagenes/:id', requireAuth, adminController.images_delete)
rtAdmin.post('/productos/update', requireAuth, adminController.products_update)
    
module.exports= rtAdmin