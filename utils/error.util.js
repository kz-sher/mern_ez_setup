const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const formatYupError = err => {
    const errors = {}
    err.inner.forEach(e => {
      errors[e.path] = e.message;
    })
    return errors
}

const ErrorWithCode = (msg, code=400) => {
    const err = Error();
    err.msg = msg;
    err.status = code;
    return err;
}

// Middleware error handler for json response
const handlePassportError = (err, req, res, next) => {
  if(err === "404") {
    // Extract token from requst header
    const token = fromAuthHeaderAsBearerToken()(req);

    // response without error message if there is no error
    if(!token) {
      return res.sendStatus(400);
    }
    else{
      return res.status(400).json({ message: "Invalid/expired token" })
    }
  }
  
  return res.status(400).json({ message: err });
}

module.exports = { formatYupError, handlePassportError, ErrorWithCode}