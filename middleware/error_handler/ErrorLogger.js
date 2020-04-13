const ErrorLogger = (err, req, res, next) => {
    // console.log(err) // enable it if error log is required
    next(err);
}

module.exports = { ErrorLogger };