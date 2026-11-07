const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Получить все товары с поддержкой фильтрации по категории
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = (category && category !== 'all') ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товаров' });
  }
});

// Получить один товар по ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;