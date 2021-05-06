const User = require("../models/User");
const Order = require('../models/Order');

// Show the clients list
const clientsList = async (req, res) => {

  let clients = await User.find({ admin : false }).lean()
  let clients1= []
  clients.forEach(async client=>{
    let order=await Order.find({userId:client._id})
    if(order.length){client.orders=order}
    clients1.push(client)
  })
  console.log(clients1)
  res.render('clients', { title: 'Admin | Clientes', src: 'clients.js', css: 'products', clients})

}

// Show the client's specific details
const clientsFindById = (req, res) => {

  User.findById(req.params.id).lean()
    .then(client => res.render('client', { client, title: 'Admin | Cliente', css: 'products' }))
    .catch(err => res.json(err.message))

}

// Update the client's information
const clientsUpdate = async (req, res) => {

  const { id, firstname, lastname, email, active } = req.body

  await User.findByIdAndUpdate({_id : id}, { firstname, lastname, email, active })
  User.findById(id).lean()
    .then(client => res.render('client', { 
        client, 
        title: 'Admin | Clientes',
        css: 'products',
        message: 'Cliente actualizado correctamente'}))
    .catch(err => console.log(err.message))

}

// Show the client's confirmed orders
const clientConfirmedOrders = async (req, res) => {

  let id = req.params.id
  const orders = await Order.find({userId:id, state:"confirmado"}).lean()
  res.render('confirmedorders', { 
    orders,
    title: 'Admin | Pedidos confirmados',
    css: 'orders'
  })

}

// Show the client's orders history

const clientOrders = async (req, res) => {

  let id = req.params.id
  const orders = await Order.find({userId:id}).lean()

  res.render('clientorders', { 
    orders,
    title: 'Admin | Historial de pedidos',
    css: 'orders',
    src: 'clientOrders.js'
  })

}

module.exports = {
  clientsList,
  clientsFindById,
  clientsUpdate,
  clientOrders,
  clientConfirmedOrders
}