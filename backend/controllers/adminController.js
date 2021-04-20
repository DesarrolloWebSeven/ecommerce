const express = require('express')
const fileUpload = require ('express-fileupload')
const Product = require('../models/Product')
const fs = require('fs').promises
const path = require('path')
const { Console } = require('console')
const User = require('../models/User')
const { createToken } = require('../helpers/validation')

const login = (req,res)=>{
    res.render('login')
}

const signin = async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) res.render('login', { userError: 'Usuario no encontrado'})
    else {
      if(!user.admin) res.render('login', { userError: 'Usuario sin permisos'})
      else {
        const isValid = user.matchPassword(password)
        if(!isValid) res.render('login', { passError: 'Contraseña no válida'})
        if(isValid) {
          const token = createToken(user._id)
          res.cookie('jwt', token, { httpOnly: true });
          res.status(201).redirect('/admin/productos'); 
        }
      }
    }
  } catch (err) {
    res.status(400).json(err)
  }

}

const logout = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 1 })
  res.redirect('/admin')
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

const products_index = (req,res)=>{
    res.render('products', {src:'products.js'})
}

const products_save = (req,res)=>{
    if(req.body.featured=="on") req.body.featured=true
    let images=[]
    req.files.forEach(i=>images.push('/images/'+i.filename))
    req.body.images = images
    let product = new Product(req.body)
    product.save()
        .then(data=>{
            console.log("Producto creado con exito: " + data)
            res.render('products', {src:'products.js', mensaje:"Producto guardado correctamente"})
        })
        .catch(err=>console.log(err))
}

const products_list = (req,res)=>{
        Product.find().then(data=>res.json(data))        
}

const products_delete = async (req,res)=>{
    console.log(req.params.id)
    const product_delete = await Product.findByIdAndDelete(req.params.id)
    res.send("Articulo Eliminado")
    console.log("Se ha borrado: " + product_delete)
}

const products_findById = (req,res)=>{
    Product.findById(req.params.id).lean()
    .then(product=>{
        res.render('products', {product:product, src:'products_update.js'})
    })
}

const images_delete = (req,res)=>{
    let image = req.body.image    
    fs.unlink(path.join(__dirname, '../../public', image))
    .then(() => {console.log('Imagen Borrada con exito!')})
    .catch(err => {console.error('A ocurrido un problema al intentar eliminar la imagen: ', err)})
}

const products_update = (req,res)=>{
    if(req.body.featured==null) req.body.featured=false
    //Asociamos las rutas de imagen al producto
    let imagesOld = req.body.imagesOld.split(',')
    let imagesNew=[]
    req.files.forEach(i=>imagesNew.push('/images/'+i.filename))
    
    //Condiciona el almacenaje de la ruta dependiendo si se cargaron nuevas imagenes o se mantienen las imagenes anteriores
    if(imagesNew.length>0){
        req.body.images = imagesNew
    }else{
        req.body.images = imagesOld
    }
    
    Product.findByIdAndUpdate({_id : req.body._id},
        {
            title : req.body.title,
            description : req.body.description,
            features : req.body.features,
            price : req.body.price,
            category : req.body.category,
            quantity : req.body.quantity,
            images : req.body.images,
            featured : req.body.featured
        },
        function(err, result) {
            if (err) console.log('No se pudo actualizar: ' + err) 
            else console.log('Se actualizo: ' + result)
        }
    )
    .then(product=>{
        console.log('Producto actualizado correctamente: '+ product)
        res.render('products', {src:'products.js'})
    })
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
    signin,
    logout,
    team,
    project,    
    clients,
    orders,
    products_index,
    products_save,
    products_list,
    products_delete,
    products_findById,
    images_delete,
    products_update,
}
