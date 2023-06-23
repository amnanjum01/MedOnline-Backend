const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
}));

const schemaProduct = require('../models/product');
const schemaCart = require('../models/cart');

const Product = mongoose.model('product', schemaProduct);
const Cart = mongoose.model('carts', schemaCart);

const view = async function (req, res) {
  //const sessionId = req.sessionID;

  const sessionId=6666;


  try {
    const cart = await Cart.findOne({cartId:sessionId});

    if (!cart) {
      return res.status(404).send("Your cart is empty!");
    }

    const getProductData = async (cart) => {
      const productArr = [];

      for (const product of cart.products) {
        const prod = await Product.findOne({ productID: product.productID });
        const prodObj = {
          productID: prod.productID,
          name: prod.name,
          quantity: product.quantity,
          price: prod.price
        };
        productArr.push(prodObj);
      }

      const detailObj ={
          Total: cart.totalAmount,
      }
      productArr.push(detailObj);
      return productArr;
    }

    const cartData = await getProductData(cart);
    return res.send(cartData);

  } catch (error) {
    console.log(error);
    return res.status(500).send("It seems there was a server error. Please, try again");
  }
};

module.exports = view;
