const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const orderSchema = require('../models/orders')

const ordermodel = mongoose.model("orders",orderSchema)

const getcancelledorders = async (req, res) => {
    try {
      const orders = await ordermodel.find({ status: 'cancelled' }); 
      if(orders.length === 0){
        return res.status(404).json({msg: 'No cancelled orders found'});
      }
      res.json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  module.exports = getcancelledorders

