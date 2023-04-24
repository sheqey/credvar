const mongoose = require("mongoose");

var contacttable = new mongoose.Schema({
    abcode:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    
    adress:{
        type:String,
        required:true
    }
    
    });

    const contact = mongoose.model('contacts_table',contacttable);
    module.exports = contact;