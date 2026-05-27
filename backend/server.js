const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST || "host.docker.internal",
    port: process.env.DB_PORT || 3306,
    user: "backend",
    password: 'A@123456',
    database: 'db_test',
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/ready', (req, res) => {
    db.query('SELECT 1', (err) => {
        if (err) {
            return res.status(500).json({ status: 'NOT_READY', database: 'DOWN' });
        }
        res.status(200).json({ status: 'READY', database: 'OK' });
    });
});

// ==========================================
// CÁC TUYẾN ĐƯỜNG NGHIỆP VỤ (CRUD ROUTES)
// ==========================================

app.get('/products', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    const { product_name, quantity, price } = req.body;
    db.query('INSERT INTO product SET ?', { product_name, quantity, price }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

app.put('/products/:id', (req, res) => {
    const { product_name, quantity, price } = req.body;
    db.query('UPDATE product SET product_name=?, quantity=?, price=? WHERE product_id=?',
    [product_name, quantity, price, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.delete('/products/:id', (req, res) => {
    db.query('DELETE FROM product WHERE product_id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// Xuất app ra để file test có thể kéo về chạy offline
module.exports = { app, db };
