const RegistedUser = require("./userRegistorSchema.js");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uploadImgFunction = require('./uplodeimg.js');
const path=require('path');
let oneStepBack=path.join(__dirname,'../public');
 const bcrypt = require('bcrypt');







async function regUser(req,res,next){
    //going to  ../../db/schemas/userregistor path for function called below
    //  console.log(req.body)
    //  console.log(req.files.file);
     const file = req.files.file;
     const userDP = req.files.file.name;
     const uploade_path = oneStepBack +"/" + userDP;
  

     if(req.body.password === req.body.c_password){
        bcrypt.hash(req.body.password,12,async (err,hash) => {
            const user =  new RegistedUser({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash,
                    phone:req.body.phone,
                    age:req.body.age,
                    gander:req.body.gander,
                    userDP:userDP
            });
            const token = await user.genreatToken();
            const result = await user.save();
        
             // sending respons to clinte if result true
             if(result){
                await file.mv(uploade_path,err => {
                    if(err){
                        console.log(err)
                     }
                })
              res.json(true);
             }
           
        })
        
   
     }
}


module.exports = regUser;