const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const orderSchema = require('../models/orders')
const prodmodel = mongoose.model("product",productSchema)
const ordermodel = mongoose.model("orders",orderSchema)

/*const cancelorder = async (req, res) => {
    const delid = req.params.id;
    try {
      const order = await ordermodel.findOneAndUpdate({orderID: delid}, {status: 'cancel'}, {new: true});
      res.send(order);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating order status');
    }
  };*/
/*  const cancelorder = async (req, res) => {
    const delid = req.params.id;
    try {
      const order = await ordermodel.findOne({ orderID: delid });
      if (order.status === 'completed' || order.status ==='cancelled') {
        res.status(400).send('Order already completed');
        return;
      }
      const updatedOrder = await ordermodel.findOneAndUpdate(
        { orderID: delid },
        { status: 'cancel' },
        { new: true }
      );
      res.send(updatedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating order status');
    }
  };
*/

const admincancelorder = async (req, res) => {
  const delid = req.params.id;
  try {
    const order = await ordermodel.findOne({ orderID: delid });
    if (order.status === 'completed' || order.status ==='cancelled') {
      res.status(400).send('Order already completed/cancelled');
      return;
    }
    const updatedOrder = await ordermodel.findOneAndUpdate(
      { orderID: delid },
      { status: 'cancelled' },
      { new: true }
    );
    for (const item of updatedOrder.product) {
      const { productID, quantity } = item;
      await prodmodel.updateOne(
        { productID },
        { $inc: { available: quantity } }
      );
    }

    res.send(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order status');
  }
};

module.exports = admincancelorder;