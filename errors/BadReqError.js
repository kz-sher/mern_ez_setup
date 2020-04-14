class BadReqError extends Error {
    
    constructor(message = 'Invalid Request') {
        super(message);
        this.name = 'BadRequestError';
        this.status = 400;
    }
}

module.exports = BadReqError;