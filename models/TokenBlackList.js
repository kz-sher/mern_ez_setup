const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment');
const Schema = mongoose.Schema;
const { isEmpty, isEqual } = require('lodash');
const { generateTokenID } = require('../services/token.service');

const TokenBlackListSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    token_id: {
        type: String,
        required: true,
        indexes: true,
        default: function(){
            return generateTokenID(this.token)
        }
    },
    expiry: {
        type: Number,
        default: moment().add(1, 'year').valueOf()
    }
});

/**
 * A special find function used for efficiency reason
 * 1. Look up by token_id generated using first and last predefined digits of token
 * 2. Check whether one of the tokens from the list found in Step 1 is equal to the given token
 * 3. Use callback `notFound` with false flag
 * In either phases, if it is not found, callback `notFound` will be flagged true
 * #IMPORTANT: 
 * - Why this may achieve better searching is due to the probabilistic theorem
 * - As tokens need to be long enough for security, it might also take more time for lookup
 * - So token_id is created and used for fast search, and due to the randomness of token generation,
 * - Taking portion of it as token_id will barely match another one in the database
 */
TokenBlackListSchema.statics.findTokenByAlgo = function(token, notFound){
    const TokenBlackList = this;
    async.waterfall([
        function(done){
            TokenBlackList.find({ token_id: generateTokenID(token)}, (err, records) => {
                if(isEmpty(records)){ // Token not found with token_id
                    return notFound(true);
                }
                done(err, records);
            });
        },
        function(records, done){
            for(var i = 0; i < records.length; i++ ){
                if(isEqual(records[i].token, token)){ // Check if token matches exactly
                    return done(null, records[i]);
                }
            }
            return notFound(true);
        }
    ], function(err){
        return notFound(false);
    });
}


module.exports = mongoose.model('TokenBlackList', TokenBlackListSchema);;