const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images'),
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = {
    storage,
    dest: path.join(__dirname, '../../public/images'),
    limits: {fieldSize:10000000},
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|gif|svg|/ 
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if (mimetype && extname){
            return cb(null, true)
        }
        cb ("Error: No es un tipo de imagen valida")
    }
}

module.exports = upload


