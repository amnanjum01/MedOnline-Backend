const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const customerSchema = new mongoose.Schema(
    {
        customerID: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true},
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/
        },
        password: {
            type: String,
            minlength: 8,
            required: true        
        },
        phone: {
            type: Number,
            required: true,
            minlength: 11,
            maxlength:11
        },
        address: {
            type: String,
            required: true
        },
        postalCode: Number,
        dob:{
            type: Date,
            //required: true,
            validate: {
                validator: function(value) {
                  const currentYear = new Date().getFullYear();
                  const birthYear = currentYear - value;
                  return birthYear >= 18;
                },
                message: 'User must be over 18 years old'}
        },
        orderID: Number
}
)

module.exports = customerSchema;