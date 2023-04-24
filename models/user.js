const mongoose = require("mongoose");

var schoolusers = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
    });

    const user = mongoose.model('unilogs',schoolusers );
    module.exports = user;