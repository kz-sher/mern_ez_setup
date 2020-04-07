const validate = require('../utils/validate.helper');
const { RegisterRules } = require('../rules');

const checkRegister = (req, res, next) => {
    validate(req.body, RegisterRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                    status: 'error',
                    message: 'Register Validation Error',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { checkRegister }