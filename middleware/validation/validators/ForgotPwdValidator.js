const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { message } = require('@vhelpers/message.helper');
const { isExist } = require('@vhelpers/validate.helper');

// Rule definition
const validations = [
    check('email')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .bail()
        .isEmail().withMessage(message.invalidFormat)
        .bail()
        .custom(isExist({ table: 'User', column: 'email' })).withMessage(message.exists),
]

const ForgotPwdValidator = Validator(validations);

module.exports = ForgotPwdValidator;