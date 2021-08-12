const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const response = (body, statusCode) => {
    body = JSON.stringify(body);
    return {
        statusCode,
        body,
        headers
    };
}

module.exports.successResponse = body => {
    return response(body, 200);
}

module.exports.notFoundResponse = item => {
    const message = item + ' not found';
    return response({
        message
    }, 404);
}

module.exports.unexpectedErrorResponse = () => {
    const message = 'Unexpected error has occurred';
    return response({
        message
    }, 500);
}

module.exports.validationErrorResponse = (message) => {
    return response({
        message
    }, 400);
}

module.exports.ProductExistsErrorResponse = (message) => {
    return response({
        message
    }, 422);
}