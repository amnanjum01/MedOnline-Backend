const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        orderID:{
            type: Number,
            required: true,
            unique: true
        },
        customerID: Number,
        placementDate: {
            type: Date,
            default: Date.now()
        },
        completeDate: Date,
        address: String,
        postalCode: Number,
        status: String,
        total: Number,
        product:[{
            productID: {
                type: String,
                required: true,
            },
            name: String,
            price: Number,
            quantity: Number
        }]
    }
)

module.exports = ordersSchema;