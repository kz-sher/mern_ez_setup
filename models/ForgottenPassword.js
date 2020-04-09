const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment');
const Schema = mongoose.Schema;
const { isEmpty, isEqual } = require('lodash');
const { generateTokenID } = require('../services/token.service');

const ForgottenPasswordSchema = new Schema({
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
        default: () => moment().add(1, 'hour').valueOf()
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * A special find function used for efficiency reason (similar to the one in TokenBlackList)
 * 1. Look up by token_id generated using first and last predefined digits of token
 * 2. Check whether one of the tokens from the list found in Step 1 is equal to the given token
 * 3. Check if the matched token's expiry is still valid
 * In either phases, if it doesnt satisfy, the 2nd arg of callback `cb` wont be passed with anything
 */
ForgottenPasswordSchema.statics.findTokenByAlgo = function(token, cb){
    const ForgottenPassword = this;
    async.waterfall([
        function(done){
            ForgottenPassword.find({ token_id: generateTokenID(token)}, (err, records) => {
                if(isEmpty(records)){ // Token not found with token_id
                    return done(true);
                }
                done(err, records);
            });
        },
        function(records, done){
            for(var i = 0; i < records.length; i++ ){
                if(isEqual(records[i].token, token)){ // Check if token matches exactly
                    if(records[i].expiry > Date.now()){ // Check if token is expired
                        return cb(null, records[i]);
                    }
                    else {
                        break;
                    }
                }
            }
            done(null, false)
        }
    ], function(err){
        return cb(false);
    });
}


module.exports = mongoose.model('ForgottenPassword', ForgottenPasswordSchema);