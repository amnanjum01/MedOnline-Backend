const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const prodmodel = mongoose.model("product",productSchema)


const updateproduct= async (req, res) => {
    const productID = req.params.productID;
    const updatedProduct = req.body;
    try {
      const product = await prodmodel.findOneAndUpdate(
        { productID: productID },
        updatedProduct,
        { new: true }
      );
      if (product) {
        res.send("Product has been successfully updated");
      } else {
        res.status(404).send('Product not found');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };
  
module.exports = updateproduct;