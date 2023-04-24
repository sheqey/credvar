
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const student = require("../models/studentsmodel")
const gradinfo = require("../models/infotable")
const unilogs = require("../models/user")

const axios = require('axios')
const { response } = require("express");
const { Console } = require("console");
const { start } = require("repl");
//const { data } = require("cheerio/lib/api/attributes")
const uniqid = require('uniqid');










exports.index = async (req,res)=>{
  // if (req.session.uid) {
      
  // } else {
   
  //   res.redirect("/login")
  // }


    
          res.render("index")
   
 
}



exports.employerlogin = async (req,res)=>{   
          res.render("employerlogin")
}


exports.employercreate = async (req,res)=>{ 
  res.render("employercreate")
}



exports.institutionlogin = async (req,res)=>{
   
  res.render("institutionlogin")
}


exports.institutioncreate = async (req,res)=>{
   
  res.render("institutioncreate")
}


exports.adminpage = async (req,res)=>{
   const uid = req.session.uid
  const data = await unilogs.findOne({uid:uid});
  const data2 = await gradinfo.find({uniid:uid});
  console.log(uid)
 // console.log(data)
  res.render("tables",{data:data,data2:data2})
}

exports.forgotpassword = async (req,res)=>{
   
  res.render("forgotpassword")
}



exports.table = async (req,res)=>{
   
  const uid = req.session.uid
  const data = await unilogs.findOne({uid:uid});
  const data2 = await gradinfo.find({uniid:uid});
  res.render("tables",{data:data,data2:data2})
}



exports.update2 = async (req,res)=>{
  const uid = req.session.uid
  const data = await unilogs.findOne({uid:uid});
  const data2 = await unilogs.findOne({uid:uid});
  res.render("update2",{data:data,data2:data2})
}



exports.add2 = async (req,res)=>{
   
  const uid = req.session.uid
  const data = await unilogs.findOne({uid:uid});
  res.render("add",{data:data})
}




exports.adit2 = async (req,res)=>{
   
  const encryptionKey = {
    a: "vv",
    b: "4d",
    c: "t8",
    d: "r5",
    e: "lf",
    f: "t9",
    g: "p3",
    h: "p8",
    i: "0f",
    j: "1k",
    k: "h5",
    l: "2s",
    m: "b7",
    n: "q3",
    o: "6a",
    p: "g6",
    q: "8d",
    r: "u4",
    s: "v9",
    t: "7e",
    u: "j6",
    v: "c4",
    w: "y9",
    x: "z4",
    y: "a2",
    z: "s1",
    0: "o2",
    1: "m3",
    2: "n4",
    3: "q5",
    4: "e3",
    5: "f8",
    6: "l9",
    7: "i5",
    8: "r1",
    9: "k2"
  };
  
  // Decryption key object
  const decryptionKey = Object.fromEntries(
    Object.entries(encryptionKey).map(([key, value]) => [value, key])
  );
  
  // Encryption function
  function encrypt(input) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const char = input[i].toLowerCase();
      if (encryptionKey[char]) {
        result += encryptionKey[char];
      } else {
        result += char;
      }
    }
    return result;
  }
  
  // Decryption function
  function decrypt(input) {
    let result = "";
    let i = 0;
    while (i < input.length) {
      const char = input.slice(i, i + 2);
      if (decryptionKey[char]) {
        result += decryptionKey[char];
        i += 2;
      } else {
        result += input[i];
        i++;
      }
    }
    return result;
  }




  const uid = req.session.uid
  const data = await unilogs.findOne({uid:uid});
  const data2 = await gradinfo.find({uniid:uid});


  const decryptedData = data2.map((record) => {
    // decrypt the id and name fields
    console.log(record)
    const decryptedId = decrypt(record.idno);
  
    const decryptedName = decrypt(record.name);
  
    // return the record with the decrypted fields
    return { ...record.toObject(), idno: decryptedId, name: decryptedName };
  });





  res.render("edit",{data:data,data2:decryptedData })
}



// exports.adit2 = async (req,res)=>{
   
//   const uid = req.session.uid
//   const data = await unilogs.findOne({uid:uid});
//   const data2 = await gradinfo.find();
//   res.render("edit",{data:data,data2:data2})
// }


exports.supdate = async (req,res)=>{
   console.log(req.query.id)
  const uid = req.session.uid

  const data = await unilogs.findOne({uid:uid});

 const data2 = await gradinfo.findById(req.query.id);
 console.log(data2)
  res.render("supdate",{data:data,data2:data2})
}


