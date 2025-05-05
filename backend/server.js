require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Використовуємо promise-інтерфейс
const app = express();
const port = 5000;

app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'photo_studio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Підключено до бази даних MySQL з ID:', connection.threadId);
        connection.release(); // Відпускаємо з'єднання назад у пул
    })
    .catch(err => {
        console.error('Помилка при підключенні до бази даних:', err.stack);
    });

app.get('/rooms', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT id, name FROM rooms');
        res.status(200).json(rows);
    } catch (err) {
        console.error("Помилка при завантаженні студій:", err);
        res.status(500).json({
            success: false,
            message: "Помилка сервера: " + (err instanceof Error ? err.message : "Невідома помилка")
        });
    } finally {
        if (connection) {
            connection.release(); // Повертаємо з'єднання в пул
        }
    }
});

app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});