const mongoose = require("mongoose");



var gradsinfo = new mongoose.Schema({
       
    name:{
        type:String,
        required:true
    },
    idno:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    certno:{
        type:String,
        required:true
    },
    tittle:{
        type:String,
        required:true
    },
    
    year:{
        type:String,
        required:true
    },
    
    uni:{
        type:String,
        required:true
    }
    ,
    uniid:{
        type:String,
        required:true
    }

 
    
    });

    const info = mongoose.model('grads_info',gradsinfo);
    module.exports = info;