const { cookie } = require('express-validator');
const { Validator } = require('./Validator');
const { BLACK_TOKEN } = require('@utils/message.util');
const { isTokenBlacklisted } = require('@vhelpers/validate.helper');

// Rule definition
const validations = [
    cookie('rf_tk')
        .exists({ checkFalsy: true })
        .bail()
        .not().custom(isTokenBlacklisted).withMessage(BLACK_TOKEN),
]

const RenewTokenValidator = Validator(validations);

module.exports = RenewTokenValidator;