const Order = require("../models/orders_model.js");





module.exports = {
    getOrders:  (req,res) => {
        console.log("yes");
        res.send("orders sending")
    },
}