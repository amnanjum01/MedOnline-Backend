const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../models/product');

const Product = mongoose.model('product', productSchema);

const getproduct = async(req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({ productID: productId });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  module.exports = getproduct;