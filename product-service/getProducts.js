const { successResponse } = require('helper');
const { Client } = require('pg');
const { dbOptions } = require('./db/config');

module.exports = async ( event ) => {
    const client = new Client(dbOptions);
    await client.connect();
    try {
        const { rows: products } = await client.query(`select products.id, products.title, products.price, products.description, stocks.count from products left join stocks on products.id = stocks.product_id ;`);
        if( !products[0] ){
            return notFoundResponse('product');
        }
        return successResponse(products);
    }catch(e){
        return unexpectedErrorResponse('product');
    }
};