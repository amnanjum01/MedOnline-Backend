const mongoose = require("mongoose");
const express = require("express");
const app = express();


const schemaProduct = require('../models/product');
const schemaCart = require('../models/cart');

const Product = mongoose.model('products', schemaProduct);
const Cart = mongoose.model('carts', schemaCart);


const add = async function (req, res) {
    const id=req.params.id 
    const itemAmount= req.params.itemAmount;
    const sessionId=6666;
    
    let price=0;
  
    try {
      const product = await Product.findOne({productID: id})
      if (!product) {
        return res.status(404).send("Sorry, product not found!");
      }
      
      if(product.available>=itemAmount){
      const cartItem = {
        productID: id,
        quantity: itemAmount
      };

      if(itemAmount>5){
        return res.send("Sorry, cannot have more than 5 items!");
      }
    
      const cart = await Cart.findOne({cartId: sessionId})

        if (!cart) {
             await Cart.create({
                cartId: sessionId,
                products: [cartItem],
                totalItems: itemAmount,
                totalAmount: product.price * itemAmount
            });
            console.log('Cart created for current session id');
        }
        else{
          //var prod=[];
          //prod.push(cart.products);
          //prod.push(cartItem);
          //var count

          //for (const product of cart.products) {

            //const prodObj = {
              //productID: prod.productID,
              //name: prod.name,
              //quantity: product.quantity,
              //price: prod.price
            //};
            //productArr.push(prodObj);
          //}

         // Cart.create({
           // cartId: sessionId,
           // products: [prod],
            //totalItems: itemAmount,
            //totalAmount: product.price * itemAmount
         // })
         //console.log(cart.totalItems);
         //console.log(itemAmount);
         //console.log(cart);
          //cart.totalItems= cart.totalItems+ itemAmount;


          //new code starts here
          const prodIDS=[];
          for (const prod of cart.products) {
            prodIDS.push(prod.productID);
          }
          if(prodIDS.includes(id)){
            Cart.findOneAndUpdate(
              { cartId: sessionId, 'products.productID': id }, // find the cart document with the given cartId and a product with productID equal to '300'
              {  $inc: { 'products.$.quantity': itemAmount,
              totalAmount: product.price * itemAmount
             } }, // update the quantity of the matching product to 10
              { new: true } // return the updated document
            )
            .then(updatedCart => {
              console.log(updatedCart);
            })
          }
          else{
            const newProductArray = [...cart.products, cartItem];
            cart.products = newProductArray;
            cart.totalAmount= cart.totalAmount+(product.price* itemAmount);
          }
          

          //ends here

           // const newProductArray = [...cart.products, cartItem];
            //cart.products = newProductArray;
            //cart.totalAmount= cart.totalAmount+(product.price* itemAmount);
            

            await cart.save();
            console.log('Cart updated');
        }
        return res.send("Product successfuly added to your cart!");
      } 
      else{
        return res.send("Product is out of stock right now!");
      }
    }catch (error) {
      console.log(error);
      return res.status(500).send("It seems there was a server error. Please, try again");
    }
  };
  
  module.exports = add;