const products = require('products-mock');
const { successResponse, notFoundResponse, unexpectedErrorResponse } = require('helper');

module.exports = async (event) => {
    try {
        const { pathParameters } = event;
        const { id } = pathParameters;
        const product = products.filter(elem => elem.id === id)[0];
        if( !product ){
            return notFoundResponse('product');
        }
        return successResponse(product);
    }catch(e){
        return unexpectedErrorResponse('product');
    }
};