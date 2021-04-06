const User = require("../models/User");

const register = (req, res) => {
  let user = new User(req.body)
  user.save()
    .then(user => res.json(user))
    .catch(err => res.json(err))
}

module.exports = {
  register,
}
