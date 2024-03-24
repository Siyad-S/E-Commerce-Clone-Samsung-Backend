const express = require("express");
const router = express.Router();
const uploadFiles = require("../config/multerConfig");
const {
    getAllProducts,
    singleGetProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    getSearched
} = require("../controllers/productController");


router.route("/").get(getAllProducts);
router.route("/searched").get(getSearched)
router.post("/", uploadFiles.array("files", 10), postProduct);
router.put("/:id", uploadFiles.array("files", 10), updateProduct);
router.route("/:id").get(singleGetProduct).delete(deleteProduct);


module.exports = router;