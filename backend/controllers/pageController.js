const Page = require('../models/Page')

// Search content to update pages
const pageUpdate = (req, res) => {
  req.body.title = req.params.title
  Page.find({ title: req.body.title }).lean()
    .then(data => updateContent(data))
    .catch(err => res.json(err))
}

// Search and update the content
const updateContent = (data) => {

  Page.findByIdAndUpdate({_id : data[0]._id}, {
    title : req.body.title,
    content : req.body.content,
    images : req.body.images,
  }).lean()
    .then(page => {
      console.log('Producto actualizado correctamente: ' + page)
      res.render('project', ({ title: "Admin | Proyecto", css: 'project', src:'staticPages.js'}))
    })
    .catch(err => console.log(err.message))

}

// Show content in the Front End
const pageList = (req, res) => {
  let page = req.params.title
  Page.find({ title: page })
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

module.exports={
  pageList,
  pageUpdate
}