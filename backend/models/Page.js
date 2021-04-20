const mongoose = require('mongoose')
const {Schema} = mongoose

const schemaPage = new Schema({
    title:{
        type:String,
        required:[true,"Debes agregar un nombre de producto"]    
    },
    content:{
        type:String,
        required:[true,"Agregar la descripción del producto es obligatorio"]
    }
    // images:{
    //     type: new Array,
    //     required:[true, "Debes agregar al menos una imagen del producto"] 
    // },
    // rating:[{
    //     user_id:{type:Schema.Types.ObjectId, ref:'user'},
    //     stars:Number,
    //     review:String
    // }],
    // featured:{
    //     type:Boolean, 
    //     default:false
    // },

},{timestamps:true})

class Page{
    //constructor
    //get y set
    //private
}

schemaProduct.loadClass(Page)
module.exports= mongoose.model('page',schemaPage)