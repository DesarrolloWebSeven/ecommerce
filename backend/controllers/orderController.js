const Order = require('../models/Order')
const Product = require('../models/Product')
const mailer = require('../helpers/mailer')

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
  saveOrder,
  payment
}