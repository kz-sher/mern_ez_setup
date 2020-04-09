if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    profile_img_url: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, function (err, hashedPassword) {
            if (err) return next(err);
            user.password = hashedPassword
            next()
        })
    } else {
        next()
    }
});

UserSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

UserSchema.statics.findByToken = function(token, cb) {
    const user = this;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decode) {
        user.findOne({ _id: decoded.uid }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.model('User', UserSchema);