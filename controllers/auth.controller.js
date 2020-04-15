if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const async = require('async');
const moment = require('moment');
const { isEmpty } = require('lodash');
const { User } = require('@models');
const { 
    BadReqError, 
    UnAuthError, 
    ForbiddenError,
    EmailError, 
} = require('@errors');
const Mailer = require('@services/email/email.service');
const { 
    generateAccessToken, 
    generateRefreshToken, 
    generateUniqUserToken, 
    generateUUTSecret 
} = require('@services/token.service');
const { 
    SIGNUP_SUCC,
    EMAIL_CONF_SUCC,
    FORGOTPWD_SUCC,
    RESETPWD_SUCC,
    SIGNUP_EMAIL_ERR,
    FORGOTPWD_EMAIL_ERR,
    EMAIL_MUST_CONF,
    INV_CRE,
} = require('@utils/message.util');

/**
 * Flow: Registration
 * 1. Add new user
 * 2. Send email to notify user about successful registration
 * Any condition above that is not met will be responded with error message
 */
const register = function (req, res, next) {
    async.waterfall([
        function(done){
            const user = new User(req.body)
            user.save(err => {
                done(err, user);
            });
        },
        function(user, done){
            const token = generateUniqUserToken({
                onetimekey: user.is_email_confirmed,
                payload: {
                    uid: user.uid,
                    type: 'email_confirmation',
                },
                timestamp: user.created_at,
                tokenLifetime: process.env.EMAIL_CONFIRMATION_TOKEN_LIFETIME,
            });
            Mailer.send.registerMail({ host: req.headers.host, user, token }, function(err, result){
                if(err){
                    err = new EmailError(SIGNUP_EMAIL_ERR);
                }
                done(err);
            });
        }
    ], function(err){
        if(err){
            return next(err);
        }
        res.status(201).json({ msg: SIGNUP_SUCC });
    });
}

/**
 * Flow: Email Confirmation
 * 1. Find user by id
 * 2. Verify whether the token is valid based on current user data
 * 3. Check if user's email has already been confirmed
 * 4. Update user's email confirmation status
 * Any condition above that is not met will be responded with error message
 */
const confirmEmail = (req, res, next) => {
    const { uid, token } = req.params;

    async.waterfall([
        function(done) {
            User.findOne({ uid }, (err, user) => {
                if(isEmpty(user)){ // Check if user exists
                    return done(new BadReqError());
                }
                done(err, user);
            });
        },
        function(user, done){
            const secret = generateUUTSecret(user.is_email_confirmed, user.created_at);
            jwt.verify(token, secret, (err, decoded) => {
                done(err, { decoded, user });
            });
        },
        function({ decoded, user }, done){
            if(decoded.uid === user.uid && decoded.type === 'email_confirmation'){ // Check if ids r same as well as type
                user.is_email_confirmed = true;
                user.save(err => done(err, 'email_confirmed'));
            }
            else{
                done(new BadReqError()); // Invalid request;
            }
        }
      ], function(err) {
        if(err){
            return next(err);
        }
        res.status(200).json({ msg: EMAIL_CONF_SUCC });
      });
}

/**
 * Flow: Login
 * 1. Check if password given & hashed one in DB are the same
 * 2. Check if email is confirmed
 * 3. Generate access & refresh token
 * 4. Send refresh token in cookie & access token in response
 * Any condition above that is not met will be responded with error message
 * #IMPORTANT: 
 * - Set cookie as httpOnly (prevent XSS) and secure (HTTPS required)
 * - Do not store access token in frontent except memory
 * - Short lifetime for access token, longer lifetime for refresh token
 * - 2048 max byte size for access token, 1024 max byte size for refresh token
 */
