const express = require("express")
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const adminSchema = require('../models/admin');

adminSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const Admin = mongoose.model('Admin', adminSchema);

const adminLogin = async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send('Invalid username or password.');
  const isMatch = await admin.comparePassword(req.body.password);
  if (!isMatch) return res.status(400).send('Invalid username or password.');
  const token = jwt.sign({ _id: admin._id }, 'secret');
  res.header('x-auth-token', token).send();
};


module.exports = adminLogin;




/*const express = require("express")
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
app.use(express.json())

const adminSchema = require('../models/admin');

adminSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const Admin = mongoose.model("Admin",adminSchema);

const adminlogin = async (req, res) => {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return res.status(400).send('Invalid username or password.');
    const isMatch = await admin.comparePassword(req.body.password);
    if (!isMatch) return res.status(400).send('Invalid username or password.');
    const token = jwt.sign({ _id: admin._id }, 'secret');
    res.send(token);
  };
module.exports = adminlogin*/