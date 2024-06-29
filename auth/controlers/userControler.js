const RegistedUser = require("../scheema/userRegistorSchema.js");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uploadImgFunction = require('../uplodeimg.js');
const path=require('path');
//const cookies = require("cookie-parser");
let oneStepBack=path.join(__dirname,'../../public');
const cookies = require("cookie-parser");
 //const bcrypt = require('bcrypt');
const bcrypt = require("bcryptjs")



const hashPass = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 8)
  return hashedPassword;
  
}


module.exports={
	//************** creating user ************* 
	createUser : async  (req,res,next) => {
   
    //going to  ../../db/schemas/userregistor path for function called below
    //  console.log(req.body)
    //  console.log(req.files.file);
     // const file = req.files.file;
     // const userDP = req.files.file.name;
     // const uploade_path = oneStepBack +"/" + userDP;
  

     if(req.body.password === req.body.c_password){
            const user =  new RegistedUser({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    phone:req.body.phone,
                    address:req.body.address
                //    age:req.body.age,
                   // gander:req.body.gander,
                    // userDP:userDP
            });
            const token = await user.genreatToken();
            const result = await user.save();
        
             // sending respons to clinte if result true
             if(result){
                // await file.mv(uploade_path,err => {
                //     if(err){
                //         console.log(err)
                //      }
                // })
           console.log(result)
           cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });
             console.log(cokie);
              res.json(result);
             }
             else{
               console.log("nothing")
             }
             
           
      
       // const user =  new RegistedUser({
       //              name:req.body.name,
       //              email:req.body.email,
       //              password:req.body.password,
       //              phone:req.body.phone,
       //              age:req.body.age,
       //              gander:req.body.gander,
       //              userDP:userDP
       //      });
       //      const token = await user.genreatToken();
       //      const result = await user.save();
        
       //       // sending respons to clinte if result true
       //       if(result){
       //          await file.mv(uploade_path,err => {
       //              if(err){
       //                  console.log(err)
       //               }
       //          })
       //        res.json(true);
             }
     },




      /************ Login User ************/
	loginUser : async (req,res,next) =>   {
    const {email,password} = req.body;
    const userInfo = await RegistedUser.findOne({"email":email});
    if(userInfo){
      const token = await userInfo.genreatToken();
             //updating user token
     const updatetUser = await RegistedUser.findOneAndUpdate({"email":email},{$set:{
                   tokens: {token}
               }},{
                   new:true
               })
        
       /*      res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });*/
            res.cookie('jwt',token,{
              withCredentials: true,
             })
          

        
         console.log(updatetUser);
        // console.log(cokie);
     res.send(updatetUser);
      
    }
    else{
      console.log("user not found");
      res.json("user Not Found")
    }
    
	},
getUser : async (req,res) => {
    const jwtToken = req.cookies;
  //  const userId =  jwt.decode(jwtToken);
 //   const userInfo = await RegistedUser.findOne({_id:userId._id});
    // console.log(userInfo)
     console.log(jwtToken)
  //  res.send(userInfo)
},
getAllUsers: async (req,res) => {
  if(!req.cookies.jwt){
      console.log("idantification false")
    }
    else{
  const users = await RegistedUser.find();
    res.status(200).json(users)
    }
},

}
