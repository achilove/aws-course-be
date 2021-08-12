class ValidationError extends Error {
    constructor(param){
        super();
        this.message = param + " parameter value is invalid" ;
    }
}

class ValidationNotPresentError extends ValidationError {
    constructor(param){
        super();
        this.message = param + " parameter is not present" ;
    }
}

module.exports.ValidationError = ValidationError;
module.exports.ValidationNotPresentError = ValidationNotPresentError;