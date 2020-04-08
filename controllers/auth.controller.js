if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const { addNewUser } = require('../services/register.service');
const { generateAccessToken, generateRefreshToken } = require('../services/token.service');
const { User, TokenBlackList } = require('../models');

/**
 * Flow: Registration
 * 1. Validate registration data
 * 2. Add new user
 * 3. Send email to notify user about successful registration
 */
const register = function (req, res) {
    addNewUser(req, res, () => { /* Send email*/ });
}

/**
 * Flow: Login
 * 1. Check if username/email exists
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
    
    User.findOne({ username: req.body.username }, (err, user) => {
        
        // If there is an error retrieving user
        if(err)
        return res.status(400).json({ message: err });
        
        // If user not found
        if(!user)
        return res.status(401).json({ message: "Invalid credentials"});
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            
            // If passwords not matched
            if (!isMatch) 
            return res.status(401).json({ message: "Invalid credentials" });
            
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
        });            
    })
}

/**
 * Flow: Token Renewal
 * 1. Check if refresh token exists in cookie
 * 2. Check if refresh token is valid
 * 3. Check if it is in black list (send alert email to admin if yes)
 * 4. Generate new access token set
 * Any condition above that is not met will be redirected to login page
 */
const renewToken = (req, res) => {
    
    // Check whether it is available 
    const refreshToken = req.cookies.rf_tk;
    console.log(refreshToken)
    if(!refreshToken) 
    return res.sendStatus(401) //.redirect('/login');
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        
        // If verification error exists
        if(err) 
        return res.sendStatus(401) //.redirect('/login');
        
        TokenBlackList.find({ token: refreshToken }, (err, token) => {
            
            // If retrieval error exists
            if(err && err.status !== 404) 
            return res.sendStatus(400); //.redirect('/login');
            
            // If it is found in black list
            if(token){
                /* Send alert email */
                return res.sendStatus(403) //.redirect('/login');
            }

            const { accessToken, accessTokenExpiry } = generateAccessToken({ uid: decoded.uid });
            return res.status(200).json({ accessToken, accessTokenExpiry, refresh: true });
        });
    });
}

const forgotPassword = (req, res) => {
    // Send reset password token

}

const resetPassword = (req, res) => {
    
}

module.exports = { register, login, renewToken, forgotPassword, resetPassword }