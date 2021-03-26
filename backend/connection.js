const mongoose = require('mongoose')

<<<<<<< HEAD
mongoose.connect('mongodb://user4:equipo4*@3.10.117.25/equipo4', {
=======
let uri= `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(uri, {
>>>>>>> add-products
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports=mongoose.connection
