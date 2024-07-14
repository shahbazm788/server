const router = require("express").Router();
const orderControler = require("../controlse/orderControler.js");




router.get("/",orderControler.getOrders);
router.post("/submitorder", orderControler.submitOrder);









module.exports = router;