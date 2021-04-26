const Page = require('../models/Page')

// Search content to update pages
const pageUpdate = (req, res) => {
  req.body.title = req.params.title
  Page.find({ title: req.body.title }).lean()
    .then(data => updateContent(data))
    .catch(err => res.json(err))

// Search and update the content
const updateContent = (data) => {
  console.log("Esto fue lo que encontro: ", data[0]._id)
  Page.findByIdAndUpdate({_id : data[0]._id}, {
    title : req.body.title,
    content : req.body.content,
    images : req.body.images,
  }, (err, result) => {
                if (err) console.log('No se pudo actualizar: ' + err) 
                else console.log('Se actualizo: ' + result)
            }
        ).lean()
        .then(page=>{
            console.log('Producto actualizado correctamente: ' + page)
            res.render('team', {src:'staticPages.js'})
        })
    }
}

const pageList = (req, res) => {
  console.log("peticion recibida: ", req.params.title)
  let page = req.params.title
  Page.find({ title: page })
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

module.exports={
  pageList,
  pageUpdate
}