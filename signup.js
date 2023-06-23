const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bcrypt = require('bcrypt')

const customerSchema = require('../models/customer');
customerSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};
const Customer = mongoose.model('customer', customerSchema);

const signUp = async function (req, res) {
  const { name, email, password, phone, address, postalCode, dob } = req.body;

  
  
  if (!name || !email || !password || !phone || !address || !postalCode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  
  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
  const validPhone = phoneRegex.test(phone);
  if (!validPhone) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

 
  const postalCodeRegex = /^\d{5}$/; // 5 digits only
  const validPostalCode = postalCodeRegex.test(postalCode);
  
  if (!validPostalCode) {
    return res.status(400).json({ error: 'Invalid postal code' });
  }


  let custID;

  async function getCustomerCount() {
    try {
      const count = await Customer.countDocuments({});
      console.log(count)
      if (count === 0) {
        return 100;
      } else {
        return 100 + count;
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error getting count of customers");
    }
  }

  const existingCustomer = await Customer.findOne({ email: email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Account already exists' });
    }

  try {
    custID = await getCustomerCount();
    console.log(custID);
  
    const customer = new Customer({
      customerID: custID,
      name,//
      email,//
      password: await bcrypt.hash(password, 10),//
      phone,
      address,
      postalCode,//
      dob
    });

    await customer.save();

    res.status(201).json({ message: 'Account created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = signUp;