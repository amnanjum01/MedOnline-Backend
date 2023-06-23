const mongoose = require("mongoose");
const express = require("express");
const app = express();

const schemaCustomer = require('../models/customer');
const schemaCart = require('../models/cart');
const schemaOrder = require('../models/orders');
const schemaProduct = require('../models/product');

const Customer = mongoose.model('customers', schemaCustomer);
const Cart = mongoose.model('carts', schemaCart);
const Order = mongoose.model('orders', schemaOrder);
const Product = mongoose.model('products', schemaProduct);

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
}

const orderPlace = async function (req, res) {
    const sessionId = 5555;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const postalCode = req.body.postalCode;

    if (!name) {
      return res.status(400).send("Please provide your name");
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).send("Please provide a valid email");
    }

    if (!phone || !validatePhone(phone)) {
      return res.status(400).send("Please provide a valid phone number");
    }

    if (!address) {
      return res.status(400).send("Please provide your address");
    }

    if (!postalCode) {
      return res.status(400).send("Please provide your postal code");
    }

    try {    
      const cart = await Cart.findOne({cartId: sessionId})
      console.log("Here");

      if (!cart) {
        return res.status(404).send("Your cart is empty!");
      }

      let ordID;

      async function getCountOfOrders() {
        try {
          const count = await Order.countDocuments({});
          console.log("order count", count);
          if (count === 0) {
            return 0;
          } else {
            return count;
          }
        } catch (err) {
          console.log(err);
          throw new Error("Error getting count of orders");
        }
      }

      try {
        ordID = await getCountOfOrders();
      } catch (err) {
        console.log(err);
      }

      console.log("Made it here");
      var prodArr=[];

      const getProductData = async (cart) => {
        console.log("Here next");
        var productArr = [];

        console.log("Error idher nahi hai", productArr);
  
        for (const product of cart.products) {
          const prod = await Product.findOne({ productID: product.productID });
          const prodObj = {
            productID: prod.productID,
            name: prod.name,
            price: prod.price,
            quantity: product.quantity
          };
          console.log("prodObj",prodObj);
          productArr.push(prodObj);
        }
        console.log("Error idher bhi nahi hai",productArr);
        //console.log(productArr);
        return productArr;
      }

     // await prodArr.push(getProductData(cart));
      prodArr = await getProductData(cart);
      console.log("prodArr", prodArr);
      console.log("ordID", ordID);
      

      const order = await Order.create({
        orderID: ordID,
        customerID: req.body.customerID,
        placementDate: Date.now(),
        completeDate: null,
        address: req.body.address,
        postalCode: req.body.postalCode,
        status: "Received",
        total: cart.totalAmount,
        product: prodArr
      })
      console.log("Made it here");      

      return res.send("Order successfully placed!");

    }catch (error) {
      console.log(error);
      return res.status(500).send("It seems there was a server error. Please, try again");
    }
  };
  
  module.exports = orderPlace;