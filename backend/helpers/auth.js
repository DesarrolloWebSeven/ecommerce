const passport = require('passport')

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ msg: 'Usuario no autorizado'})
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin === true) next()
  else res.status(401).json({ msg: 'Admin no autorizado'})
}

module.exports.passLocal = 
  passport.authenticate('local', {
    successRedirect: '/admin/productos',
    failureRedirect: '/admin/login',
    failureFlash: true
  })

