const Product = require('../models/Product')

const login = (req,res)=>{
    res.render('admin')
}
const products_index = (req,res)=>{
    res.render('products', {src:'products.js'})
}
const products_save = (req,res)=>{
    //console.log(req.files)
    let images=[]
    req.files.forEach(i=>images.push('/images/'+i.filename))
    //console.log(images)
    req.body.images = images
    let product = new Product(req.body)
    product.save()
        .then(data=>{
            console.log(data)
            res.send("Ok")
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
        res.render('products', {product:product})
    })
}
const products_update = async (req,res)=>{
    console.log(req.body.id)
    console.log(req.body)
    Product.findById(req.params.id).lean()
    const product_update = await Product.findByIdAndUpdate()
    .then(product=>{
        console.log(product)
        res.render('products', {product:product})
    })
}


module.exports = {
    login,
    products_index,
    products_save,
    products_list,
    products_delete,
    products_findById,
    products_update
}
