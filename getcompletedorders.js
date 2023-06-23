const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const orderSchema = require('../models/orders')

const ordermodel = mongoose.model("orders",orderSchema)

const getcompletedorders = async (req, res) => {
    try {
      const orders = await ordermodel.find({ status: 'processing' }); 
      if(orders.length === 0){
        return res.status(404).json({msg: 'No orders have been completed'});
      }
      res.json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  module.exports = getcompletedorders

