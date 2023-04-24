
const express = require("express")


const rout = express.Router();


const services = require("../render")

rout.get("/", services.index);
rout.get("/adminpage", services.adminpage);
rout.get("/employerlogin", services.employerlogin);
rout.get("/employercreate", services.employercreate);


rout.get("/institutionlogin", services.institutionlogin);
rout.get("/institutioncreate", services.institutioncreate);
// rout.post("/addins", services.addins);


rout.get("/forgotpassword", services.forgotpassword);


rout.get("/table", services.table);
rout.get("/update", services.update2);
rout.get("/add", services.add2);

rout.get("/search", services.search);




rout.post("/psearch", services.psearch);

rout.get("/about", services.ab);


rout.get("/edit", services.adit2);       

rout.get("/supdate", services.supdate); 
rout.post("/ssupdate", services.ssupdate); 
// rout.post("/pupdate", services.pupdate); 
rout.get("/sdelete", services.sdelete); 


rout.get("/logout", services.logout);

rout.get("/org", services.org);

rout.post("/unilogin", services.unilogin);
rout.post("/eunilogin", services.eunilogin);


rout.post("/addgrad", services.addgrad);



rout.get("/enc", services.enc);








const path = require("path");

const multer = require('multer');
const folderPath = path.resolve('images/images');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folderPath); // specify the destination folder for the uploaded files
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // use the original file name as the name for the saved file
  }
});

const upload = multer({ storage: storage });

rout.post("/addins",upload.single('image'), services.addins);
rout.post("/eaddins",upload.single('image'), services.eaddins);

rout.post("/pupdate",upload.single('image'), services.pupdate); 



rout.post("/regester",upload.single('image'), services.regester);
module.exports = rout;