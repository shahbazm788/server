const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretkey = process.env.SECRET_KEY;



// creating scheema for user registraion
const userRegistorSchema = new mongoose.Schema({
    name:{
        type:String,
        min:5,
        tolowercase:true,
        trim:true,
    },
    email:{
        type:String,
        uniqe:[true,'Email alrady exist'],
      
    },
    password:{
        type:String,
        min: 8,

    },
  
    
    phone:{
        type:Number,
        min:11,
       
    },
    address:{
        type:String,
        min:5,
        tolowercase:true,
        trim:true,
    },
    age:{
        type:Number,
    },
    gander:{
        type: String,
        default:"male"
    },
    userDP:{
        type:String,
        min:6
    },
    role:{
        type:String,
        default:"user",
        required:true
    },

    tokens:[{
        token:{
         type:String,

        }
    }]
});

// userRegistorSchema.pre("save", async function(next){

// })





// creating schema methode for  JWT token 
userRegistorSchema.methods.genreatToken =  async function(next){
    try {
        const userToken = await jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:userToken})
        return userToken;
    } catch (e) {
        console.error('Error', e)
    }
};

const RegistedUser = mongoose.model("RegistedUser",userRegistorSchema);

module.exports =  RegistedUser;