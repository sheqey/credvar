const mongoose = require("mongoose")


var appoint =new mongoose.Schema({

    abcode:{
        type:String,
        required:true
    },
    pname:{
        type:String,
        required:true
    },
    pphone:{
        type:String,
        required:true
    },
    pemail:{
        type:String,
        required:true
    },
    pdate:{
        type:String,
        required:true
    },
    pcode:{
        type:String,
        required:true
    },
    
    dep:{
        type:String,
        required:true
    },
    appdate: {
        type: String,
        default: "pending..."
 },
 appdoc: {
        type: String,
        default: "pending..."
   }
    
    



});


const apoint = mongoose.model('appointments_table',appoint);
module.exports = apoint;