const GeneralErrorHandler = (err, req, res, next) => {
    if(err.name === 'JsonWebTokenError'){
        return res.status(401).json({ header: 'Invalid/Expired Token'});
    }
    res.status(err.status || 500).json(err.message);
}

module.exports = { GeneralErrorHandler };