if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const { addNewUser } = require('../services/register.service');
const { generateAccessToken, generateRefreshToken } = require('../services/token.service');
const { User, TokenBlackList } = require('../models');

const getUserData = (req, res) => {
    return res.status(200).json({ user: req.user });
}

const register = function (req, res) {
    // Add user
    addNewUser(req, res, () => { /* Send email*/ });
}

const login = (req, res) => {
    // Get user
    User.findOne({ username: req.body.username }, (err, user) => {
        // If there is an error retrieving user
        if(err){
            return res.status(400).json({ message: err });
        }
        // If user not found
        if(!user){
            return res.status(401).json({ message: "Invalid credentials"});
        }
        // Compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            // If passwords not matched
            if (!isMatch) 
            return res.status(401).json({ message: "Invalid credentials" });
            // Generate token
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: user._id });
            const { refreshToken, refreshTokenExpiry } = generateRefreshToken({ uid: user._id })
            // Keep refresh token in cookie
            res.cookie("rf_tk", refreshToken, {
                expires: new Date(refreshTokenExpiry),
                secure: false, // set to true if https is used
                httpOnly: true,
            }).status(200).json({
                // Let user hold access token info
                accessToken, 
                accessTokenExpiry
            });
        });            
    })
}

const renewToken = (req, res) => {
    // Get refresh token [rf_tk] from cookie
    const refreshToken = req.cookies.rf_tk;
    // Check whether it is available 
    if(!refreshToken) return res.sendStatus(401) //.redirect('/login');
    // Check against black list
    TokenBlackList.find({ token: refreshToken }, (err, token) => {
        // If retrieval error exists
        if(err && err.status !== 404) return res.sendStatus(400);
        // If it is found in black list
        if(token){
            /* Send alert email */
            return res.sendStatus(403) //.redirect('/login');
        } 
        // See if it is within valid expiry time
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            // If verification error exists
            if(err) return res.sendStatus(401) //.redirect('/login');
            // Generate new access token set for user
            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: decoded.uid });
            return res.status(200).json({ accessToken, accessTokenExpiry, refresh: true });
        })
    });
}

module.exports = { getUserData, register, login, renewToken }