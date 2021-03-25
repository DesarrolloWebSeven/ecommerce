const mongoose = require('mongoose')

mongoose.connect('mongodb://user4:equipo4*@3.10.117.25/equipo4', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports=mongoose.connection

/**
URI: mongodb://user4:passTM01@3.10.117.25/equipo4
CONSOLE: mongo -u user4 -p --host 3.10.117.25:27017 equipo4
newPass:1234 */