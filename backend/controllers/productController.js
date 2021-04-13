const Product = require('../models/Product')


const listProduct = (req,res)=>{
    let productsCategory=req.params.category
    Product.find({category: productsCategory})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
}





module.exports = {
    listProduct
    
}
