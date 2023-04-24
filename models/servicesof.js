const mongoose = require("mongoose");

var servicetable = new mongoose.Schema({
    abcode:{
        type:String,
        required:true
    },
   
    sname:{
        type:String,
        required:true
    },
    
    sdesc:{
        type:String,
        required:true
    }
    
    });

    const serv = mongoose.model('services',servicetable);
    module.exports = serv;