const mongoose = require('mongoose')
const {Schema} = mongoose

const schemaProduct = new Schema({
    title:{
        type:String,
        required:[true,"Debes agregar un nombre de producto"]    
    },
    description:{
        type:String,
        required:[true,"Agregar la descripción del producto es obligatorio"]
    },
    features:{
        type:String,
        required:[true, "Este campo no puede estar vacío"]
    },
    images:{
        type: new Array,
        required:[true, "Debes agregar al menos una imagen del producto"] 
    },
    price:{
        type:Number,
        required:[true, "No puede haber un producto sin precio"]
    },
    quantity:{
        type:Number,
        default:0, 
        required:[true, "Unidades disponibles debe ser mayor a 0"]
    },
    category:{
        type:String,
        required:[true, "Elige la categoria de este producto"]
    },
    rating:[{
        user_id:{type:Schema.Types.ObjectId, ref:'user'},
        stars:Number,
        review:String
    }],
    featured:{
        type:Boolean, 
        default:false
    },

},{timestamps:true})

module.exports= mongoose.model('product',schemaProduct)