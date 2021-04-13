require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()

// Database settings
const conexion = require('./connection')
conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

// Template engine settings
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Multer settings
const upload = require('./helpers/upload')
app.use(multer(upload).array('images'))

// Middlewares
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/', require('./routers/rtMain'))
app.use('/admin', require('./routers/rtAdmin'))
app.use('/usuario', require('./routers/rtUser'))

// Error handler
app.use((req, res) => res.status(400).render('notfound'))

// Server running
app.set('port', process.env.PORT_SERVER || 3000)
app.listen(app.get('port'),(err)=>{
  if(err) console.log("Errores: ", err)
  console.log("Servidor backend arrancado en", app.get('port'))
})