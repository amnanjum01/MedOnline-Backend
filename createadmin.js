const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const adminSchema = require('../models/admin');

const Admin = mongoose.model('Admin', adminSchema);

const createadmin =async(req,res)=>{
  console.log("Inside post function");
  const { username, name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    username,
    name,
    password: hashedPassword
  });

  const val = await newAdmin.save();
  res.json(val);
};

module.exports = createadmin
//23154