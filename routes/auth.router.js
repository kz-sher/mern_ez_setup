const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')
// const { handlePassportError } = require('../utils/error.helper');
// const { PassportJWT } = require('../middleware/passport');
const { RegisterValidator } = require('../middleware/validator');

router.post('/register', RegisterValidator, AuthController.register);
router.post('/login', AuthController.login);
router.post('/token', AuthController.renewToken);

module.exports = router;