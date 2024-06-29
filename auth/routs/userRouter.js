const router = require("express").Router();
const userControler = require('../controlers/userControler.js');




router.get("/",userControler.getUser);
router.post("/create",userControler.createUser);
router.post("/login",userControler.loginUser);
router.get("/alluser",userControler.getAllUsers);



module.exports = router;