const mongoose = require("mongoose");

var stdt = new mongoose.Schema({
name:{
    type:String,
    required:true
},
age:{
    type:String,
    required:true
},
major:{
    type:String,
    required:true
}

});



const students = mongoose.model('studentstable',stdt);



module.exports = students;
//module.exports = amenity;
