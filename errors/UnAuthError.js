class UnAuthError extends Error {
    
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401
    }
}

module.exports = UnAuthError;