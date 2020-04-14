const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { isExist } = require('@vhelpers/validate.helper');
const { REQUIRED, INV_FORMAT, EXISTS } = require('@utils/message.util');

// Rule definition
const validations = [
    check('email')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .bail()
        .isEmail().withMessage(INV_FORMAT)
        .bail()
        .custom(isExist({ table: 'User', column: 'email' })).withMessage(EXISTS),

    check('password')
        .exists({ checkFalsy: true }).withMessage(REQUIRED),
]

const LoginValidator = Validator(validations);

module.exports = LoginValidator;