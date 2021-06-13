endpoints:
  GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products
  GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products/{id}

FE pull request with products endpoints integrated
https://github.com/rolling-scopes-school/nodejs-aws-fe/pull/288

Products schema
  count         | number |  number or ordered products
  description   | string |  product description
  id            | uid    |  id of product
  price         | number |  price of product
  title         | string |  title/name of product