const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')
// const { handlePassportError } = require('../utils/error.helper');
// const { PassportJWT } = require('../middleware/passport');
const {
    RegisterValidator,
    LoginValidator,
    RefreshTokenValidator,
    ForgotPwdValidator,
    ResetPwdValidator,
} = require('../middleware/validation/validators');

router.post('/register', RegisterValidator, AuthController.register);
router.post('/login', LoginValidator, AuthController.login);
router.post('/token', RefreshTokenValidator, AuthController.renewToken);
router.post('/forgotpwd', ForgotPwdValidator, AuthController.forgotPassword);
router.get('/resetpwd/:token', AuthController.verifyResetToken);
router.post('/resetpwd/:token', ResetPwdValidator, AuthController.resetPassword);

module.exports = router;