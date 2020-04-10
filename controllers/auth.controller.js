if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const async = require('async');
const moment = require('moment');
const { ErrorWithCode } = require('../utils/error.util');
const { generateAccessToken, generateRefreshToken, generateUniqUserToken } = require('../services/token.service');
const Mailer = require('../services/email.service');
const { User } = require('../models');

/**
 * Flow: Registration
 * 1. Add new user
 * 2. Send email to notify user about successful registration
 * Any condition above that is not met will be responded with error message
 */
const register = function (req, res) {
    async.waterfall([
        function(done){
            const user = new User(req.body)
            user.save(err => {
                done(err, user);
            });
        },
        function(user, done){
            res.status(200).json({ message: "Account created successfully" });

            const token = generateUniqUserToken({
                uid: user.uid,
                password: user.password,
                timestamp: user.created_at,
                type: 'email_confirmation',
                tokenLifetime: process.env.EMAIL_CONFIRMATION_TOKEN_LIFETIME,
            });
            Mailer.send.registerMail({ host: req.headers.host, user, token }, function(err, result){
                done(err, result); 
            });
        }
    ], function(err){
        if(err){
            return res.status(400).json({ errors: err });
        }
    });
}

/**
 * Flow: Email Confirmation
 * 1. Find user by id
 * 2. Verify whether the token is valid based on current user data
 * 3. Update user's email confirmation status
 * Any condition above that is not met will be responded with error message
 */
const confirmEmail = (req, res) => {
    const { uid, token } = req.params;
    
    async.waterfall([
        function(done) {
            User.findOne({ uid }, (err, user) => {
                done(err, user);
            });
        },
        function(user, done){
            const secret = user.password + "-" + user.created_at;
            jwt.verify(token, secret, (err, decoded) => {
                done(err, { decoded, user });
            });
        },
        function({ decoded, user }, done){
            if(decoded.uid === user.uid && decoded.type === "email_confirmation"){ // Check if ids r same as well as type
                user.is_email_confirmed = true;
                user.save(err => done(err, user));
            }
            else{
                done(true); // Invalid request;
            }
        }
      ], function(err) {
        if(err){
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
      });
}

/**
 * Flow: Login
 * 1. Check if email is confirmed
 * 2. Check if password given & hashed one in DB are the same
 * 3. Generate access & refresh token
 * 4. Send refresh token in cookie & access token in response
 * Any condition above that is not met will be responded with error message
 * #IMPORTANT: 
 * - Set cookie as httpOnly (prevent XSS) and secure (HTTPS required)
 * - Do not store access token in frontent except memory
 * - Short lifetime for access token, longer lifetime for refresh token
 * - 2048 max byte size for access token, 1024 max byte size for refresh token
 */
const login = (req, res) => {
    const user = req.user
    if(!user.is_email_confirmed){
        return res.status(401).json({ errors: 'Please confirm your email' });
    }

    async.waterfall([
        function(done){
            user.comparePassword(req.body.password, (err, isMatch) => {
                // If passwords not matched
                if (!isMatch){
                    done(ErrorWithCode("Invalid credentials", 401));
                    return;
                }
                done(err);
            }); 
        },
        function(done){
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: user.uid });
            const { refreshToken, refreshTokenExpiry } = generateRefreshToken({ uid: user.uid })
            
            res.cookie("rf_tk", refreshToken, {
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
        if(err){
            const errorCode = err.status ? err.status : 400;
            return res.status(errorCode).json({ errors: err.msg });
        }
    });
}

/**
 * Flow: Token Renewal
 * 1. Check if refresh token is valid
 * 2. Generate new access token set
 * Any condition above that is not met will be responded with error message
 */
const renewToken = (req, res) => {
    const refreshToken = req.cookies.rf_tk;

    async.waterfall([
        function(done){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                done(err, decoded);
            });
        },
        function(decoded, done){
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: decoded.uid });
            res.status(200).json({ accessToken, accessTokenExpiry, refresh: true });
            done(null, 'done');
        }
    ],function(err){
        if(err){
            return res.sendStatus(400);
        } 
    });
};

/**
 * Flow: Forgotten Password
 * 1. Generate password reset token unique to user
 * 2. Send email to user with the link (prepended with user id and token)
 * 3. Save user password reset timestamp into DB for limiting request use
 * Any condition above that is not met will be responded with error message
 */
const forgotPassword = (req, res) => {
    const user = req.user;
    const token = generateUniqUserToken({
        uid: user.uid,
        password: user.password,
        timestamp: user.created_at,
        type: 'password_reset',
        tokenLifetime: process.env.PASSWORD_RESET_TOKEN_LIFETIME,
    });

    async.waterfall([
        function(done){
            const lastOneHour = moment(Date.now()).subtract(1, 'hour');
            const userPwdResetReqTs = user.pwd_reset_req_at;
            if( userPwdResetReqTs && userPwdResetReqTs > lastOneHour ){ // Limit password reset request
                done(null, 'done');
            }
            else{
                Mailer.send.forgottenPwdMail({ host: req.headers.host, user, token }, function(err, result){
                    done(err, result); 
                });
            }
        },
        function(_, done){
            user.pwd_reset_req_at = Date.now();
            user.save(err => done(err, 'done'));
        }
    ],function(err){
        if (err) {
            return res.status(400).json({ errors: err })
        }
        return res.sendStatus(200);
    });
}

/**
 * Flow: Reset Password
 * 1. Find user by id
 * 2. Verify whether the token is valid based on current user data
 * 3. Update user with new password
 * Any condition above that is not met will be responded with error message
 */
const resetPassword = (req, res) => {
    const { uid, token } = req.params;
    const newPassword = req.body.password;

    async.waterfall([
        function(done) {
            User.findOne({ uid }, (err, user) => {
                done(err, user);
            });
        },
        function(user, done){
            const secret = user.password + "-" + user.created_at;
            jwt.verify(token, secret, (err, decoded) => {
                done(err, { decoded, user });
            });
        },
        function({ decoded, user }, done){
            if(decoded.uid === user.uid && decoded.type === "password_reset"){ // Check if ids r same as well as type
                user.password = newPassword;
                user.save(err => done(err, user));
            }
            else{
                done(true); // Invalid request;
            }
        }
      ], function(err) {
        if(err){
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
      });
}

module.exports = { 
    register, 
    confirmEmail,
    login, 
    renewToken, 
    forgotPassword, 
    resetPassword 
}