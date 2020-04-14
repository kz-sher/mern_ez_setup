class EmailError{
    
    constructor(obj) {
        this.message = obj;
        this.name = 'EmailError';
    }
}

module.exports = EmailError;