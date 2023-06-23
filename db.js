const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())

//mongodb://localhost:27017/

//DB connection
async function connect() {
  try {
    let c = await mongoose.connect('mongodb://127.0.0.1:27017/MedOnline', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connect;