exports.ssupdate = async (req,res)=>{
  var id = req.query.id;
  gradinfo.findByIdAndUpdate(id, req.body)
    .then(
      data => {
        if (!data) {
          return res.status(500).send({ message: `Sorry, we can't find a student with an ID of ${id}` });
        } else {
          res.redirect("/adminpage");
        }
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message || "errrorrr" });
    });
}


exports.sdelete = (req,res)=>{

  var id = req.query.id
  gradinfo.findByIdAndDelete(id)
          .then(data =>{
              
            
              
          })
     
          res.redirect("/adminpage")

}


exports.addins =(req,res)=>{

  // console.log(req.body)
  // console.log(req.file.originalname)
  const newuni = new unilogs({
  
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      phone:req.body.phone,
      image:req.file.originalname,
      uid:uniqid.time().slice(-6)
     
  
  })
  
  newuni
       .save(newuni)
       .then(data =>{ 
  //  console.log(data)
       })
     
       res.redirect("/institutionlogin")
  }
  

  exports.pupdate = async (req,res)=>{
    var id = req.query.id;
    console.log(id)
    console.log(req.body)
    unilogs.findByIdAndUpdate(id, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      image:req.file.originalname
    })
      .then(
        data => {
          if (!data) {
            return res.status(500).send({ message: `Sorry, we can't find a student with an ID of ${id}` });
          } else {
            res.redirect("/adminpage");
          }
        }
      )
      .catch(err => {
        res.status(500).send({ message: err.message || "errrorrr" });
      });
  }




  exports.addgrad =(req,res)=>{

    // console.log(req.body)
    const encryptionKey = {
      a: "vv",
      b: "4d",
      c: "t8",
      d: "r5",
      e: "lf",
      f: "t9",
      g: "p3",
      h: "p8",
      i: "0f",
      j: "1k",
      k: "h5",
      l: "2s",
      m: "b7",
      n: "q3",
      o: "6a",
      p: "g6",
      q: "8d",
      r: "u4",
      s: "v9",
      t: "7e",
      u: "j6",
      v: "c4",
      w: "y9",
      x: "z4",
      y: "a2",
      z: "s1",
      0: "o2",
      1: "m3",
      2: "n4",
      3: "q5",
      4: "e3",
      5: "f8",
      6: "l9",
      7: "i5",
      8: "r1",
      9: "k2"
    };
    
    // Decryption key object
    const decryptionKey = Object.fromEntries(
      Object.entries(encryptionKey).map(([key, value]) => [value, key])
    );
    
    // Encryption function
    function encrypt(input) {
      let result = "";
      for (let i = 0; i < input.length; i++) {
        const char = input[i].toLowerCase();
        if (encryptionKey[char]) {
          result += encryptionKey[char];
        } else {
          result += char;
        }
      }
      return result;
    }

    var name = encrypt(req.body.name)
    var idno = encrypt(req.body.idno)
    const gradinfot = new gradinfo({
    
        name:name,
        idno:idno,
        course:req.body.course,
        certno:req.body.certno,
        tittle:req.body.tittle,
        year:req.body.year,
        uni:req.body.uni,
        uniid:req.session.uid
       
    
    })
    
    gradinfot
         .save(gradinfot)
         .then(data =>{ 
    //  console.log(data)
         })
       
         res.redirect("/adminpage")
    }




    exports.eaddins =(req,res)=>{

      // console.log(req.body)
      // console.log(req.file.originalname)
      const newuni = new unilogs({
      
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          phone:req.body.phone,
          image:req.file.originalname,
          uid:uniqid.time().slice(-6)
         
      
      })
      
      newuni
           .save(newuni)
           .then(data =>{ 
      //  console.log(data)
           })
         
           res.redirect("/employerlogin")
      }
    

      exports.eunilogin = async (req,res)=>{
        console.log("hit login page1")
        console.log(req.body)
       // Find a user with the matching email
       unilogs.findOne({ email: req.body.email }, (err, user) => {
         if (err) {
           // If there is an error, send a 500 status code
           console.log("errrr not found")
         }
     
         if (!user) {
           // If there is no user with the matching email, send a 401 status code
           console.log("not found")
           res.redirect("/employerlogin")
         }
         if(user){
             if (user.password === req.body.password) {
                 console.log('The strings are equal');
                 req.session.uid = user.uid
              
                 res.redirect("/org")
               } else {
                 console.log('The strings are not equal');
                 console.log(user)
                 res.redirect("/employerlogin")
               }
         }
       
         // Compare the provided password with the hashed password in the database
        
       });
     
        
       };
    
  
       exports.org = async (req,res)=>{
   
        const uid = req.session.uid
        const data = await unilogs.findOne({uid:uid});
        const data2 = await gradinfo.find({uniid:uid});
        res.render("search",{data:data,data2:data2})
      }

      exports.search = async (req,res)=>{
   
        const uid = req.session.uid
        const data = await unilogs.findOne({uid:uid});
      
        // data2 now contains an array of all gradinfo records with the same name and id as in req.body
        
        res.render("search",{data:data})
      }



      exports.psearch = async (req,res)=>{
        console.log(req.body)



        const encryptionKey = {
          a: "vv",
          b: "4d",
          c: "t8",
          d: "r5",
          e: "lf",
          f: "t9",
          g: "p3",
          h: "p8",
          i: "0f",
          j: "1k",
          k: "h5",
          l: "2s",
          m: "b7",
          n: "q3",
          o: "6a",
          p: "g6",
          q: "8d",
          r: "u4",
          s: "v9",
          t: "7e",
          u: "j6",
          v: "c4",
          w: "y9",
          x: "z4",
          y: "a2",
          z: "s1",
          0: "o2",
          1: "m3",
          2: "n4",
          3: "q5",
          4: "e3",
          5: "f8",
          6: "l9",
          7: "i5",
          8: "r1",
          9: "k2"
        };
        
        // Decryption key object
        const decryptionKey = Object.fromEntries(
          Object.entries(encryptionKey).map(([key, value]) => [value, key])
        );
        
        // Encryption function
        function encrypt(input) {
          let result = "";
          for (let i = 0; i < input.length; i++) {
            const char = input[i].toLowerCase();
            if (encryptionKey[char]) {
              result += encryptionKey[char];
            } else {
              result += char;
            }
          }
          return result;
        }
        
        // Decryption function
        function decrypt(input) {
          let result = "";
          let i = 0;
          while (i < input.length) {
            const char = input.slice(i, i + 2);
            if (decryptionKey[char]) {
              result += decryptionKey[char];
              i += 2;
            } else {
              result += input[i];
              i++;
            }
          }
          return result;
        }
      
      
      












        const uid = req.session.uid
        const data = await unilogs.findOne({uid:uid});

        const data2 = await gradinfo.find({
          name: { $regex: new RegExp(encrypt(req.body.name), "i") },
          idno: { $regex: new RegExp(encrypt(req.body.id), "i") }
        });
var name = encrypt(req.body.name)
var id = encrypt(req.body.id)
console.log("name    " + name)
console.log("id    " + id)
        console.log(data2)
        res.render("appinfo",{data:data,data2:data2})
      }


  exports.unilogin = async (req,res)=>{
    console.log("hit login page1")
    console.log(req.body)
   // Find a user with the matching email
   unilogs.findOne({ email: req.body.email }, (err, user) => {
     if (err) {
       // If there is an error, send a 500 status code
       console.log("errrr not found")
     }
 
     if (!user) {
       // If there is no user with the matching email, send a 401 status code
       console.log("not found")
       res.redirect("/institutionlogin")
     }
     if(user){
         if (user.password === req.body.password) {
             console.log('The strings are equal');
             req.session.uid = user.uid
          
             res.redirect("/adminpage")
           } else {
             console.log('The strings are not equal');
             console.log(user)
             res.redirect("/institutionlogin")
           }
     }
   
     // Compare the provided password with the hashed password in the database
    
   });
 
    
   };


  exports.ab = async (req,res)=>{
   

  
    
   res.render("aboutu")
   
  };

/////////////////add user///////////////////////////////////////////////////////////////////////
exports.regester =(req,res)=>{
    console.log(req.body)
    console.log(req.file.originalname)
    const newuser = new user({
     
        email:req.body.email,
        password:req.body.password,
        uid:req.body.email, 
        image:req.file.originalname
       
    
    })
    
    newuser
         .save(newuser)
         .then(data =>{ 
     console.log(data)
         })
       
         res.redirect("../login")
    }
/////////////add new docter///////////////////////////////////////////////////////////////////////////

    exports.home = (req,res)=>{

      res.render("home")
  }
  
   

exports.about = (req,res)=>{

  res.render("about")
}


exports.enc = (req,res)=>{

  res.render("enc")
}


exports.logout = (req,res)=>{
// destroy session and redirect to login page
req.session.destroy();
res.redirect("/");

}












/////////constant functions/////////


    
    
  






