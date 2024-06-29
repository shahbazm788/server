
const router = require("express").Router();

const adminControler = require("./admin_controler.js");


router.post("/create",adminControler.createAdmin);
router.post("/login",adminControler.loginAdmin);


module.exports = router;