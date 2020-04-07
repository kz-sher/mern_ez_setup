const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const TokenBlackListSchema = new Schema({
    token_id: {
        type: String,
        required: true,
        indexes: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiry_date: {
        type: Date,
        required: true,
    }
});

const generateTokenID = token => {
    return token.substring(0,2).concat(token.substring(token.length - 2, token.length));
}

TokenBlackListSchema.pre('save', function (next) {
    const { token } = this;
    // Concatenate the first and last 2 digits as indexes
    this.token_id = generateTokenID(token);
    next();
});

TokenBlackListSchema.pre('find', function(next) {
    this.findOne()
        .where({ token_id: generateTokenID(this.getQuery().token)})
        .exec((err, token) => {
            // Retrieval error
            if(err) next(err) 
            // token_id found
            if(token) next()
            // Token not found = valid
            const notFoundErr = new Error('Token not found');
            notFoundErr.status = 404; // Use this as condition
            next(notFoundErr);
        });
});


module.exports = mongoose.model('TokenBlackList', TokenBlackListSchema);