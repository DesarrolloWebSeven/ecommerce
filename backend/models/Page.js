const mongoose = require('mongoose')
const { Schema } = mongoose

const schemaPage = new Schema({
  title: {
    type: String,
    required: [ true, "Debes agregar un nombre de producto"]    
    },
  content: {
    type: String,
    required: [true, "Agregar la descripción del producto es obligatorio"]
  }
}, { 
  timestamps: true 
})

module.exports= mongoose.model('page', schemaPage)