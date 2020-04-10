if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { User } = require('../models');
const passport = require('passport');

async function authenticateUserByJwt(payload, done){
    User.findOne({ uid: payload.uid }).then((user, err) => {
        if(!isEmpty(user)) return done(null, user);
        if(isEmpty(user)) return done('404');
        if(err) return done(err);
    });
}

const initializePassport = passport => {

    // JWT strategy
    passport.use( new JwtStrategy({
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET
    }, authenticateUserByJwt) );
}

const PassportJWT = passport.authenticate('jwt', { session: false, failWithError: true });

module.exports = { initializePassport, PassportJWT };