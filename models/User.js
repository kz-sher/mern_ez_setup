if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uid: {
        type: Number,
        index: true,
        unique: true
    },
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
        enum: ['user', 'admin'],
        default: 'user',
    },
    is_email_confirmed: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
    },
    pwd_reset_req_at: {
        type: Number,
    },
    deleted_at: {
        type: Number,
    }
});

// initialize auto increment plugin based on connection
autoIncrement.initialize(mongoose.connection); 
UserSchema.plugin(autoIncrement.plugin, { 
   model: 'User', 
   field: 'uid',
   startAt: 1
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

UserSchema.methods.getFullname = function(){
    return `${this.firstname} ${this.lastname}`;
}

UserSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    });
}

UserSchema.statics.findByToken = function(token, cb) {
    const user = this;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decode) {
        user.findOne({ uid: decoded.uid }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.model('User', UserSchema);