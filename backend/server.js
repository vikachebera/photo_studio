require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require("nodemailer");
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
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
})


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

app.use(express.json());
app.post('/api/contact', async (req, res) => {
    console.log("Отримано запит на /api/contact");
    console.log("Request body:", req.body); // Додайте це для діагностики

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Відсутнє тіло запиту"
        });
    }

    const {name, phone, email} = req.body;

    if (!name || !phone || !email) {
        return res.status(400).type('json').json({
            success: false,
            message: "Будь ласка, заповніть всі поля"
        });
    }

    try {
        const mailOptions = {
            from: 'vverrorr@gmail.com',
            to: 'vverrorr@gmail.com',
            subject: 'Новий запит на зв\'язок',
            text: `Новий запит на зв'язок:\nІм'я: ${name}\nТелефон: ${phone} \nЕмейл: ${email}`
        };

        await transporter.sendMail(mailOptions);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: true,
            message: "Ваш запит успішно відправлено. Ми зв'яжемося з вами найближчим часом."
        });
    } catch (err) {
        console.error("Помилка при обробці запиту:", err);
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({
            success: false,
            message: "Помилка сервера: " + (err instanceof Error ? err.message : "Невідома помилка")
        });
    }

})

app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});