const login = (req, res, next) => {
    const user = req.user

    async.waterfall([
        function(done){
            user.comparePassword(req.body.password, (err, isMatch) => {
                // If passwords not matched
                if (!isMatch){
                    return done(new UnAuthError(INV_CRE));
                }
                done(err);
            }); 
        },
        function(done){

            if(!user.is_email_confirmed){ // Check if user confirms his/her email
                return done(new ForbiddenError(EMAIL_MUST_CONF));
            }

            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: user.uid });
            const { refreshToken, refreshTokenExpiry } = generateRefreshToken({ uid: user.uid })
            
            res.cookie('rf_tk', refreshToken, {
                expires: new Date(refreshTokenExpiry),
                secure: false, // set to true if https is used
                httpOnly: true,
            }).status(200).json({
                accessToken, 
                accessTokenExpiry
            });
            done(null, 'done');
        }
    ], function(err) {
        next(err);
    });
}

/**
 * Flow: Logout
 * Simply delete refresh token cookie by its key
 */
const logout = (req, res) => {
    res.clearCookie('rf_tk');
    res.sendStatus(200);
}

/**
 * Flow: Token Renewal
 * 1. Check if refresh token is valid
 * 2. Generate new access token set
 * Any condition above that is not met will be responded with error message
 */
const renewToken = (req, res, next) => {
    const refreshToken = req.cookies.rf_tk;

    async.waterfall([
        function(done){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                done(err, decoded);
            });
        },
        function(decoded, done){
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: decoded.uid });
            res.status(200).json({ accessToken, accessTokenExpiry });
            done(null, 'done');
        }
    ],function(err){
        next(err);
    });
};

/**
 * Flow: Forgotten Password
 * 1. Generate password reset token unique to user
 * 2. Send email to user with the link (prepended with user id and token)
 * 3. Save user password reset timestamp into DB for limiting request use
 * Any condition above that is not met will be responded with error message
 */
const forgotPassword = (req, res, next) => {
    const user = req.user;
    const token = generateUniqUserToken({
        onetimekey: user.password,
        payload:{
            uid: user.uid,
            type: 'password_reset',
        },
        timestamp: user.created_at,
        tokenLifetime: process.env.PASSWORD_RESET_TOKEN_LIFETIME,
    });

    async.waterfall([
        function(done){
            const lastOneHour = moment(Date.now()).subtract(1, 'hour').valueOf();
            const userPwdResetReqTs = user.pwd_reset_req_at;
            if( userPwdResetReqTs && userPwdResetReqTs > lastOneHour ){ // Limit password reset request
                done(null, false); // Send a false flag to skip next func
            }
            else{
                Mailer.send.forgottenPwdMail({ host: req.headers.host, user, token }, function(err, result){
                    if(err){
                        err = new EmailError(FORGOTPWD_EMAIL_ERR);
                    }
                    done(err, result); 
                });
            }
        },
        function(result, done){
            if(!result){
                return done(); // skip updating pwd_reset_req_at
            }
            user.pwd_reset_req_at = Date.now();
            user.save(err => done(err, 'done'));
        }
    ],function(err){
        if (err) {
            return next(err);
        }
        res.status(200).json({ msg: FORGOTPWD_SUCC });
    });
}

/**
 * Flow: Reset Password
 * 1. Find user by id
 * 2. Verify whether the token is valid based on current user data
 * 3. Update user with new password
 * Any condition above that is not met will be responded with error message
 */
const resetPassword = (req, res, next) => {
    const { uid, token } = req.params;
    const newPassword = req.body.password;

    async.waterfall([
        function(done) {
            User.findOne({ uid }, (err, user) => {
                if(isEmpty(user)){ // Check if user exists
                    return done(new BadReqError());
                }
                done(err, user);
            });
        },
        function(user, done){
            const secret = generateUUTSecret(user.password, user.created_at);
            jwt.verify(token, secret, (err, decoded) => {
                done(err, { decoded, user });
            });
        },
        function({ decoded, user }, done){
            if(decoded.uid === user.uid && decoded.type === 'password_reset'){ // Check if ids r same as well as type
                user.password = newPassword;
                user.save(err => done(err, 'done'));
            }
            else{
                done(new BadReqError());
            }
        }
      ], function(err) {
        if(err){
            return next(err);
        }
        res.status(200).json({ msg: RESETPWD_SUCC });
      });
}

module.exports = { 
    register,
    confirmEmail,
    login,
    logout,
    renewToken,
    forgotPassword,
    resetPassword, 
}