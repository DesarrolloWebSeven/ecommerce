const express = require('express')
const rtAdmin = express.Router()

rtAdmin.get('/',(req,res)=>{
    res.render('admin')
})

module.exports= rtAdmin