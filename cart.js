const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartId: { 
    type: String,
    required: true,
    unique: true
  },
  products: [
    {
      productID: { type: String, required: true },
      quantity:{type: Number, required:true, maximum: 5}
    }
  ],
  //totalItems: {
    //type: Number,
    //required: true
  //},
  totalAmount: {
    type: Number,
    required: true
  }
});

module.exports = cartSchema;