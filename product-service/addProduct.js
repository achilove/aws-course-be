const { Client } = require('pg');

const { successResponse, unexpectedErrorResponse, validationErrorResponse } = require('helper');
const { dbOptions } = require('./db/config');
const { validateCount, validatePrice, validateTitle, validateDescription} = require('./validators');
const { ValidationError } = require('./errors');

function validateBody(body){
    const { title, price, count, description } = body;
    validateTitle(title);
    validatePrice(price);
    validateCount(count);
    validateDescription(description);
}


module.exports = async ( event ) => {
    if(event.body){
        const client = new Client(dbOptions);
        try {
            await client.connect();
            
            const body = JSON.parse(event.body);
            validateBody(body);
            const { title, price, description, count } = body;
            
            await client.query('BEGIN')
    
            const productInsertionResponse = await client.query(`insert into products(title, price, description) VALUES($1, $2, $3) RETURNING *`, [title, price, description]);
            const product = productInsertionResponse.rows[0];
    
            const stockInsertionResponse = await client.query(`insert into stocks(product_id, count) VALUES($1, $2) RETURNING *`, [product.id, count]);
            await client.query('COMMIT')
            product.count = stockInsertionResponse.rows[0].count;
    
            return successResponse(product);
        }catch(e){
            if(e instanceof ValidationError){
                return validationErrorResponse(e.message);
            }
    
            await client.query('ROLLBACK')
    
            console.error('DB error: ', e)
            return unexpectedErrorResponse('product');
        }
    }
};