const Product = require('../models/Product')

const login = (req,res)=>{
    res.render('admin')
}

const products_index = (req,res)=>{
    res.render('products', {src:'products.js'})
}

const products_save = (req,res)=>{
    console.log(req.files)
    let images=[]
    req.files.forEach(i=>images.push('/images/'+i.filename))
    console.log(images)
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


module.exports = {
    login,
    products_index,
    products_save,
    products_list
}








