
const { dbOptions } = require('./db/config');

const client = new Client(dbOptions);

module.exports = async ({ title, price, description, count = 0 }) => {
  try {
    await client.connect();
    await client.query('BEGIN')

    const productInsertionResponse = await client.query(
        `INSERT INTO products(title, price, description) 
            VALUES($1, $2, $3) RETURNING *`, 
    [title, price, description]);

    const product = productInsertionResponse.rows[0];

    const stockInsertionResponse = await client.query(
        `INSERT INTO stocks(product_id, count) 
        VALUES($1, $2) RETURNING *`, 
    [product.id, count]);
    
    await client.query('COMMIT');

    product.count = stockInsertionResponse.rows[0].count;
    return product;
  } catch (e) {
    await client.query('ROLLBACK')
    throw e;
  } finally {
    client.release();
  }
}