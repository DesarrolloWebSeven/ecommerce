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
  const orderInfo = await Order.findById(id)
  if (Object.keys(orderInfo.cart).length !== 0) increaseProductQuantity(orderInfo.cart)
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

  let idOrder = req.params.id
  let product = req.body.product

  // Search for the order and update its info
  let order = await Order.findById(idOrder)
  order.totalProducts = order.totalProducts - order.cart[product].items
  order.totalPrice = order.totalPrice - order.cart[product].price
  
  // Update the product quantity available on the database
  let updateProductQuantity = await Product.findById(product)
  await Product.updateOne({ _id: product }, { 
    quantity : updateProductQuantity.quantity + order.cart[product].items})
  
  // Delete the product from the order and update the info
  delete order.cart[product]
  let newOrder = await Order.updateOne({ _id: idOrder }, { $set: {
    cart: order.cart, 
    totalProducts: order.totalProducts,
    totalPrice: order.totalPrice
  }});
  res.json('Success')

}

// Update the order information
const updateOrder = async (req, res) => {
  let id = req.params.id
  let orderUpdate = await Order.updateOne({_id: id}, {$set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    tel: req.body.tel,
    address: req.body.address,
    flat: req.body.flat,
    postalCode: req.body.postalCode,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
  }})
  let order = await Order.findById({_id: id}).lean()
  res.render('order', { 
    order,
    message: 'Pedido actualizado con éxito',
    title: 'Admin | Pedido',
    css: 'orders',
    src: 'order.js'
  })
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
      decreaseProductQuantity(order.cart)
      mailer.send(order.email, order, 'Pedido Geeky', 'orderEmail')
      res.json(order)
    })
    .catch(err => console.log(err.message))

}

// Decrease the products quantity after creating an order
const decreaseProductQuantity = (order) => {
  
  Object.values(order).forEach( async item => {

    let id = item._id
    let product = await Product.findById(id)
    product.quantity = product.quantity - item.items
    Product.updateOne({_id: id}, {$set: { quantity: product.quantity}})
      .then(data => console.log('Actualizado con éxito'))
      .catch(err => console.log(err.message))
      
  })

}

// Increase the products quantity after deleting an order
const increaseProductQuantity = async (order) => {

    let id = order._id
    let product = await Product.findById(id)
    Product.updateOne({_id: id}, {$set: { quantity: product.quantity + order.items}})
      .then(data => console.log(data))
      .catch(err => console.log(err.message))

}

module.exports = {
  showOrders,
  deleteOrders,
  showOrderDetail,
  deleteProduct,
  updateOrder,
  saveOrder,
  payment
}