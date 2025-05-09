const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require("nodemailer");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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
        connection.release();
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
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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

app.post('/api/booking', async (req, res) => {
    const {name, phone, room, start, end} = req.body;
    if (!name || !phone || !room || !start || !end) {
        return res.status(400).json({
            success: false,
            message: "Всі поля обов'язкові"
        });
    }
    let connection;
    try {
        connection = await pool.getConnection();

        const startDate = new Date(start);
        const endDate = new Date(end);
        const date = startDate.toISOString().split('T')[0];
        const timeStart = startDate.toTimeString().split(' ')[0];
        const timeEnd = endDate.toTimeString().split(' ')[0];


        const [overlapRows] = await connection.query(`SELECT *
                                                      FROM bookings
                                                      WHERE room_id = ?
                                                        AND date = ?
                                                        AND time_start < ?
                                                        AND time_end > ?`,
            [room, date, timeEnd, timeStart])

        if (overlapRows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Обраний зал вже заброньований на цей час"
            });
        }

        await connection.query(
            `INSERT INTO bookings (room_id, date, time_start, time_end, client_name, client_phone)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [room, date, timeStart, timeEnd, name, phone]
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Нове бронювання!',
            text: `
                Є нове бронювання:
                - Ім'я: ${name}
                - Номер телефону: ${phone}
                - Кімната: ${room}
                - Дата: ${date}
                - Час початку: ${start}
                - Час завершення: ${end}
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Помилка при відправці листа:', error);
            } else {
                console.log('Лист відправлений:', info.response);
            }
        });
        res.status(201).json({
            success: true,
            message: "Бронювання успішно збережено"
        });
    } catch (err) {
        console.error("Помилка при записі бронювання:", err);
        res.status(500).json({
            success: false,
            message: "Помилка сервера: " + (err instanceof Error ? err.message : "Невідома помилка")
        });
    } finally {
        if (connection) {
            await connection.release();
        }
    }

})


app.get("/api/studios", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT id, name FROM rooms");
        console.log(rows);

        res.status(200).json(rows);
    } catch (err) {
        console.error("Помилка при завантаженні студій:", err);
        res.status(500).json({
            success: false,
            message: "Помилка сервера: " + (err instanceof Error ? err.message : "Невідома помилка")
        });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
});

app.get("/api/bookings", async (req, res) => {
    const room_id = req.query.room_id;

    if (!room_id) {
        return res.status(400).json({message: "Не вказано room_id"});
    }
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT
                id,
                date,
                TIME_FORMAT(time_start, '%H:%i') AS time_start,
                TIME_FORMAT(time_end, '%H:%i') AS time_end,
                room_id
            FROM bookings
            WHERE room_id = ?`, [room_id]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error("Помилка при завантаженні бронювань:", err);
        res.status(500).json({
            success: false,
            message: "Помилка сервера: " + (err instanceof Error ? err.message : "Невідома помилка")
        });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
})
app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});