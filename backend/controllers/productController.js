const Product = require('../models/Product')
const fs = require('fs').promises
const path = require('path')

const productsIndex = (req,res)=>{
    res.render('products', {src:'products.js', css: 'styles'})
}

const productsSave = (req,res)=>{
    if(req.body.featured=="on") req.body.featured=true
    console.log(req.body)
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

const productsList = (req,res)=>{
        Product.find().then(data=>res.json(data))        
}

const productsDelete = async (req,res)=>{
    console.log("vas a eliminar: ", req.params.id)
    Product.findById(req.params.id).lean()
        .then(product=>{
            product.images.forEach(image=>{
                fs.unlink(path.join(__dirname, '../../public', image))
                    .then(() => {console.log('Imagen Borrada con exito!')})
                    .catch(err => {console.error('A ocurrido un problema al intentar eliminar la imagen: ', err)})
            })
        })
    const product_delete = await Product.findByIdAndDelete(req.params.id)
    console.log("Se ha borrado: " + product_delete)
    res.render('products', {src:'products.js'})
}

const productsFindById = (req,res)=>{
    console.log(req.params)
    Product.findById(req.params.id).lean()
    .then(product=>{
        res.render('products', {product:product, src:'products_update.js'})
    })
}

const imagesDelete = (req,res)=>{
    let image = req.body.image    
    fs.unlink(path.join(__dirname, '../../public', image))
    .then(() => {console.log('Imagen Borrada con exito!')})
    .catch(err => {console.error('A ocurrido un problema al intentar eliminar la imagen: ', err)})
}

const productsUpdate = (req,res)=>{
    if(req.body.featured==null) req.body.featured=false
    //Asociamos las rutas de imagen al producto
    let imagesOld = req.body.imagesOld.split(',')
    let imagesNew=[]
    req.files.forEach(i=>imagesNew.push('/images/'+i.filename))
    
    //Condiciona el almacenaje de la ruta dependiendo si se cargaron nuevas imagenes o se mantienen las imagenes anteriores
    if(imagesNew.length>0){req.body.images = imagesNew}
    else{req.body.images = imagesOld}
    
    Product.findByIdAndUpdate({_id : req.body.id},
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

const listProduct = (req,res)=>{
    let productsCategory=req.params.category
    Product.find({category: productsCategory})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
}

const showDetailProduct = (req,res) =>{
    let idProduct=req.params.id
    Product.findById(idProduct)
        .then(data=>{
            console.log(data)
            res.json(data)
            
        })
        .catch(err=>res.json(err))
}

module.exports = {
    productsIndex,
    productsSave,
    productsList,
    productsDelete,
    productsFindById,
    imagesDelete,
    productsUpdate,
    listProduct,
    showDetailProduct 
}
