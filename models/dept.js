const mongoose = require("mongoose");

var deptable = new mongoose.Schema({
    abcode:{
        type:String,
        required:true
    },
    depname:{
        type:String,
        required:true
    },
    ddesc:{
        type:String,
        required:true
    },
    depcont:{
        type:String,
        required:true
    },
    
    depimage:{
        type:String,
        required:true
    }
    
    });

    const depat = mongoose.model('department_table',deptable);
    module.exports = depat;