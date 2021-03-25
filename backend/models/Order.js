const mongoose = required('mongoose')
const {Schema} = mongoose

const schemaOrder = new Schema({
    creation:{type:Date, default:new Date()},
    state:{type:String, required:true, default:"recibido"},
    user:{type:Schema.Types.ObjectId, ref:'user'},
    street:{type:String, required:true},
    location:{type:String, required:true},
    postalcode:{type:Number, required:true},
    city:{type:String, required:true},
    total:{type:Number, required:true},
    total_products:{type:Number, required:true},
    products:{type:Schema.Types.ObjectId, ref:'product'}
})

class Order{
    //constructor
    //get y set
    //private
}

schemaOrder.loadClass(Order)
module.exports= mongoose.model('order', schemaOrder)