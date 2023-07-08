const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'michele87@ethereal.email',
      pass: 'TF8vuxFs1GASVQabfZ'
  }
});

module.exports = transporter;
