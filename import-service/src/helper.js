const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

const HttpStatusCodes = {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500
}

const response = (body, statusCode) => {
    body = JSON.stringify(body);
    return {
        statusCode,
        body,
        headers
    };
}

module.exports.HttpStatusCodes = HttpStatusCodes;

module.exports.successResponse = body => {
    return response(body, HttpStatusCodes.SUCCESS);
}

module.exports.errorResponse = (errorMessage, statusCode) => {
    return response({
        errorMessage
    }, statusCode);
}
