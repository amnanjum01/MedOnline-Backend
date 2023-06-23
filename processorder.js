const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const orderSchema = require('../models/orders')
const prodmodel = mongoose.model("product",productSchema)
const ordermodel = mongoose.model("orders",orderSchema)

const processorder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await ordermodel.findOne({ orderID: orderId });
    if (!order) {
      res.status(404).send('Order not found');
      return;
    }
    if (order.status === 'completed') {
      res.send('Order has been completed');
      return;
    } else if (order.status === 'processing') {
      res.send('Order is already being processed');
      return;
    } else if (order.status === 'cancelled') {
      res.send('Order has already been cancelled. We cannot process it.');
      return;
    }
    const updatedOrder = await ordermodel.findOneAndUpdate(
      { orderID: orderId },
      { status: 'processing' },
      { new: true }
    );
    for (const item of updatedOrder.product) {
      const product = await prodmodel.findOne({ productID: item.productID });
      if (product) {
        const newQuantity = product.available - item.quantity;
        await prodmodel.findOneAndUpdate(
          { productID: item.productID },
          { available: newQuantity }
        );
      }
    }
    res.send("Order is now processing.");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order status');
  }
};

module.exports = processorder;
