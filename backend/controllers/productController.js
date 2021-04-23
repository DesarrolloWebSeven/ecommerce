const Product = require('../models/Product')
const fs = require('fs').promises
const path = require('path')

const productsList = (req, res)=>{
  Product.find().then( data => {
    let products = []
    data.forEach( item => {
      let product = {}
      product.title = item.title
      product.quantity = item.quantity
      product.image = item.images[0]
      product.id = item._id
      products.push(product)
    })
    res.render('products', { title: 'Admin | Productos', src: 'products.js', css: 'products', products})
    })        
}

const productsSave = (req, res) => {
  let images=[]
  req.files.forEach( i => images.push(i.filename))
  req.body.images = images
  let product = new Product(req.body)
  product.save()
    .then( data => res.render('products', {
      src:'products.js', 
      css: 'products', 
      title: 'Admin | Productos', 
      message:"Producto guardado correctamente"
    }))
    .catch( err => console.log(err))
}

const productsDelete = async (req,res)=>{
    console.log("vas a eliminar: ", req.params.id)
/*     Product.findById(req.params.id).lean()
        .then(product=>{
            product.images.forEach(image=>{
                fs.unlink(path.join(__dirname, '../../public', image))
                    .then(() => {console.log('Imagen Borrada con exito!')})
                    .catch(err => {console.error('A ocurrido un problema al intentar eliminar la imagen: ', err)})
            })
        })
    const product_delete = await Product.findByIdAndDelete(req.params.id)
    console.log("Se ha borrado: " + product_delete)
    res.render('products', {src:'products.js'}) */
}

const productsFindById = (req, res) => {
  Product.findById(req.params.id).lean()
    .then(product => {
      product.image1 = product.images[0]
      product.image2 = product.images[1]
      res.render('product', {product, title: 'Admin | Productos', src:'product.js', css: 'products'})})
    .catch(err => console.log(err.message))
}

const imagesDelete = (req, res) => {  
    fs.unlink(path.join(__dirname, '../../public/images/', req.params.img))
    .then(() => console.log('Imagen Borrada con exito!'))
    .catch(err => console.error(err.message))
}

const productsUpdate = (req, res) => {
  console.log(req.body.images)
  let newImages = req.body.images.split(',')
  newImages.forEach( image => {
    if (image === '') newImages.splice(newImages.indexOf(image), 1)
  }) 
  req.files.forEach(i => newImages.push(i.filename))
  console.log(newImages)
    
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
      src:'product.js',
      message: 'Producto actualizado correctamente'})) 
    .catch(err => console.log(err.message))
} 

const listProduct = (req, res) => {
    let productsCategory = req.params.category
    Product.find({ category: productsCategory })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

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
