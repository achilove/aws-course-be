CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
	id UUID NOT NULL DEFAULT uuid_generate_v4(),
	title TEXT UNIQUE NOT NULL,
	description TEXT,
	price INTEGER,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS stocks (
	product_id UUID,
	count INTEGER,
	FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);