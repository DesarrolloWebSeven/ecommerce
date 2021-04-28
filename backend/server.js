require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const method = require('method-override')

// Database settings
const conexion = require('./database')
conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

// Template engine settings
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs({extname: '.hbs', 
  partialsDir: 'views/partials/',
  helpers: { json: function (context) { return JSON.stringify(context) }} 		
}));
app.set('view engine', '.hbs');

// Multer settings
const upload = require('./helpers/upload')
app.use(multer(upload).array('images'))

// Middlewares
app.use(cors())
app.use(cookieParser())
app.use(method('_method'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:true, limit: '50mb'}))

// Routes
app.use('/productos', require('./router/rtProduct'))
app.use('/admin', require('./router/rtAdmin'))
app.use('/usuario', require('./router/rtUser'))
app.use('/clientes', require('./router/rtClient'))

// Error handler
app.use((req, res) => res.status(400).render('notfound', { title: 'Admin | 404', css: '404'}))

// Server running
let port = process.env.PORT_SERVER || 3000
app.listen(port,(err)=>{
  if(err) console.log("Errores: ", err)
  console.log(`Servidor backend arrancado en ${port}`)
})