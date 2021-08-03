const products = require('products-mock');
const { successResponse } = require('helper');

module.exports = async (event) => successResponse(products);