const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  type: { type: String },
  description: { type: String },
  expirationDate: { type: Date, default: null }, // Valor padrão definido como nulo
});

module.exports = mongoose.model("Product", productSchema);
