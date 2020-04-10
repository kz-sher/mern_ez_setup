const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { message } = require('@vhelpers/message.helper');
const { isMatchWith, isUnique } = require('@vhelpers/validate.helper');
const PASSWORD_POLICY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const ALPHA_SPACE_REGEX = /^[A-Za-z\s]+$/;
const GENDER_OPTIONS = ['Male', 'Female', 'Private'];

// Rule definition
const validations = [
    check('email')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isEmail().withMessage(message.invalidFormat)
        .bail()
        .custom(isUnique({ table: 'User', column: 'email' })).withMessage(message.unique),

    check('username')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .isAlphanumeric().withMessage(message.isAlphaNum)
        .isLength({ min: 4 }).withMessage(message.min(4))
        .bail()
        .custom(isUnique({ table: 'User', column: 'username' })).withMessage(message.unique),

    check('firstname')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(ALPHA_SPACE_REGEX).withMessage(message.isAlphaSpace),

    check('lastname')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(ALPHA_SPACE_REGEX).withMessage(message.isAlphaSpace),

    check('password')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(PASSWORD_POLICY_REGEX).withMessage(message.passwordStrength)
        .isLength({ min: 6 }).withMessage(message.min(6)),

    check('password_confirmation')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .custom(isMatchWith('password')).withMessage(message.isMatch('Password')),

    check('country')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString),
    
    check('gender')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .isIn(GENDER_OPTIONS).withMessage(message.isIn(GENDER_OPTIONS)),
]

const RegisterValidator = Validator(validations);

module.exports = RegisterValidator;