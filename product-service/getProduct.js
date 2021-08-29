const { Client } = require('pg');

const { successResponse, notFoundResponse, unexpectedErrorResponse, validationErrorResponse } = require('helper');
const { dbOptions } = require('./db/config');
const PG_ERROR_DUPLICATE_ENTRIES = '22P02'; 

module.exports = async ( event ) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        console.log('getProduct handler input:', event);
        const { pathParameters } = event;
        const { id } = pathParameters;
        const { rows: products } = await client.query(`select products.id, products.title, products.price, products.description, stocks.count from products left join stocks on products.id = stocks.product_id where products.id=$1`, [id]);
        if( !products[0] ){
            return notFoundResponse('product');
        }
        return successResponse(products[0]);
    }catch(e){
        console.log('DB error: ', e)

        if((e.code && e.code === PG_ERROR_DUPLICATE_ENTRIES) ){
            return validationErrorResponse('id should be uuid format');
        }

        return unexpectedErrorResponse();
    }finally {
        client.end();
    }
};