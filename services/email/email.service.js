if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    // tls: true,
    // ssl: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    },
    debug: true,
    logger: true
});

var RegisterMailOptions = ({ host, user, token }) => ({
    to: user.email,
    from: 'no-reply@mern_ez_setup.com',
    subject: 'Email Confirmation',
    text: `Hello, ${user.getFullname()}\n\n` + 
        'Congratulation! You have successfully registerd on Mern Ez Setup\n\n' +
        'In order to initialize your account, please click on the following link to show us this is your email:\n\n' +
        `http://${host}/email_confirmation/${user.uid}/${token}\n\n` +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
});

var ForgottenPwdMailOptions = ({ host, user, token }) => ({
    to: user.email,
    from: 'no-reply@mern_ez_setup.com',
    subject: 'Node.js Password Reset',
    text: `Hello, ${user.getFullname()}\n\n` + 
        'You are receiving this because you have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        `http://${host}/resetpwd/${user.uid}/${token}\n\n` +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
});

const send = {
    registerMail: (optionData, cb) => {
        smtpTransport.sendMail(RegisterMailOptions(optionData), (error, info) => {
            cb(error, info);
        });
    },
    forgottenPwdMail: (optionData, cb) => {
        smtpTransport.sendMail(ForgottenPwdMailOptions(optionData), (error, info) => {
            cb(error, info);
        });
    },
}


module.exports = { send };
  

