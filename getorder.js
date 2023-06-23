const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const orderSchema = require('../models/orders')
const ordermodel = mongoose.model("orders",orderSchema)

const getorder =async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await ordermodel.findOne({ orderID: orderId });
      if (!order) {
        return res.status(404).json({ message: `Order with ID ${orderId} not found` });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = getorder;