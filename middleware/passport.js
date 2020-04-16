if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const { isEmpty } = require('lodash');
const { User } = require('@models');
const { NotFoundError } = require('@errors');
const { USER_404 } = require('@utils/message.util');

async function authenticateUserByJwt(payload, done){
    User.findOne({ uid: payload.uid }).then((user, err) => {
        if(!isEmpty(user)) return done(null, user);
        if(isEmpty(user)) return done(new NotFoundError(USER_404));
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