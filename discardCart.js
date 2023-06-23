const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
}));

const schemaCart = require('../models/cart');

const Cart = mongoose.model('carts', schemaCart);

const clear = async function (req, res) {
  //const sessionId = req.sessionID;
  const sessionId = 4444;
  try {
    const cart = await Cart.findOne({cartId: sessionId});

    if (!cart) {
      return res.status(404).send("Your cart is empty!");
    }

    await Cart.findOneAndDelete({cartId: sessionId});
    console.log('Cart successfully deleted');
    return res.send("Your cart was successfully cleared");

  } catch (error) {
    console.log(error);
    return res.status(500).send("It seems there was a server error. Please, try again");
  }
};

module.exports = clear;
