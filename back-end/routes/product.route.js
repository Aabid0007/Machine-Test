 const express = require("express");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
 const router = express.Router();
 
 router.route("/").get(getProducts);
 router.route("/").post(createProduct);
 router.route("/:id").get(getProduct);
 router.route("/:id").put(updateProduct);
 router.route("/:id").delete(deleteProduct);
 
 
 module.exports = router;