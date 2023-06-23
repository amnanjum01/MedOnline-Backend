const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

const productSchema = require('../models/product');
const prodmodel = mongoose.model("product",productSchema)

const deletemed = async(req,res) => {
try{
const productID = req.params.id;
const result = await prodmodel.findOneAndDelete({productID:productID});
if(!result) {
return res.status(404).send("Product not found");
}

else{
    res.send("Product deleted successfully")
};
}
catch(error){
console.log(error);
res.status(500).send(error);
}
}

module.exports = deletemed;