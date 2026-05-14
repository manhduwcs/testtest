CREATE DATABASE IF NOT EXISTS db_test;
USE db_test;

CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 0,
    price FLOAT DEFAULT 0.0
);

-- Optional: Initial data
INSERT INTO product (product_name, quantity, price) VALUES ('Laptop', 10, 999.99);
