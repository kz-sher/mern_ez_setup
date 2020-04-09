const debug = require('debug')('validate');
const Model = require('../../../models');
const { TokenBlackList } = Model;

/******************************
 * Custom validation function *
 *****************************/

/**
 * Check whether the value in current field matches with the one in given field
 * @param {String} field - targeted field in request body that need to be compared
 */
const isMatchWith = field => (value, { req }) => {
    const target = req.body[field];
    if(target && value !== target) {
        return false;
    }
    return true;
}

/**
 * Check whether the value in current field is unique against the one in DB
 * @param {String} table - the collection where the record will be stored
 * @param {String} column - the field where the record will be stored
 * @param {String} exceptValue - the value of the corresponding field that should be ignored
 * @param {String} idColumn - the field where the exceptValue should be ignored 
 */
const isUnique = ({ table, column, exceptValue, idColumn }) => (value, { req }) =>  {
    var exceptCondition = {}
    if(idColumn){
        if(exceptValue){
            exceptCondition = { [idColumn]:{ $ne: exceptValue} };
        }
        else if(req.body[idColumn]){
            debug(req.body[idColumn])
            exceptCondition = { [idColumn]:{ $ne: req.body[idColumn]} };
        }
        else{
            debug('[ Exception occured ]')
            throw Error();
        }
    }
    return Model[table].findOne({ [column]: value, ...exceptCondition }).then(result => {
        if (result) { // record found in DB = invalid
            return Promise.reject();
        }
        return Promise.resolve();
    });
}

const isExist = ({ table, column }) => (value, { req }) =>  {
    return Model[table].findOne({ [column]: value }).then(result => {
        if (!result) { // record not found in DB = invalid
            return Promise.reject();
        }
        
        const tablename = table.toLowerCase();
        req[tablename] = result; // save data as an attribute for handler
        return Promise.resolve();
    });
}

const isTokenBlacklisted = value => {
    return new Promise((resolve, reject) => {
                TokenBlackList.findTokenByAlgo(value, (notFound) => {
                    if(notFound){ // token not blacklisted
                        return reject();
                    }
                    else {
                        return resolve();
                    }
                })
            });
}

module.exports = { isMatchWith, isUnique, isExist, isTokenBlacklisted }