endpoints:
  GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products
  GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products/{id}
  POST - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products

FE pull request with products endpoints integrated
https://github.com/achilove/nodejs-aws-fe/pull/2

Products schema
  count         | number |  number or ordered products
  description   | string |  product description
  id            | uid    |  id of product
  price         | number |  price of product
  title         | string |  title/name of product

samples:

GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products

[
    {
        "id": "7c91e517-d979-47f3-9e37-6d2acaed8b04",
        "title": "ProductOne",
        "price": 2,
        "description": "Short Product Description 1",
        "count": 2
    },{
        "id": "dc2d362c-4d72-4b41-b765-cc6a5294d927",
        "title": "Product Cool",
        "price": 2,
        "description": "Some coolest product",
        "count": 2
    },
]

GET - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products/7c91e517-d979-47f3-9e37-6d2acaed8b04

{
      "id": "7c91e517-d979-47f3-9e37-6d2acaed8b04",
      "title": "ProductOne",
      "price": 2,
      "description": "Short Product Description 1",
      "count": 2
}

POST - https://33j0f1vd50.execute-api.eu-west-1.amazonaws.com/dev/products

BODY 

{"title":"Narin","price":2,"description":"Soup-like dish","count":2}

{
    "id": "5483fc20-f250-4c13-ba6d-2fd50ca799c6",
    "title": "Narin",
    "description": "Soup-like dish",
    "price": 2,
    "count": 2
}