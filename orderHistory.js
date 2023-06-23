const mongoose = require("mongoose");
const express = require("express");
const app = express();


const schemaOrder = require('../models/orders');
const schemaCustomer = require('../models/customer');

const Order = mongoose.model('orders', schemaOrder);
const Customer = mongoose.model('customers', schemaCustomer);

const orderHist = async function (req, res) {

    const customerID = req.body.customerID;

    try {
      const customer = await Customer.findOne({ customerID });
  
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      const orders = await Order.find({ customerID });
  
      res.json({ orders });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = orderHist;
  
