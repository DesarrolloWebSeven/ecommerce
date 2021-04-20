const Page = require('../models/Page')
const fs = require('fs').promises
const path = require('path')

const pageSave = (req,res)=>{
    console.log(req.body)
    console.log(req.route.path)
    // let images=[]
    // req.files.forEach(i=>images.push('/images/'+i.filename))
    // req.body.images = images
    let title = req.route.path.substr(1,req.route.path.length)
    console.log(title)
    req.body.title=title
    let page = new Page(req.body)
    page.save()
        .then(data=>{
            console.log("Contenido guardado con exito: " + data)
            res.json(data)
        })
        .catch(err=>console.log(err))
}

const pageList = (req,res)=>{
    console.log("peticion recibida: ", req.params.title)
    let page = req.params.title
    Page.find({title:page})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
}

module.exports={
    pageSave,
    pageList
}