const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')


rtAdmin.get('/', adminController.login)
rtAdmin.get('/equipo', adminController.team)
rtAdmin.get('/proyecto', adminController.project)
rtAdmin.get('/clientes', adminController.clients)
rtAdmin.get('/pedidos',adminController.orders)
rtAdmin.get('/productos', adminController.products_index)
rtAdmin.post('/productos', adminController.products_save)
rtAdmin.get('/productos/listar', adminController.products_list)
rtAdmin.delete('/productos/eliminar/:id', adminController.products_delete)
rtAdmin.get('/productos/actualizar/:id', adminController.products_findById)
rtAdmin.put('/productos/actualizar/:id', adminController.products_update)
    
module.exports= rtAdmin