const Product = require('../models/Product')
const fs = require('fs').promises
const path = require('path')

// Show a list with all the products
const productsList = (req, res) => {
  Product.find().then(data => {
    let products = []
    data.forEach( item => {
      let product = {}
      product.title = item.title
      product.quantity = item.quantity
      product.image1 = item.images[0]
      product.image2 = item.images[1]
      product.id = item._id
      products.push(product)
    })
    res.render('products', { title: 'Admin | Productos', src: 'products.js', css: 'products', products})
    })        
}

// Create and save a new product
const productsSave = (req, res) => {
  let images = []
  req.files.forEach( i => images.push(i.filename))
  req.body.images = images
  let product = new Product(req.body)
  product.save()
    .then( data => res.render('products', { 
      css: 'products', 
      title: 'Admin | Productos', 
      message:"Producto guardado correctamente"
    }))
    .catch( err => res.render('products', {
      src:'products.js', 
      css: 'products', 
      title: 'Admin | Productos', 
      message:"Revise los campos, e intentelo nuevamente",
      err: err.errors
    }))
}

// Delete a product on the database
const productsDelete = async (req, res) => {

  Product.findById(req.params.id).lean()
    .then(async product => {
      if(product.images.length) product.images.forEach(image => fs.unlink(path.join(__dirname, '../../public/images/', image)))
      Product.findByIdAndDelete(req.params.id)
    })
    .then(() => res.render('products', { src:'products.js', css: 'products', title: 'Admin | Productos' }))
    .catch(err => console.error('Problema al eliminar la imagen: ', err))

}

// Show info of a specific product
const productsFindById = (req, res) => {

  Product.findById(req.params.id).lean()
    .then(product => {
      product.image1 = product.images[0]
      product.image2 = product.images[1]
      res.render('product', {product, title: 'Admin | Productos', src:'product.js', css: 'products'})})
    .catch(err => console.log(err.message))

}

// Delete images from the folder
const imagesDelete = (req, res) => {  

  fs.unlink(path.join(__dirname, '../../public/images/', req.params.img))
    .then(() => console.log('¡Imagen Borrada con exito!'))
    .catch(err => console.error(err.message))

}

// Update the product's info on the database
const productsUpdate = (req, res) => {
  let newImages = req.body.images.split(',')
  newImages.forEach( image => {
    if (image === '') newImages.splice(newImages.indexOf(image), 1)
  }) 
  req.files.forEach(i => newImages.push(i.filename))
    
  Product.findByIdAndUpdate({_id : req.body.id}, {
    title : req.body.title,
    description : req.body.description,
    features : req.body.features,
    price : req.body.price,
    category : req.body.category,
    quantity : req.body.quantity,
    images: newImages,
    featured : req.body.featured
  })
    .then(product => res.render('products', {
      title: 'Admin | Productos', 
      css: 'products',
      message: 'Producto actualizado correctamente'})) 
    .catch(err => console.log(err.message))
} 

// Show products by category for the User
const listProduct = (req, res) => {

  let category = req.params.category
  Product.find({ category: category })
    .then(data => res.json(data))
    .catch(err => res.json(err))

}

// Show a specific product for the User
const showDetailProduct = (req, res) => {

  let idProduct = req.params.id
  Product.findById(idProduct)
    .then(data => res.json(data))
    .catch(err => res.json(err))

  }

module.exports = {
  productsList,
  productsSave,
  productsDelete,
  productsFindById,
  imagesDelete,
  productsUpdate,
  listProduct,
  showDetailProduct
}
