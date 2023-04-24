require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 400;
const host = process.env.hostname
const connectdb = require("./database/connection")
const bodyparser =require("body-parser");
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/fonts'));
//app.use(express.json())
app.use(session({
    secret: '99999999999980',
    resave: false,
    saveUninitialized: true
  }));
  
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}));
app
app.set('view engine', 'ejs');    
app.set('/views', __dirname + '/views');
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.set("/views",path.resolve(__dirname,"/views"))




const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// your routes and server setup here






connectdb();
app.use('/',require('./server/routes/routes'))




app.listen(PORT,()=>{

console.log(`server is    listening at http://localhost:${PORT}`);
});
