const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('../models/User')

passport.use('local', 
    new LocalStrategy({ 
      usernameField: 'email',
    }, (email, password, done) => {
      User.findOne({ email: email })
      .then(user => {
        if(!user) done(null, false, { message: 'Usuario no encontrado'})
        if(user) {
          if(user.admin === false) done(null, false, { message: 'Usuario sin permisos'})
          const isValid = user.matchPassword(password)
          if(!isValid) done(null, false, { message: 'Contraseña no válida'})
          else done(null, user) 
        }
      })
      .catch(err => console.log(err))
    })
)

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

