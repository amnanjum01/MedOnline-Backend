//This API will allow user/admin to look up products in the database based on the product family, name or manufacturer
//The name doesn't have to be an exact match and will show all possible matches

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const schemaProduct = require('../models/product');

const Product = mongoose.model('product', schemaProduct);


const searchUp = async function (req, res) {
  const search = req.params.search;
 

  try {
    const products = await Product.find({ $or: [
        {name: {$regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } },
        { drug_family: { $regex: search, $options: 'i' } },
      ]
    }
    );
    if (!products) {
      return res.status(404).send("Sorry, product not found!");
    }

    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(500).send("It seems there was a server error. Please, try again");
  }
};

module.exports = searchUp;
