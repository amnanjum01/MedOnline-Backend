const mongoose = require("mongoose");
const express = require("express");
const app = express();


const schemaCustomer = require('../models/customer');
const schemaOrder = require('../models/orders');

const Order = mongoose.model('orders', schemaOrder);


const orderCancel = async function (req, res) {
    const ordID = req.params.id;
    console.log(ordID);
 
    try {    
      const order = await Order.findOne({orderID: ordID})
      console.log(ordID);

      if (!order) {
        return res.status(404).send("Incorrect order ID!");
      }

      if (order.status !== 'Received') {
        return res.status(400).send("There was an error in cancelling the order. Try again, or contact us.")
      }

      if (order.customerID !== req.body.customerID) {
        console.log("incorrect customer id");
        return res.status(400).send("The order cannot be cancelled because of incorrect details.");
      }

      let canceldate= "Cancel requested at " + Date();
      console.log(Date());
      Order.findOneAndUpdate(
        { orderID: ordID}, 
        {status: canceldate },
        { new: true } // return the updated document
      )
      .then(updatedOrder => {
        console.log(updatedOrder);
      })

      return res.send("Your cancel request has been successfully placed!");

    }catch (error) {
      console.log(error);
      return res.status(500).send("It seems there was a server error. Please, try again");
    }
  };
  
  module.exports = orderCancel;