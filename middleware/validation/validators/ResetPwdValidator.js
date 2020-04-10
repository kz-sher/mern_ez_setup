const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { message } = require('@vhelpers/message.helper');
const { isMatchWith } = require('@vhelpers/validate.helper');
const PASSWORD_POLICY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Rule definition
const validations = [
    check('password')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(PASSWORD_POLICY_REGEX).withMessage(message.passwordStrength)
        .isLength({ min: 6 }).withMessage(message.min(6)),

    check('password_confirmation')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .custom(isMatchWith('password')).withMessage(message.isMatch('Password')),
]

const ResetPwdValidator = Validator(validations);

module.exports = ResetPwdValidator;