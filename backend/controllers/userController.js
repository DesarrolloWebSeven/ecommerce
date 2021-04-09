const User = require("../models/User");
const mailer = require("../helpers/mailer");

const register = (req, res) => {
  let user = new User(req.body)
  user.save()
    .then(user => {
      res.json(user)
      mailer.send(user)
    })
    .catch(err => res.json(err))
}

const confirmation = (req, res) => {
  User.updateOne({_id: req.params.id}, {$set: {active: true}})
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports = {
  register,
  confirmation
}
