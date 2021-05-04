const User = require("../models/User");

// Show the clients list
const clientsList = async (req, res) => {
    
  let clients = await User.find({ admin : false }).lean()
  res.render('clients', { title: 'Admin | Clientes', src: 'clients.js', css: 'products', clients })

}

// Show the client's specific details
const clientsFindById = (req, res) => {

  User.findById(req.params.id).lean()
    .then(client => res.render('client', { client, title: 'Admin | Cliente', css: 'products' }))
    .catch(err => res.json(err.message))

}

// Update the client's informtion
const clientsUpdate = (req, res) => {

  User.findByIdAndUpdate({_id : req.body.id}, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    active: req.body.active
  })
    .then(client => res.render('client', { 
        client, 
        title: 'Admin | Clientes',
        css: 'products',
        message: 'Cliente actualizado correctamente'}))
    .catch(err => console.log(err.message))

}

module.exports = {
  clientsList,
  clientsFindById,
  clientsUpdate,
}