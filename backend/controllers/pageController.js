const Page = require('../models/Page')

// Search content to update pages
const pageUpdate = (req, res) => {
  req.body.title = req.params.title
  Page.find({ title: req.body.title }).lean()
    .then(data => {
      updateContent(data)
        .then(page => {
          console.log(page)
          res.render('project', ({ title: "Admin | Proyecto", css: 'project', src:'staticPages.js' }))
        })
        .finally(console.log("Promesa en espera"))
        .catch(err => console.log('resolvió con: ' + err.message))
    })
    .catch(err => res.json(err))
}

// Search and update the content
const updateContent = (data) => {
  return new Promise((resolved, reject)=>{
    Page.findByIdAndUpdate({_id : data[0]._id}, {
      title : data[0].title,
      content : data[0].content,
      images : data[0].images,
    }).lean()
    .then(data=>{ resolved(data) })
    .catch(error=>reject(error)) })
}

// Show content in the Front End
const pageList = (req, res) => {
  let page = req.params.title
  Page.find({ title: page })
    .then(data => res.json(data))
    .catch(err => res.json(err))

}

module.exports= {
  pageList,
  pageUpdate
}