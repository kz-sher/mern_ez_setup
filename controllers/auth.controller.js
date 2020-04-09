if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const async = require('async');
const crypto = require('crypto');
const { ErrorWithCode } = require('../utils/error.util');
const { generateAccessToken, generateRefreshToken } = require('../services/token.service');
const Mailer = require('../services/email.service');
const { User, ForgottenPassword } = require('../models');

/**
 * Flow: Registration
 * 1. Add new user
 * 2. Send email to notify user about successful registration
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
            /* Send email */
            done(null, 'done');
        }
    ], function(err){
        if(err){
            return res.status(400).json({ errors: err });
        }
    });
}

/**
 * Flow: Login
 * 1. Check if password given & hashed one in DB are the same
 * 2. Generate access & refresh token
 * 3. Send refresh token in cookie & access token in response
 * Any condition above that is not met will be responded with error message
 * #IMPORTANT: 
 * - Set cookie as httpOnly (prevent XSS) and secure (HTTPS required)
 * - Do not store access token in frontent except memory
 * - Short lifetime for access token, longer lifetime for refresh token
 * - 2048 max byte size for access token, 1024 max byte size for refresh token
 */
const login = (req, res) => {
    const user = req.user

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
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: user._id });
            const { refreshToken, refreshTokenExpiry } = generateRefreshToken({ uid: user._id })
            
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
            /* redirect login */
        } 
    });
};

/**
 * Flow: Forgotten Password
 * 1. Generate password reset token with random bytes
 * 2. Save the password reset token in DB
 * 3. Send email to user with the link (prepended with token)
 * Any condition above that is not met will be redirected to forgot password page
 */

const forgotPassword = (req, res) => {
    const user = req.user;

    async.waterfall([
        function(done){
            const byteSize = parseInt(process.env.PASSWORD_RESET_BYTESIZE);
            crypto.randomBytes(byteSize, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token)
            });
        },
        function(token, done){
            const forgottenPwdRecord = new ForgottenPassword({
                token,
                uid: user._id
            });
            forgottenPwdRecord.save(err => { done(err, token) }); // delete first and save new one
        },
        function(token, done) {
            Mailer.send.forgottenPwdMail({
                host: req.headers.host,
                user,
                token,
            }, done);
        }
    ], function(err) {
        if (err) {
            return res.status(400).json({ errors: err})
            /* redirect to /forgotpwd */
        }
        return res.sendStatus(200);
    });

}

const verifyResetToken = (req, res) => {
    ForgottenPassword.findTokenByAlgo(req.params.token, (err, result) => {
        if(err || !result) {
            return res.sendStatus(400);
            //   res.redirect('/forgotpwd');
        }
        return res.sendStatus(200);
    });
}

const resetPassword = (req, res) => {
    async.waterfall([
        function(done) {
            ForgottenPassword.findTokenByAlgo(req.params.token, async (err, record) => {
                // if no record found
                if (!record) {
                    return done(true);
                    //   return res.redirect('back');
                }

                User.findById(record.uid, (err, user) => {
                    done(err, { user, record });
                });
            });
        },
        function({ user, record }, done){
            user.password = req.body.password;
            user.save(err => {
                done(err, { user, record });
            });
        },
        function({ user, record }, done){
            ForgottenPassword.findByIdAndDelete(record._id, (err, _) => {
                done(err, user);
            });
        },
        function(user, done) {
            Mailer.send.resetPwdDoneMail({ user }, done);
        }
      ], function(err) {
        if(err){
            return res.sendStatus(400);
            // res.redirect('/');
        }
        return res.sendStatus(200);
      });
}

module.exports = { register, login, renewToken, forgotPassword, verifyResetToken, resetPassword }