const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require('express-session');


const Product = mongoose.model('product', require('../models/product'));
const Cart = mongoose.model('carts', require('../models/cart'));

const remove = async function (req, res) {
    //const sessionId = req.sessionID;
    const sessionId = 4444;
    const id=req.params.id 
    const itemAmount= req.params.itemAmount;

    try {
        const product = await Product.findOne({productID: id})
        if (!product) {
            return res.status(404).send("Sorry, product not found!");
        }

        const cart = await Cart.findOne({cartId: sessionId})
        if (!cart) {
            return res.status(404).send("Sorry, your cart is empty!");
        }

        const cartItemIndex = cart.products.findIndex((item) => item.productID === id);
        if (cartItemIndex === -1) {
            return res.status(404).send("Sorry, this product is not in your cart!");
        }

        const cartItem = cart.products[cartItemIndex];
        if (cartItem.quantity < itemAmount) {
            return res.status(400).send("Sorry, you cannot remove more items than you have in your cart!");
        }

       // cart.totalItems -= itemAmount;
        cart.totalAmount -= product.price * itemAmount;
        if (cartItem.quantity > itemAmount) {
            cartItem.quantity -= itemAmount;
        } else {
            cart.products.splice(cartItemIndex, 1);
        }

        if(cart.products.length==0){
        await Cart.findOneAndDelete({cartId: sessionId});
        }

        await cart.save();
        return res.send("Product successfully removed from your cart!");
    } catch (error) {
        console.log(error);
        return res.status(500).send("It seems there was a server error. Please, try again");
    }
};

module.exports = remove;
