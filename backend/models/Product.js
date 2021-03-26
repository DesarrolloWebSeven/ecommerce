const mongoose = require('mongoose')
const {Schema} = mongoose

const schemaProduct = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    features:{type:String, required:true},
    images:[{type:String, required:false}],
    price:{type:Number, required:true},
    quantity:{type:Number, default:0, required:true},
    // creation:{type:Date, default:new Date()},
    category:{type:String, required:true},
    rating:[{
        user_id:{type:Schema.Types.ObjectId, ref:'user'},
        stars:Number,
        review:String
    }],
    featured:{type:Boolean, default:false},

},{timestamps:true})

class Product{
    //constructor
    //get y set
    //private
}

schemaProduct.loadClass(Product)
module.exports= mongoose.model('product',schemaProduct)