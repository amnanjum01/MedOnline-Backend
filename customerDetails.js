const mongoose = require("mongoose");
const express = require("express");
const app = express();


const schemaCustomer = require('../models/customer');

const Customer = mongoose.model('customers', schemaCustomer);

const viewCust = async function (req, res) {
  const custID=req.body.customerID


  try {
    const customer = await Customer.findOne({customerID:custID});

    if (!customer) {
      return res.status(404).send("Customer not found!");
    }
    return res.send(customer);

  } catch (error) {
    console.log(error);
    return res.status(500).send("It seems there was a server error. Please, try again");
  }
};

module.exports = viewCust;
