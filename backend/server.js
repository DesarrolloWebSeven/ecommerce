require('dotenv').config()
const express = require('express')
const app = express()
const rtMain = require('./routers/rtMain')
const rtAdmin = require('./routers/rtAdmin')
//base de datos
const conexion = require('./connection')
conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

//configuracion del motor de plantillas handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//middlewares
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')    
    next()
})
//enrutadores
app.use('/',rtMain)
app.use('/admin',rtAdmin)

app.listen(process.env.PORT_SERVER,(err)=>{
    if(err) console.log("Errores: ", err)
    console.log(`Servidor backend arrancado en ${process.env.PORT_SERVER}`)
})