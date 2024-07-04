const express = require("express");
const productRouter = require("./routes/products.js");
const Product = require("./models/product.js");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./auth/routs/userRouter.js");
const adminRouter = require('./admin/admin_router.js');
const reviewRouter = require("./reviews/reviews_router.js");
const catRouter = require("./categories/category_routs.js");
const DB = "mongodb+srv://shahbazm788:wpd.jj.dpw@cluster0.ugwiuxd.mongodb.net/futnitureapp";
const Addusers  = require("./auth/scheema/userRegistorSchema.js");
const Catagory = require("./categories/category_schema.js");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload")

// Use cookie parser middleware to parse cookies


/* 

*/
//dotenv.config();
 mongoose.connect(
   DB,
    { useNewUrlParser: true })
     .then(() => console.log('DB connected'))
     .catch( (error) => error);
     
 app.use(cors({
  credentials: true,
     /* origin:["http://localhost:5173","http://localhost:3000","https://ecom-fawn-seven.vercel.app/","https://dashboard-seven-khaki-73.vercel.app","https://dashboard-git-main-shahbazs-projects-37119fe0.vercel.app","https://dashboard-4o7wn91nl-shahbazs-projects-37119fe0.vercel.app/","https://ecom-8vpvtqst9-shahbazs-projects-37119fe0.vercel.app/","https://ecom-git-main-shahbazs-projects-37119fe0.vercel.app/","https://ecom-gamma-fawn.vercel.app/"],
     */
  origin:"*",
  methods: ["GET", "POST", "PUT", "DELETE"],
       credentials: true,
     
    })
  )
     
  app.use(cookieParser());
     app.use(bodyParser.json({ type: 'application/*+json' }));
    //  app.use(function(req, res, next) {
    //   res.header('Content-Type', 'application/json;charset=UTF-8')
    //   res.header('Access-Control-Allow-Credentials', true)
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept'
    //   )
    //   next()
    // })
    app.use(fileUpload());
  app.use(express.static(__dirname+"/public"));
  //futnitureapp
  // app.use(express.json({limit:"10mb"}))
  app.use(express.json());
  // app.use(express.urlencoded({limit:"10mb", extended:true}));
  app.use(express.urlencoded());
  

app.use("/products",productRouter);
/*
app.use("/review",reviewRouter);
 app.use("/catagory",catRouter);

*/

app.use("/user",userRouter);
app.use('/admin', adminRouter);
//app.post("/user/create",(req,res) =>{
//  console.log(req.body)
//});
  app.get("/", (req, res) => {
    console.log("geting")
    res.send("wellcom");
});




app.post("/addpost", async (req,res) => {
  console.log(req.body)
//  console.log(req.files.file);
  //console.log(req.files.file.name);
  
 const files = req.files.file.name;
  const newProduct = new Product(
 { title:req.body.title,
 category:req.body.category,
 sub_category:req.body.sub_category,
    supplier:req.body.supplier,
    imageUrl:files,
    price:req.body.price,
    description:req.body.content,
    product_location:req.body.product_location }
      );
    const result =   await newProduct.save();
    if(result){
      res.status(200).json("Prduct Created Successfully");
      console.log('res');
    }
    else{
      console.log("eror comse")
    }
    
    

})

//geting all products
app.get("/products",  async (req,res) => {
    try{
      const products = await Product.find().sort({createdAt:-1});
      res.status(200).json(products);
      console.log(products)
    }
    catch(error){
      res.status(500).json("filed to get products")
    }
  } );


// Get products by search
app.get("/search/:key", async (req,res) => {
  console.log(req.body)
 try{
    const result = await Product.aggregate(
      [
{
  $search: {
    index: "fur",
    text: {
      query: req.params.key,
      path: {
        wildcard: "*"
      }
    }
  }
}
]
      );
      res.status(200).json(result);
      console.log(result)
  }
  catch(error){
    res.status(500).json("not found");
  }
});

//geting by catagoryy

app.post("/getbycat",async (req,res) => {
  const catName = req.body.catName;
  //console.log(catName)
  try{
    const result = await Product.find({"category":catName});
    res.send(result);
  }
  catch(err){
    console.log(err)
  }
});


app.get("/catagory",async (req,res) => {
    const allCat = await Catagory.find();
    allCat ? res.send(allCat): res.send("no catagory found");
  });
app.post("/products/getbycat",async (req,res) => {
    const catName = req.body.catName;
    //console.log(catName)
    try{
      const result = await Product.find({"category":catName});
      res.send(result);
    }
    catch(err){
      console.log(err)
    }
  })






app.post("/reguser",async (req,res) => {
  // console.log(req.body);
  //  res.json("ok");
        try {
        const newUser =  new Addusers(req.body);
        const token = await newUser.genrateToken();
        const result = await newUser.save();
        // console.log(token)
        res.cookie("front_jwt",token,{
            withCredentials: true,
            httpOnly: false,
          });
        res.send(result);
     
        console.log(result);
    } catch (e) {
        console.error('Error', e)
    }
  });


  app.post("/login",async (req,res,next) => {
    const {email,password} = req.body;
   // const data = await Addusers.find();
    //const getData = await Addusers.findOne({email:email});
   // console.log(getData)
   try{
      const getData = await Addusers.findOne({email:email});
     // const _id = getData._id;
       const userPass = getData.password;
            if(getData != null && userPass === password){
              const _id = getData._id;
              const updatedUser = await Addusers.findOneAndUpdate({_id},{$set:{
                   login:true
               }},{
                   new:true
               })
       /*     const token = getData.tokens.token;
              res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });*/
             res.json(updatedUser);
             console.log(updatedUser);
            }
        
    }
    catch(err){
      console.log(err)
    }
    
  });




app.post("/uploadimg",(req,res) => {
  console.log(req.body)
})
app.listen(process.env.PORT,() => {
  console.log("connected");
}) 










































// const express = require("express");
// const app = express()
// const PORT = 8000

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.get('/about', (req, res) => {
//   res.send('About route 🎉 ')
// })

// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// })
