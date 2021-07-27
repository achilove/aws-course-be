const { Client } = require('pg');

const { successResponse, unexpectedErrorResponse, validationErrorResponse, ProductExistsErrorResponse } = require('helper');
const { dbOptions } = require('./db/config');
const { validateCount, validatePrice, validateTitle, validateDescription } = require('./validators');
const { ValidationError, ValidationNotPresentError } = require('./errors');

function validateBody(body) {
    const { title, price, count, description } = body;
    if(title === undefined) throw new ValidationNotPresentError('title');
    if(price === undefined) throw new ValidationNotPresentError('price');
    if(count === undefined) throw new ValidationNotPresentError('count');
    if(description === undefined) throw new ValidationNotPresentError('description');

    validateTitle(title);
    validatePrice(price);
    validateCount(count);
    validateDescription(description);
}


module.exports = async (event) => {
    if (event.body) {
        const client = new Client(dbOptions);
        let body;

        try {
            body = JSON.parse(event.body);
            validateBody(body);
        }catch (e) {
            if (e instanceof ValidationError) {
                return validationErrorResponse(e.message);
            }else{
                return unexpectedErrorResponse();
            }
        }

        try {
            await client.connect();
          
            const { title, price, description, count } = body;

            await client.query('BEGIN')

            const productInsertionResponse = await client.query(`insert into products(title, price, description) VALUES($1, $2, $3) RETURNING *`, [title, price, description]);
            const product = productInsertionResponse.rows[0];

            const stockInsertionResponse = await client.query(`insert into stocks(product_id, count) VALUES($1, $2) RETURNING *`, [product.id, count]);
            await client.query('COMMIT')
            product.count = stockInsertionResponse.rows[0].count;

            return successResponse(product);
        } catch (e) {
            await client.query('ROLLBACK')

            if((e.code && Number(e.code) === 23505) && (e.constraint && e.constraint == "products_title_key")  ){
                return ProductExistsErrorResponse('product with given title already exists');
            }
            console.error('DB error: ', e)
            return unexpectedErrorResponse();
        }
    } else {
        return validationErrorResponse("body");
    }
};