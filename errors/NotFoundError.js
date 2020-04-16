class NotFoundError extends Error {
    
    constructor(message = 'NotFound') {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404
    }
}

module.exports = NotFoundError;