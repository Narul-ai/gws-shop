const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  sizes: [{ type: String }],
  color: { type: String },
  badge: { type: String },
  stockNote: { type: String }, // Например: "Осталось 2 размера"
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);