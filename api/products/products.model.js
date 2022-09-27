const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['FOOD', 'DRINK'],
    default: 'FOOD',
  },
  qty:{
    type: Number,
    default: 1,
  },
}, { timestamps: true });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
