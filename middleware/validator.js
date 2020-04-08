const Validator = require('../validation');
const { RegisterRules, ForgotPwdRules } = require('../validation/rules');

/**
 * Auxiliary function for validation
 * @param {Object} data - user input
 * @param {Object} rules - 
 * @param {Object} customMsgs 
 * @param {Func} callback 
 */
const validate = (data, rules, customMsgs, callback) => {
    const validation = new Validator(data, rules, customMsgs);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const validateWith = (ruleFunc, customMsgs={}) => (req, res, next) => {
    const data = req.body;
    const { title, rules } = ruleFunc(data);
    validate(data, rules, customMsgs, (err, status) => {
        if (!status) 
        return res.status(412).json({ message: `${title} Validation Error`, data: err });
        next();
    });
};

const RegisterValidator = validateWith(RegisterRules);
const ForgotPwdValidator = validateWith(ForgotPwdRules);

module.exports = { RegisterValidator, ForgotPwdValidator }