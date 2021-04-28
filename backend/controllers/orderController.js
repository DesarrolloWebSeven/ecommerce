const Order = require('../models/Order')
const Product = require('../models/Product')
const mailer = require('../helpers/mailer')

// Show the orders page
const showOrders = async (req, res) => {

  const orders = await Order.find().lean()
  res.render('orders', ({
    orders,
    title: "Admin | Pedidos",
    css: 'orders',
    src: 'orders.js'
  }))

}

// Delete orders on the database
const deleteOrders = async (req, res) => {

  let id = req.params.id
  const order = await Order.deleteOne({ _id: id })
  res.json(order)

}

// Show an specific order
const showOrderDetail = async (req, res) => {

  let id = req.params.id
  const order = await Order.findById(id).lean()
  res.render('order', { 
    order,
    title: 'Admin | Pedido',
    css: 'orders',
    src: 'order.js'
  })

}

// Delete product from an order
const deleteProduct = async (req, res) => {

  let id = req.params.id
  let product = req.body.product
  const order = await Order.updateOne(
    { _id: id },
    { $unset: { cart: { product } }})
  console.log(order) 
  res.send(order)

}

// Save new order as pending
const saveOrder = async (req, res) => {
  let order = new Order({
    userId: req.body.userId,
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    tel: req.body.user.tel,
    address: req.body.user.address,
    flat: req.body.user.flat,
    postalCode:req.body.user.postalCode,
    city:req.body.user.city,
    province:req.body.user.province,
    country:req.body.user.country,
    totalProducts: req.body.totalProducts,
    totalPrice: (req.body.totalPrice).toFixed(2),
    cart: req.body.cart
  })
  let orderInfo = await order.save()
  res.send(orderInfo)
}

// Pay and confirm the order
const payment = (req, res) => {
  let id = req.body.orderId
  Order.updateOne({_id: id}, {$set: { state: 'confirmado'}})
    .then(async data => {
      let order = await Order.findById(id).lean()
      mailer.send(order.email, order, 'Pedido Geeky', 'orderEmail')
      updateProductQuantity(order.cart)
      res.json(order)
    })
    .catch(err => console.log(err.message))

}

// Update the products quantity on the database
const updateProductQuantity = (order) => {
  
  Object.values(order).forEach( item => {

    let id = item._id
    item.quantity = item.quantity - item.items
    Product.updateOne({_id: id}, {$set: { quantity: item.quantity}})
      .then(data => console.log(data))
      .catch(err => console.log(err.message))
      
  })

}

module.exports = {
  showOrders,
  deleteOrders,
  showOrderDetail,
  deleteProduct,
  saveOrder,
  payment
}