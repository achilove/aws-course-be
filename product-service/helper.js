const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const HttpStatusCodes = {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422
}

const response = (body, statusCode) => {
    body = JSON.stringify(body);
    return {
        statusCode,
        body,
        headers
    };
}

module.exports.successResponse = body => {
    return response(body, HttpStatusCodes.SUCCESS);
}

module.exports.notFoundResponse = item => {
    const message = item + ' not found';
    return response({
        message
    }, HttpStatusCodes.NOT_FOUND);
}

module.exports.unexpectedErrorResponse = () => {
    const message = 'Unexpected error has occurred';
    return response({
        message
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
}

module.exports.validationErrorResponse = (message) => {
    return response({
        message
    }, HttpStatusCodes.BAD_REQUEST);
}

module.exports.ProductExistsErrorResponse = (message) => {
    return response({
        message
    }, HttpStatusCodes.UNPROCESSABLE_ENTITY);
}