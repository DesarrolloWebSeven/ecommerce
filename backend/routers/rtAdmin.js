const express = require('express')
const rtAdmin = express.Router()

rtAdmin.get('/',(req,res)=>{
    res.render('admin')
})
rtAdmin.get('/productos/form',(req,res)=>{
    res.render('productos')
})
    
module.exports= rtAdmin