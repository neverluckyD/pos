var express = require("express");
const ProductController = require("../controllers/ProductController");

var router = express.Router();

router.get("/", ProductController.ProductList);
router.get("/:id", ProductController.ProductDetail);
router.post("/", ProductController.addProduct);
router.put("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;