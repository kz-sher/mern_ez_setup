/**
 * Custom error message for validation
 * The asterisk * represent the given field 
 */

const min = number => `* need to be at least ${number} characters`;
const isIn = options => `* need to be either ${options.join(' or ')}`
const isMatch = field => `${field} must match`

const message = {
    required: '* is required',
    isString: '* has to be string',
    isAlpha: '* can only contain alphabets',
    isAlphaNum: '* can only contain alphabets and numbers',
    isAlphaSpace: '* can only contain alphabets and spaces',
    isInt: '* has to be integer',
    invalidFormat: '* format is invalid',
    passwordStrength: '* must contain at least one uppercase letter, one lowercase letter and one number',
    unique: '* is already taken',
    exists: '* not found',
    blackToken: 'Token is in blacklist',
    min,
    isIn,
    isMatch,
}

module.exports = { message };
