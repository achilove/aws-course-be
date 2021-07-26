const { ValidationError } = require('./errors');

module.exports.validateCount = (count) => {
    if ( !count || isNaN(count) ) throw new ValidationError('count');
}

module.exports.validatePrice = (price) => {
    if ( !price || isNaN(price) ) throw new ValidationError('price');
}
module.exports.validateTitle = (title) => {
    if ( !title || typeof title !== 'string' || title.length > 20 ) throw new ValidationError('title');
}

module.exports.validateDescription = (description) => {
    if ( !description || typeof description !== 'string' || description.length > 50 ) throw new ValidationError('description');
}

