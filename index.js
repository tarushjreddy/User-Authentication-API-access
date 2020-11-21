const express = require('express');
const app = express();
const authRoute = require('./routes/auth.js')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const postroute = require('./routes/post.js');

dotenv.config();
mongoose.connect(process.env.DATABASE_CONNECT,() =>
   
    console.log("connected to the database")
);

app.use(express.json());

app.use('/api/user', authRoute );

app.use('/api/post', postroute );

app.listen(3000, () =>{
    console.log("hey sexy")
});