const router = require("express").Router();
const orderControler = require("../controlse/orderControler.js");




router.get("/",orderControler.getOrders);










module.exports = router;