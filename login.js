const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const customerSchema = require('../models/customer');

app.use(express.json());

customerSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const Customer = mongoose.model('customer', customerSchema);

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Email and password are required.');
  }

  
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(req.body.email)) {
     return res.status(400).send('Invalid email format.');
   }

 
  if (req.body.password.length < 8) {
    return res.status(400).send('Password must be at least 8 characters long.');
  }

  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send('Invalid email or password.');
  
  const isMatch = await customer.comparePassword(req.body.password);
  if (!isMatch) return res.status(400).send('Invalid username or password.');

  const token = jwt.sign({ _id: customer._id }, 'secret');
  res.send(token);
};

module.exports = login;