const RegistedAdmin = require("./admin_scheema.js");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path=require('path');
let oneStepBack=path.join(__dirname,'../public');
 const bcrypt = require('bcryptjs');
const fileUplode = require('express-fileupload');



module.exports = {
  createAdmin : async (req,res,next) => {
    
    console.log(req.body)
    console.log(req.files.file)
  //going to  ../../db/schemas/userregistor path for function called below
    //  console.log(req.body)
    //  console.log(req.files.file);
     const file = req.files.file;
     const userDP = req.files.file.name;
     const uploade_path = oneStepBack +"/img/" + userDP;
  

     if(req.body.password === req.body.c_password){
        bcrypt.hash(req.body.password,12,async (err,hash) => {
            const user =  new RegistedAdmin({
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
              console.log(result)
             }
           
        })
        
   
     }
},
loginAdmin: async (req,res,next) => {

      if(req.cookies.jwt){

          res.cookie("jwt", req.cookies.jwt, {
               withCredentials: true,
               httpOnly: false,
             });
        res.send({"jwt":req.cookies.jwt})

    }
else{

    // destructring req.body object
    const {email,password} = req.body;
       // console.log(req.cookies)
    try {
        // fiding user by emaill
        const getData = await RegistedAdmin.findOne({email:email});
        //geting user id
        const _id = getData._id;
        const userPass = getData.password;

     bcrypt.compare(password,userPass, async ( err,result) => {
        if(result){
               //genrating jwt token
               const token = await  getData.genreatToken();

               //updating user token
               const updatetUser = await RegistedAdmin.findOneAndUpdate({_id},{$set:{
                   tokens: {token}
               }},{
                   new:true
               })

               // sending token with cookeis to browser
               if(updatetUser){
           res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });
           // sending respons to clinte side
           res.json(updatetUser)
            console.log(updatetUser);
          }
        }
        else{
            res.send('login failed')
        }
     })

    } catch (e) {
        console.error('Error', e)
    }
}

}
}

/*


    if(req.cookies.jwt){

          res.cookie("jwt", req.cookies.jwt, {
               withCredentials: true,
               httpOnly: false,
             });
        res.send({"jwt":req.cookies.jwt})

    }
else{

    // destructring req.body object
    const {email,password} = req.body;
       // console.log(req.cookies)
    try {
        // fiding user by emaill
        const getData = await RegistedUser.findOne({email:email});
        //geting user id
        const _id = getData._id;
        const userPass = getData.password;

     bcrypt.compare(password,userPass, async ( err,result) => {
        if(result){
               //genrating jwt token
               const token = await  getData.genreatToken();

               //updating user token
               const updatetUser = await RegistedUser.findOneAndUpdate({_id},{$set:{
                   tokens: {token}
               }},{
                   new:true
               })

               // sending token with cookeis to browser
           res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });
           // sending respons to clinte side
           res.json(updatetUser)
            console.log(updateUser);
        }
        else{
            res.send('login failed')
        }
     })

    } catch (e) {
        console.error('Error', e)
    }
}


*/

/*
async function regAdmin(req,res,next){
    //going to  ../../db/schemas/userregistor path for function called below
    //  console.log(req.body)
    //  console.log(req.files.file);
     const file = req.files.file;
     const userDP = req.files.file.name;
     const uploade_path = oneStepBack +"/img/" + userDP;
  

     if(req.body.password === req.body.c_password){
        bcrypt.hash(req.body.password,12,async (err,hash) => {
            const user =  new RegistedAdmin({
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
*/

