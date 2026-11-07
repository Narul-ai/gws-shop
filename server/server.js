const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gws_shop';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB успешно подключена!');
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  })
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));