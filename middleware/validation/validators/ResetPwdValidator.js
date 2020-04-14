const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { PWD_POLICY_REGEX, isMatchWith } = require('@vhelpers/validate.helper');
const { 
    REQUIRED,  
    IS_STRING,
    STRONG_PWD,
    MIN,
    SHUD_MATCH_WITH
} = require('@utils/message.util');

// Rule definition
const validations = [
    check('password')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .matches(PWD_POLICY_REGEX).withMessage(STRONG_PWD)
        .isLength({ min: 6 }).withMessage(MIN(6)),

    check('password_confirmation')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .custom(isMatchWith('password')).withMessage(SHUD_MATCH_WITH('Password')),
]

const ResetPwdValidator = Validator(validations);

module.exports = ResetPwdValidator;