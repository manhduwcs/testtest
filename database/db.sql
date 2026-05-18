CREATE DATABASE IF NOT EXISTS db_test;
USE db_test;

-- Create table only if it does not exist
CREATE TABLE IF NOT EXISTS product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 0,
    price FLOAT DEFAULT 0.0
);

-- Insert 10 sample data entries safely (only if the table is currently empty)
INSERT INTO product (product_name, quantity, price)
SELECT * FROM (
    SELECT 'Mechanical Keyboard' AS name, 45 AS qty, 89.99 AS prc UNION ALL
    SELECT 'Wireless Gaming Mouse', 60, 59.99 UNION ALL
    SELECT '27-inch 4K Monitor', 15, 349.50 UNION ALL
    SELECT 'USB-C Docking Station', 30, 120.00 UNION ALL
    SELECT 'Active Noise Cancelling Headphones', 25, 199.99 UNION ALL
    SELECT '1TB NVMe SSD', 80, 105.00 UNION ALL
    SELECT 'HD Web Camera', 40, 79.95 UNION ALL
    SELECT 'Ergonomic Desk Chair', 12, 280.00 UNION ALL
    SELECT 'Dual-Band Wi-Fi 6 Router', 35, 145.00 UNION ALL
    SELECT 'External Backup Drive 2TB', 50, 85.00
) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM product LIMIT 1
);
