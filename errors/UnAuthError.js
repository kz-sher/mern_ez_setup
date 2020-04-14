class UnAuthError extends Error {
    
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401
    }
}

module.exports = UnAuthError;