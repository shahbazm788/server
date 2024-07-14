const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId},
    user_name:{type: String, require :true},
    user_email:{type: String},
    user_phone:{type: String},
    user_address:{type: String, require :true},
    orderd_products : [{
        product_id : mongoose.Schema.Types.ObjectId,
        qty: Number,
        produt_price: Number,
        required:true,
    }],
    order_status: {type : String, defalt:"pendding"},
    payment_status: {type : String},
    orderd_at : {type:String,required:true},
    

});






module.exports = mongoose.model("Order", orderSchema);
