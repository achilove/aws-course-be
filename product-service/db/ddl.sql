CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table products (
	id UUID NOT null DEFAULT uuid_generate_v4(),
	title text not null,
	description text,
    price integer,
    primary key(id)
);

create table stocks (
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
);