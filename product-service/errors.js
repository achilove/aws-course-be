class ValidationError extends Error {
    constructor(param){
        super();
        this.message = param + " paramter value is invalid" ;
    }
}

module.exports.ValidationError = ValidationError;