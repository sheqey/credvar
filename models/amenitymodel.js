const mongoose = require("mongoose");

var ameniti = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    abcode:{
        type:String,
        required:true
    },
    atcode:{
        type:String,
        required:true
    },
    aname:{
        type:String,
        required:true
    },
    alonglat:{
        type:String,
        required:true
    },
    adesc:{
        type:String,
        required:true
    },
    aimage:{
        type:String,
        required:true
    }
    
    });

    const amenity = mongoose.model('amenities_table',ameniti);
    module.exports = amenity;