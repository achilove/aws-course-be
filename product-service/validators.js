const { ValidationError } = require('./errors');

module.exports.validateCount = (count) => {
    if ( isNaN(count) ) throw new ValidationError('count');
}

module.exports.validatePrice = (price) => {
    if ( isNaN(price) ) throw new ValidationError('price');
}
module.exports.validateTitle = (title) => {
    if ( typeof title !== 'string' || title.length > 20 ) throw new ValidationError('title');
}

module.exports.validateDescription = (description) => {
    if ( typeof description !== 'string' || description.length > 50 ) throw new ValidationError('description');
}

