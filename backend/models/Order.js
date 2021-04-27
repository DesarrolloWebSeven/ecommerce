const mongoose = require('mongoose')
const { Schema } = mongoose

const schemaOrder = new Schema({
    state: { type:String, required:true, default:"pendiente" },
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    address: { type:String, required:true },
    flat: { type:String, required:true },
    postalCode: { type:Number, required:true },
    city: { type:String, required:true },
    province: { type:String, required:true },
    country: { type:String, required:true },
    totalProducts: { type:Number, required:true },
    totalPrice: { type:Number, required:true },
    cart: { type:Object, required:true }
}, {
  timestamps: true
})

module.exports= mongoose.model('order', schemaOrder)