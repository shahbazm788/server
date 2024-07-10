const Product = require("../models/product.js");
const path = require('path');
let oneStepBack = path.join(__dirname,'../public');
const fileUplode = require('express-fileupload');

const uploadImgFunction = async (file,path) => {
  return  await file.mv(path,err => {
        if(err){
            console.log(err)
         }
    })
}

module.exports={
  createProduct: async (req,res) => {
  /*  if(!req.cookies.jwt){
      console.log("idantification false")
    }
    else{*/
  //  console.log(req.cookies)
    const  file = req.files.file;
        const product_img = req.files.file.name;
    const uploade_path = oneStepBack +"/img/" + product_img;
  const newProduct = new Product(
 { title:req.body.title,
 category:req.body.category,
 sub_category:req.body.sub_category,
    supplier:req.body.supplier,
    imageUrl:product_img,
    price:req.body.price,
    description:req.body.content,
    product_location:req.body.product_location }
      );
    const result =   await newProduct.save();
    if(result){
          const uplodedImg =  uploadImgFunction(file,uploade_path);
      res.status(200).json("Prduct Created Successfully");
      console.log(result);
    }
    else{
      console.log("eror comse")
    }
  //}

  },
  updateProduct: async (req,res) => {
    if(!req.cookies.jwt){
      console.log("idantification false")
    }
    else{
  //  console.log(req.cookies)
     const filter = {"_id":req.body._id};
     
     if(req.files){
       const  file = req.files.file;
        const product_img = req.files.file.name;
    const uploade_path = oneStepBack +"/img/" + product_img;
    const result = await Product.findOneAndUpdate(filter, { title:req.body.title,
     category:req.body.category,
     sub_category:req.body.sub_category,
    supplier:req.body.supplier,
    imageUrl:product_img,
    price:req.body.price,
    description:req.body.content,
    product_location:req.body.product_location });
            if(result){
          const uplodedImg =  uploadImgFunction(file,uploade_path);
      res.status(200).json("Prduct Created Successfully");
      console.log(result);
        }
        else{
          res.status(500).json("updating feiled");
       
       }
     }
     else{
       const result = await Product.findOneAndUpdate(filter, { title:req.body.title,
     category:req.body.category,
     sub_category:req.body.sub_category,
    supplier:req.body.supplier,
    imageUrl:req.body.imageUrl,
    price:req.body.price,
    description:req.body.content,
    product_location:req.body.product_location })
              if(result){
  
      res.status(200).json("Prduct Created Successfully");
      console.log(result);
      }
       else{
         res.status(500).json("updating feiled");
        }
       
       
     }

  }
  },
  getAllProducts : async (req,res) => {
    try{
      const products = await Product.find().sort({createdAt:-1});
      res.status(200).json(products);
      console.log(products)
    }
    catch(error){
      res.status(500).json("filed to get products")
    }
  },
  getOneProduct : async (req,res) => {
    try{
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    }
    catch(error){
      res.status(500).json("filed to get product")
    }
  },
  searchProduct: async (req,res) => {
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
  },
  getByCategory: async (req,res) => {
    const catName = req.body.catName;
    //console.log(catName)
    try{
      const result = await Product.find({"category":catName});
      res.send(result);
    }
    catch(err){
      console.log(err)
    }
  },
  deletProduct : async (req,res) => {
   
    if(req.cookies.jwt){
     const pro =  await Product.findByIdAndDelete(req.body.id)
   
       if(pro){
        res.status(200).json("Product deleted sucsesfully")
        console.log('deleted')
       }
       else{
         res.status(500).json("Product not deleted")
       }
    }
  }
}
