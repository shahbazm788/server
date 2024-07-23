const Order = require("../models/orders_model.js");





module.exports = {
    getOrders:  (req,res) => {
        // console.log("yes");
        res.send("orders sending")
    },
    submitOrder :  (req,res) => {
       // console.log(req.body)
        const newOrder = new Order({
            user_id : req.body.user_id,
            user_name:req.body.user_name,
            user_email:req.body.user_email,
            user_phone:req.body.user_phone,
            user_address:req.body.user_address,
            orderd_products : req.body.orderd_products,
            payment_status: req.body.payment_status,
            totalAmount: req.body.totalAmount,
            orderd_at : new Date(),
        
        });
        console.log(newOrder);
        res.send("ok")
    }
}

