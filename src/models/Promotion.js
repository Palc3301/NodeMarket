const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  startDate: {
    type: Date,
    required: true,
    min: Date.now() // A promoção não pode começar no passado
  },
  endDate: {
    type: Date,
    required: true,
    min: Date.now() // A promoção não pode terminar no passado
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model("Promotion", promotionSchema);
