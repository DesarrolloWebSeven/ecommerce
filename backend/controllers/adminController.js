const express = require('express')
const fileUpload = require ('express-fileupload')
const Product = require('../models/Product')
const fs = require('fs').promises
const path = require('path')


const login = (req,res)=>{
    res.render('login')
}

const team = (req,res)=>{
    res.render('team', ({
      title: "Ecommerce Admin | Equipo"
    }))
}

const project = (req,res)=>{
    res.render('project', ({
      title: "Ecommerce Admin | Proyecto"
    }))
}

const clients = (req,res)=>{
    res.render('clients', ({
      title: "Ecommerce Admin | Clientes"
    }))
}

const orders = (req,res)=>{
    res.render('orders', ({
      title: "Ecommerce Admin | Pedidos"
    }))
}

module.exports = {
    login,
    team,
    project,    
    clients,
    orders,
}
