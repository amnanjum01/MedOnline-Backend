//This API will show all the details of a specific chosen product
//only a single product can be shown this way

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const schemaProduct = require('../models/product');

const Product = mongoose.model('product', schemaProduct);


const detail = async function (req, res) {
  const id = req.params.id;

  try {
    const product = await Product.findOne({productID: id})
    if (!product) {
      return res.status(404).send("Sorry, product not found!");
    }

    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send("It seems there was a server error. Please, try again");
  }
};

module.exports = detail;
