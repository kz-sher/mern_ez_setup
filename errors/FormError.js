class FormError {
    
    constructor(obj) {
        this.message = obj;
        this.name = 'FormError';
        this.status = 422;
    }
}

module.exports = FormError;