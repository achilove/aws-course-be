insert into products (title, description, price) values
    ('ProductOne','Short Product Description 1', 2),
    ('ProductTwo','Short Product Description 2', 10),
    ('ProductThree','Short Product Description 3', 12),
    ('ProductFour','Short Product Description 4', 23),
    ('ProductFive','Short Product Description 5', 34),
    ('ProductSix','Short Product Description 6', 13),
    ('ProductSeven','Short Product Description 7', 11),
    ('ProductEight','Short Product Description 8', 23),
    ('ProductNine','Short Product Description 9', 7);

INSERT INTO stocks (count, product_id) VALUES
    ( 2,  (SELECT id from products WHERE title='ProductOne') ),
    ( 5,  (SELECT id from products WHERE title='ProductTwo' ) ),
    ( 3,  (SELECT id from products WHERE title='ProductThree' ) ),
    ( 4,  (SELECT id from products WHERE title='ProductFour' ) ),
    ( 2,  (SELECT id from products WHERE title='ProductFive' ) ),
    ( 1,  (SELECT id from products WHERE title='ProductSix' ) ),
    ( 3,  (SELECT id from products WHERE title='ProductSeven' ) ),
    ( 3,  (SELECT id from products WHERE title='ProductEight' ) ),
    ( 3,  (SELECT id from products WHERE title='ProductNine' ) );