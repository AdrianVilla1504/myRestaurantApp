const mongoose = require('mongoose');
const User = require('../users/users.model');

const OrderSchema = new mongoose.Schema({
clientName: {
    type: mongoose.Schema.Types.String,
    ref: User,
    require: true,
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require: true,
  },
  products: [
    {
      productName: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],
  address: {
    neighborhood: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    indications: {
      type: String,
      required: true,
    },
    propertyDescription: {
      type: String,
      required: true,
    }
  },
  clientPhone: {
    type: mongoose.Schema.Types.String,
    ref: User,
    require: true,
  },
  status:{
    type: String,
    enum: ['PLACED', 'PREPARATION', 'SENT', 'DELIVERED'],
    default: 'PLACED',
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
