const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId},
    user_name:{type: String},
    user_email:{type: String},
    user_phone:{type: String},
    user_address:{type: String},
    orderd_products : [{
        productId : mongoose.Schema.Types.ObjectId,
        productTitle: String,
        qt: Number,
        productPrice: Number,
    }],
    order_status: {type : String, defalt:"pendding"},
    payment_status: {type : String},
    orderd_at : {type:String},


});






module.exports = mongoose.model("Order", orderSchema);
