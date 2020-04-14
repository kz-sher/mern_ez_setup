const { capitalize } = require('@utils/general.util');
/**
 * Custom error message for validation
 * The asterisk * represent the given field 
 */

const MIN = number => `* need to be at least ${number} characters`;
const IS_IN = options => `* need to be either ${options.join(' or ')}`
const SHUD_MATCH_WITH = field => `${capitalize(field)} must match`

const message = {

    // Validation
    REQUIRED: '* is required',
    IS_STRING: '* has to be string',
    IS_ALPHA: '* can only contain alphabets',
    IS_ALPHA_NUM: '* can only contain alphabets and numbers',
    IS_ALPHA_SPACE: '* can only contain alphabets and spaces',
    IS_INT: '* has to be integer',
    INV_FORMAT: '* format is invalid',
    STRONG_PWD: '* must contain at least one uppercase letter, one lowercase letter and one number',
    UNIQUE: '* is already taken',
    EXISTS: '* not found',
    BLACK_TOKEN: 'Token is in blacklist',
    MIN,
    IS_IN,
    SHUD_MATCH_WITH,

    // Response
    SIGNUP_SUCC: { 
        header: 'Account Created Successfully', 
        content: 'Kindly confirm your email for verification'
    },
    EMAIL_CONF_SUCC: { 
        header: 'Email Confirmed Successfully'
    },
    FORGOTPWD_SUCC: { 
        header: 'Success', 
        content: 'Please check your email for further actions'
    },
    RESETPWD_SUCC: { 
        header: 'Password Changed Successfully', 
    },
    SIGNUP_EMAIL_ERR: {
        header: '[E001] Error Occured',
        content: 'Please contact our customer service for assistance'
    },
    FORGOTPWD_EMAIL_ERR: {
        header: '[E002] Error Occured',
        content: 'Please contact our customer service for assistance'
    },
    INV_CRE: 'Invalid Credentials',
    EMAIL_MUST_CONF: 'Email Confirmation Required'
}

module.exports = message;
