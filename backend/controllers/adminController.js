const User = require('../models/User')
const { createToken } = require('../helpers/validation')

const login = (req,res)=>{
    res.render('login')
}

const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) res.render('login', { userError: 'Usuario no encontrado'})
    else {
      if(!user.admin) res.render('login', { userError: 'Usuario sin permisos'})
      else {
        const isValid = user.matchPassword(password)
        if(!isValid) res.render('login', { passError: 'Contraseña no válida'})
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

const logout = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 1 })
  res.redirect('/admin/login')
}

const team = (req,res)=>{
    res.render('team', ({
      title: "Ecommerce Admin | Equipo", src:'staticPages.js'
    }))
}

const project = (req,res)=>{
    res.render('project', ({
      title: "Ecommerce Admin | Proyecto", src:'staticPages.js'
    }))
}

const clients = (req,res)=>{
    res.render('clients', ({
      title: "Ecommerce Admin | Clientes"
    }))
}

const orders = (req,res)=>{
    res.render('orders', ({
      title: "Ecommerce Admin | Pedidos"
    }))
}

module.exports = {
    login,
    signin,
    logout,
    team,
    project,    
    clients,
    orders,
}
