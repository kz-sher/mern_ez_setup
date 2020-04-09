const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { message } = require('../helpers/message.helper');
const { isMatchWith, isUnique } = require('../helpers/validate.helper');
const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const alphaSpaceRegex = /^[A-Za-z\s]+$/;
const genderOptions = ['Male', 'Female', 'Private'];

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
        .matches(alphaSpaceRegex).withMessage(message.isAlphaSpace),

    check('lastname')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(alphaSpaceRegex).withMessage(message.isAlphaSpace),

    check('password')
        .exists({ checkFalsy: true }).withMessage(message.required)
        .isString().withMessage(message.isString)
        .matches(passwordPolicyRegex).withMessage(message.passwordStrength)
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
        .isIn(genderOptions).withMessage(message.isIn(genderOptions)),
]

const RegisterValidator = Validator(validations);

module.exports = RegisterValidator;