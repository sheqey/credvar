const mongoose = require("mongoose");

var doptable = new mongoose.Schema({
    abcode:{
        type:String,
        required:true
    },
    docname:{
        type:String,
        required:true
    },
    docdesc:{
        type:String,
        required:true
    },
    docimage:{
        type:String,
        required:true
    },
    
    docdep:{
        type:String,
        required:true
    }
    
    });

    const doc = mongoose.model('docters_table',doptable);
    module.exports = doc;