if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const moment = require('moment');

const generateAccessToken = data => {
    // Create token for the user
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME });
    const accessTokenExpiry = moment().add(1, 'hour').valueOf(); 
    return { accessToken, accessTokenExpiry };
}

const generateRefreshToken = data => {
    // Create token for the user
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }); 
    const refreshTokenExpiry = moment().add(1, 'year').valueOf(); 
    return { refreshToken, refreshTokenExpiry };
}


module.exports = { generateAccessToken, generateRefreshToken}