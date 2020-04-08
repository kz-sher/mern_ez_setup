const Validator = require('validatorjs');
const { capitalize } = require('../utils/general.helper');
const Models = require('../models');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

/**
 * Custom rule: strict
 * Tighten password policy
*/
Validator.register('strict', value => passwordRegex.test(value),
    'The password must contain at least one uppercase letter, one lowercase letter and one number');

/**
 * Custom rule: exist
 * Incoming value must exist for the field in the database
 * e.g email: required|email|exist:User,email
 */
Validator.registerAsync('exist', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    //split table and column
    let attArr = attribute.split(",");
    
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;
    //define custom error message
    let uniqueErrorMsg = (["username", "email"].includes(column)) ? `${capitalize(column)} has already been taken `: `${capitalize(column)} already in use`
    let existErrorMsg = `${capitalize(column)} not found`
    //check if incoming value already exists in the database
    Models[table].exists({ [column]: value }, (err, result) => {
        if(err){
            passes(false, err); // retrieval error
            return;
        }
        if(result){
            passes(false, existErrorMsg); // return false if value not exists
            return;
        }
        passes();
    })    
});

module.exports =  Validator;