const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({//Ponemos el nombre a la imagen puede ser file.originalname
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const loadImages = multer({
    storage:storage,//nombre
    dest: path.join(__dirname, '/public/uploads'),//ubicacion del archivo
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
}).array('foto')

module.exports = loadImages


