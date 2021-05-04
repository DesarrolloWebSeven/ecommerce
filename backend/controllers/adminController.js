const User = require('../models/User')
const { createToken } = require('../helpers/validation')

// Show the login page
const login = (req, res) => {

  res.render('login', {
    title: 'Admin | Login',
    css: 'login'
  })

} 

// Admin Sign In 
const signin = async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) res.render('login', { userError: 'Usuario no encontrado', title: 'Admin | Login',
    css: 'login'})
    else {
      if(!user.admin) res.render('login', { userError: 'Usuario sin permisos', title: 'Admin | Login',
      css: 'login'})
      else {
        const isValid = user.matchPassword(password)
        if(!isValid) res.render('login', { passError: 'Contraseña no válida', title: 'Admin | Login',
        css: 'login'})
        if(isValid) {
          const token = createToken(user._id)
          res.cookie('jwt', token, { httpOnly: true });
          res.status(201).redirect('/admin/productos'); 
        }
      }
    }
  } catch (err) {
    res.status(400).json(err)
  }

}

// Admin Log Out
const logout = (req, res) => {

  res.cookie('jwt', ' ', { maxAge: 1 })
  res.redirect('/admin')

}

// Show the project page
const project = (req, res) => {

  res.render('project', ({
    title: "Admin | Proyecto",
    css: 'project',
    src:'staticPages.js'
  }))

}

// Show the clients page
const clients = (req, res) => {

  res.render('clients', ({
    title: "Admin | Clientes",
    css: 'products',
    script: 'clients.js'
  }))

}

module.exports = {
  login,
  signin,
  logout,
  project,    
  clients
}
