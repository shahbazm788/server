const router = require("express").Router();
const productControler = require('../controlse/productsContoler.js');


router.get("/",productControler.getAllProducts);
router.post("/create",productControler.createProduct);
//router.get("/",productControler.getAllProducts);
router.get("/search/:key",productControler.searchProduct);
router.post("/getbycat",productControler.getByCategory);
router.post("/delet",productControler.deletProduct);
router.post("/update",productControler.updateProduct);
// 661a34048ed716cb07723dbc
module.exports = router;