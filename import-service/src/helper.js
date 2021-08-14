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

module.exports.errorResponse = (errorMessage, statusCode) => {
    return response({
        errorMessage
    }, statusCode);
}
