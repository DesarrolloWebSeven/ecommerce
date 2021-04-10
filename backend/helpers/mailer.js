const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars');
const path = require('path')

const mailer = {}

mailer.transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "aletha.rogahn10@ethereal.email", 
    pass: "R7zQVTfcBRRtQPnA17"
  },
  tls: {
    rejectUnauthorized: false
  }
});

mailer.transporter.use('compile', hbs({
  viewEngine: exphbs.create({
    partialsDir: 'partials/',
    defaultLayout: false
  }),
  viewPath: path.resolve(__dirname, '../views'),
  extName: '.hbs'
}))

mailer.send = (email, subject, text) => {

  mailer.transporter.sendMail({
      from: 'Geeky', 
      to: email, 
      subject: subject,
      template: text
    });
}

module.exports = mailer