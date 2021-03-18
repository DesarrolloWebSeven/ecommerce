const mongoose = require('mongoose')
const {Schema} = mongoose

const schemaUser = new Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String, required:true},
    password:{type:String, required:true},
    active:{type:Boolean, default:false},
    provider:{type:String},
    admin:{type:Boolean, default:false},
    phone:{type:Number},
    avatar:{type:String, default:null}

})

class User{
    //constructor
    //get y set
    //private
}

schemaUser.loadClass(User)
module.exports= mongoose.model('user', schemaUser)