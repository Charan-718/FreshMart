const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks', 'frozen', 'pantry']
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ''
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  nutrition: {
    calories: Number,
    carbs: Number,
    fiber: Number,
    sugar: Number,
    protein: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);