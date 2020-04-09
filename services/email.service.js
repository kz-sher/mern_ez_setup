if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    },
    debug: true,
    logger: true
});

var ForgottenPwdMailOptions = ({ host, user, token }) => ({
    to: user.email,
    from: 'no-reply@mern_ez_setup.com',
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + host + '/resetpwd/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
});

var ResetPwdDoneMailOptions = ({ user }) => ({
    to: user.email,
    from: 'no-reply@mern_ez_setup.com',
    subject: 'Your password has been changed',
    text: 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
  });

  const send = {
        forgottenPwdMail: (optionData, cb) => {
            smtpTransport.sendMail(ForgottenPwdMailOptions(optionData), (error, info) => {
                cb(error, info);
            });
        },
        resetPwdDoneMail: (optionData, cb) => {
            smtpTransport.sendMail(ResetPwdDoneMailOptions(optionData), (error, info) => {
                cb(error, info);
            });
        }
}


module.exports = { send };
  

