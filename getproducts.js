const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../models/product');

const Product = mongoose.model('product', productSchema);

// GET all products
const getproducts = async (req, res) => {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getproducts;
