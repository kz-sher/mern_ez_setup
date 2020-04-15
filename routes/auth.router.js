const express = require('express');
const router = express.Router();
const AuthController = require('@controllers/auth.controller')
// const { handlePassportError } = require('@utils/error.util');
// const { PassportJWT } = require('../middleware/passport');
const {
    RegisterValidator,
    LoginValidator,
    RefreshTokenValidator,
    ForgotPwdValidator,
    ResetPwdValidator,
} = require('@middleware/validation/validators');

router.post('/register', RegisterValidator, AuthController.register);
router.post('/email_confirmation/:uid/:token', AuthController.confirmEmail);
router.post('/login', LoginValidator, AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/token', RefreshTokenValidator, AuthController.renewToken);
router.post('/forgotpwd', ForgotPwdValidator, AuthController.forgotPassword);
router.post('/resetpwd/:uid/:token', ResetPwdValidator, AuthController.resetPassword);

module.exports = router;