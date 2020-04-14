const { check } = require('express-validator');
const { Validator } = require('./Validator');
const { 
    PWD_POLICY_REGEX,
    ALPHA_SPACE_REGEX,
    GENDER_OPTIONS,
    isMatchWith, 
    isUnique 
} = require('@vhelpers/validate.helper');
const { 
    REQUIRED, 
    INV_FORMAT, 
    UNIQUE, 
    IS_STRING, 
    IS_ALPHA_NUM, 
    MIN,
    IS_ALPHA_SPACE,
    STRONG_PWD,
    SHUD_MATCH_WITH,
    IS_IN
} = require('@utils/message.util');

// Rule definition
const validations = [
    check('email')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isEmail().withMessage(INV_FORMAT)
        .bail()
        .custom(isUnique({ table: 'User', column: 'email' })).withMessage(UNIQUE),

    check('username')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .isAlphanumeric().withMessage(IS_ALPHA_NUM)
        .isLength({ min: 4 }).withMessage(MIN(4))
        .bail()
        .custom(isUnique({ table: 'User', column: 'username' })).withMessage(UNIQUE),

    check('firstname')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .matches(ALPHA_SPACE_REGEX).withMessage(IS_ALPHA_SPACE),

    check('lastname')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .matches(ALPHA_SPACE_REGEX).withMessage(IS_ALPHA_SPACE),

    check('password')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .matches(PWD_POLICY_REGEX).withMessage(STRONG_PWD)
        .isLength({ min: 6 }).withMessage(MIN(6)),

    check('password_confirmation')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .custom(isMatchWith('password')).withMessage(SHUD_MATCH_WITH('password')),

    check('country')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING),
    
    check('gender')
        .exists({ checkFalsy: true }).withMessage(REQUIRED)
        .isString().withMessage(IS_STRING)
        .isIn(GENDER_OPTIONS).withMessage(IS_IN(GENDER_OPTIONS)),
]

const RegisterValidator = Validator(validations);

module.exports = RegisterValidator;