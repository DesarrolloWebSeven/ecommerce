require('dotenv').config()
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

//base de datos
const conexion = require('./connection')
conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

//configuracion del motor de plantillas handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//middleware multer y configuracion
const storage = multer.diskStorage({//Ponemos el nombre a la imagen puede ser file.originalname
    destination: path.join(__dirname, '/public/images'),
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

app.use(multer({
    storage:storage,//nombre
    limits: {fieldSize:10000000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|gif|svg|/ //creo una expresion regular para definir que tipos de archivo quiero recibir.
        const mimetype = fileTypes.test(file.mimetype)//con esta linea lo que hago es verificar que el mimetype, que es una propiedad propia del archivo si concuerda: el original del archivo si concuerda con alguno de los establecidos en fileTypes
        const extname = fileTypes.test(path.extname(file.originalname))//extraigo la extension del archivo con el metodo extname del path.
        if (mimetype && extname){
            return cb(null, true)
        }
        cb ("Error: No es un tipo de imagen valida")
    }
}).array('images'))

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
app.use('/', require('./routers/rtMain'))
app.use('/admin', require('./routers/rtAdmin'))
app.use('/usuario', require('./routers/rtUser'))

// Error handler
app.use((req, res) => res.status(400).render('notfound'))

// Server running
app.listen(process.env.PORT_SERVER,(err)=>{
    if(err) console.log("Errores: ", err)
    console.log(`Servidor backend arrancado en ${process.env.PORT_SERVER}`)
})