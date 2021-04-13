const Product = require('../models/Product')
const fs = require('fs/promises')
const path = require('path')

const home = (req, res) => {
    res.render("admin-home", ({
      title: "Ecommerce Admin | Home",
    }))
}

const login = (req,res)=>{
    res.render('admin', ({
      title: "Ecommerce Admin | Login"
    }))
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
        res.render('products', {product:product, src:'products_update.js'})
    })
}
const images_delete=(req,res)=>{
    console.log(req.body)
    let image = req.body.image    
    fs.unlink(path.join(__dirname, '/../public', image))
    .then(() => {console.log('File removed')})
    .catch(err => {console.error('Something wrong happened removing the file', err)})

}
const products_update = (req,res)=>{
    console.log(req.body)
    let images=[]
    req.files.forEach(i=>images.push('/images/'+i.filename))
    req.body.images = images
    Product.findByIdAndUpdate({_id : req.body._id},
        {title : req.body.title,
        description : req.body.description,
        features : req.body.features,
        price : req.body.price,
        category : req.body.category,
        quantity : req.body.quantity,
        images : req.body.images,
        featured : req.body.featured},
        function(err, result) {
            if (err) {res.send(err)} 
            else {res.send(result)}
        }
    )
    .then(product=>{
        console.log(product)
        //console.log(product_update)
        //res.json(product)
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
    home,
    login,
    team,
    project,
    products_index,
    products_save,
    products_list,
    products_delete,
    products_findById,
    images_delete,
    products_update,
    clients,
    orders,
}
