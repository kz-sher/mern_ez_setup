const RegisterRules = require('./RegisterRules');
const ForgotPwdRules = require('./ForgotPwdRules');

// Rules format
// A function that takes one argument as input
// And return { title, rules }
module.exports = { RegisterRules, ForgotPwdRules }