const { validationResult } = require('express-validator');
const { capitalize } = require('../../../utils/general.util');

/**
 * Format errors for response
 * @param {Object} errors 
 */
const formatted = errors => {
    const formattedErrors = {}
    errors.array({ onlyFirstError: true }).forEach(err => {
        var field = capitalize(err.param).replace('_', ' ');
        var msg = err.msg.replace('*', field);
        formattedErrors[err.param] = msg;
    })
    return formattedErrors;
}

/**
 * Standardized validation error response
 * Validator wrapper that map rules into middleware
 * @param {Array} validations - list of rules supported by express-validator
 */
const Validator = validations => async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    
    const formattedErrors = formatted(errors);    
    res.status(422).json({ errors: formattedErrors });
};

module.exports = { Validator }