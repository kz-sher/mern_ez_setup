const { cookie } = require('express-validator');
const { Validator } = require('./Validator');
const { message } = require('../helpers/message.helper');
const { isTokenBlacklisted } = require('../helpers/validate.helper');

// Rule definition
const validations = [
    cookie('rf_tk')
        .exists({ checkFalsy: true })
        .bail()
        .not().custom(isTokenBlacklisted).withMessage(message.blackToken),
]

const RenewTokenValidator = Validator(validations);

module.exports = RenewTokenValidator;