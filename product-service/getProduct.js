const { Client } = require('pg');

const { successResponse, notFoundResponse, unexpectedErrorResponse } = require('helper');
const { dbOptions } = require('./db/config');

module.exports = async ( event ) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        console.log('getProduct handler input:', event);
        const { pathParameters } = event;
        const { id } = pathParameters;
        const { rows: products } = await client.query(`select products.id, products.title, products.price, products.description, stocks.count from products left join stocks on products.id = stocks.product_id where products.id='${id}';`);
        if( !products[0] ){
            return notFoundResponse('product');
        }
        return successResponse(products[0]);
    }catch(e){
        console.log('DB error: ', e)
        return unexpectedErrorResponse();
    }finally {
        client.end();
    }
};