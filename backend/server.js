const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database Configuration
const db = mysql.createConnection({
    host: 'localhost', // Change this to your DB container IP if needed
    user: 'root',
    password: 'root123',
    database: 'db_test'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// CRUD ROUTES

// 1. Get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. Create product
app.post('/products', (req, res) => {
    const { product_name, quantity, price } = req.body;
    db.query('INSERT INTO product SET ?', { product_name, quantity, price }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

// 3. Update product
app.put('/products/:id', (req, res) => {
    const { product_name, quantity, price } = req.body;
    db.query('UPDATE product SET product_name=?, quantity=?, price=? WHERE product_id=?',
    [product_name, quantity, price, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// 4. Delete product
app.delete('/products/:id', (req, res) => {
    db.query('DELETE FROM product WHERE product_id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));
