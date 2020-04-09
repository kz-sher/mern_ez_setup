const RegisterValidator = require('./RegisterValidator');
const LoginValidator = require('./LoginValidator');
const RefreshTokenValidator = require('./RefreshTokenValidator');
const ForgotPwdValidator = require('./ForgotPwdValidator');
const ResetPwdValidator = require('./ResetPwdValidator');

module.exports = {
    RegisterValidator,
    LoginValidator,
    RefreshTokenValidator,
    ForgotPwdValidator,
    ResetPwdValidator,
}