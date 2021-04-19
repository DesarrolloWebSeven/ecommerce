require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
var cookieParser = require('cookie-parser')


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
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Express-session & connect-flash
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

// Passport settings
require('./helpers/passport')
app.use(passport.initialize())
app.use(passport.session())

// Global Variables
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  res.locals.user = req.user
  next()
}) 

// Routes
app.use('/productos', require('./routers/rtProduct'))
app.use('/admin', require('./routers/rtAdmin'))
app.use('/usuario', require('./routers/rtUser'))

// Error handler
app.use((req, res) => res.status(400).render('notfound'))

// Server running
let port = process.env.PORT_SERVER || 3000
app.listen(port,(err)=>{
  if(err) console.log("Errores: ", err)
  console.log(`Servidor backend arrancado en ${port}`)
})