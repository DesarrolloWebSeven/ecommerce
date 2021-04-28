const User = require("../models/User");

const clientsList = (req, res)=>{
    User.find().then( data => {
      let clients = []
      data.forEach(item => {
        let client = {}
        client.email = item.email
        client.firstname = item.firstname
        client.lastname = item.lastname
        client.active = item.active
        client.admin = item.admin
        client.id = item.id
        clients.push(client)
      })
      res.render('clients', { title: 'Admin | Clientes', src: 'clients.js', css: 'products', clients})
      })        
  }

  const clientsFindById = (req, res) => {
    User.findById(req.params.id).lean()
        .then(client => {res.render('client', {client, title: 'Admin | Cliente', css: 'products'})})
        .catch(err => res.json(err.message))
        console.log(req.params.id)
  }

  const clientsUpdate = (req, res) => {
    User.findByIdAndUpdate({_id : req.body.id}, {
     firstname: req.body.firstname,
     lastname: req.body.lastname,
     email: req.body.email,
     active: req.body.active
    })
      .then(client => res.render(client, 'clients', {
        title: 'Admin | Clientes', 
        css: 'products',
        message: 'Cliente actualizado correctamente'})) 
      .catch(err => console.log(err.message))
  }

  module.exports={
      clientsList,
      clientsFindById,
      clientsUpdate,
  }