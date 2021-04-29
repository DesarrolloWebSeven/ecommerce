const User = require("../models/User");

const clientsList = async (req, res)=>{
    
  let clients = await User.find({ admin : false }).lean()
  res.render('clients', { title: 'Admin | Clientes', src: 'clients.js', css: 'products', clients})
      
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
    active: req.body.active })
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