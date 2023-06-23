const express = require('express');
const connectDB = require("./db");
const mongoose = require('mongoose');
const router = require("./router");
const cookieParser = require('cookie-parser');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.use('/', router);
const PORT = 3001;

connectDB()
.then(() => {
    app.listen(PORT, ()=>{
        console.log('Server is on port  ${PORT}');
    })
})
.catch(err => {
    console.log(err)
})

