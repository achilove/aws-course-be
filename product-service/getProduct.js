const { successResponse, notFoundResponse, unexpectedErrorResponse } = require('helper');
const { Client } = require('pg');
const { dbOptions } = require('./db/config');

module.exports = async ( event ) => {
    const client = new Client(dbOptions);
    await client.connect();
    try {
        const { pathParameters } = event;
        const { id } = pathParameters;
        const { rows: products } = await client.query(`select products.id, products.title, products.price, products.description, stocks.count from products left join stocks on products.id = stocks.product_id where products.id=${id}`);
        if( !products[0] ){
            return notFoundResponse('product');
        }
        return successResponse(products[0]);
    }catch(e){
        return unexpectedErrorResponse('product');
    }
};