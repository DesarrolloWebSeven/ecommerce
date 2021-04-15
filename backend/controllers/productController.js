const Product = require('../models/Product')


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
    listProduct,
    showDetailProduct
    
}
