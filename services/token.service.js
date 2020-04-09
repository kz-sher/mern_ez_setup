if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const moment = require('moment');

const generateAccessToken = data => {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME });
    const accessTokenExpiry = moment().add(1, 'hour').valueOf(); 
    return { accessToken, accessTokenExpiry };
}

const generateRefreshToken = data => {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }); 
    const refreshTokenExpiry = moment().add(1, 'year').valueOf(); 
    return { refreshToken, refreshTokenExpiry };
}

// Concatenate the first and last 2 digits as indexes
const generateTokenID = token => {
    const num = parseInt(process.env.TOKEN_ID_DIGITS);
    return token.substring(0, num).concat(token.substring(token.length - num, token.length));
}


module.exports = { generateAccessToken, generateRefreshToken, generateTokenID }