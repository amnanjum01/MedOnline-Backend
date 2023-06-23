/*const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const prodmodel = mongoose.model("product",productSchema)

const addmed = async(req,res)=>{
    console.log("Inside post function");

    if(!req.body || Object.keys(req.body).length === 0){
        res.status(400).send("Request body cannot be empty");
        return;
    }
    const data = new prodmodel({
        productID:req.body.productID,
        manufacturer:req.body.manufacturer,
        name:req.body.name,
        drug_family:req.body.drug_family,
        mfgDate:req.body.mfgDate,
        expiryDate:req.body.expiryDate,
        side_effects:req.body.side_effects,
        price:req.body.price,
        description:req.body.description,
        mgs:req.body.mgs,
        available:req.body.available
    })

    const val = await data.save();
    res.json(val);
} 

module.exports = addmed;*/


const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const prodmodel = mongoose.model("product",productSchema)

const addmed = async (req, res) => {
  console.log("Inside post function");

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send("Request body cannot be empty");
    return;
  }

  if (!req.body.productID) {
    res.status(400).send("Please provide product ID");
    return;
  }

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}$/;
  if (!regex.test(req.body.mfgDate) || !regex.test(req.body.expiryDate)) {
    res.status(400).send("Dates should be in the format: YYYY-MM-DDTHH:MM:SS.sssZ");
    return;
  }

  const requiredFields = ['manufacturer', 'name', 'drug_family', 'mfgDate', 'expiryDate', 'side_effects', 'price', 'description', 'mgs', 'available'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(400).send("All fields are required");
    return;
  }

  const data = new prodmodel({
    productID: req.body.productID,
    manufacturer: req.body.manufacturer,
    name: req.body.name,
    drug_family: req.body.drug_family,
    mfgDate: req.body.mfgDate,
    expiryDate: req.body.expiryDate,
    side_effects: req.body.side_effects,
    price: req.body.price,
    description: req.body.description,
    mgs: req.body.mgs,
    available: req.body.available,
  });

  const val = await data.save();
  res.json(val);
};

module.exports = addmed;
