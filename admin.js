const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        username: {             //adminID
            type: String,
            required: true,
            unique: true
        },
        name: String,
        password: {
            type: String,
            required: true,
            minlength: 8
        }
    }
)

module.exports = adminSchema;