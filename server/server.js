const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// Добавим отладочный вывод
console.log('Environment variables:', {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  PORT: process.env.PORT
});

// Расширенная настройка CORS
app.use(cors({
  origin: 'http://localhost:5173', // Укажите порт вашего Vite приложения
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());

// Проверка конфигурации
const checkConfig = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASS'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Создание транспорта с проверкой
const createTransporter = () => {
  checkConfig();
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const transporter = createTransporter();

// Тестирование соединения при запуске
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email configuration:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gpodgorniy@gmail.com',
      subject: 'Новая заявка с сайта Цифровой театр',
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
        <p><strong>Сообщение:</strong> ${message || 'Не указано'}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
}); 