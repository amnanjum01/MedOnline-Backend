const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productID:{
            type: String,
            required: true,
            unique:true
        },
        manufacturer: {
            type:String,
            required:true
        },
        name: {
            type:String,
            required:true
        },
        drug_family: {
            type:String,
            required:true
        },
        mfgDate: {
            type: Date,
            required: true
        },
        expiryDate:{
            type: Date,
            required: true
        },
        side_effects: {
            type:String,
            required:true
        },
        price: Number,
        description: {
            type:String,
            required:true
        },
        mgs:{
            type:String,
            required:true
        },
        available: {
            type:Number,
            required:true
        },
    }
)

module.exports = productSchema;