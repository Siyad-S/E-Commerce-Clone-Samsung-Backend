const express = require("express");
const router = express.Router();
const uploadImage = require("../config/multerConfig")
const {
    getAllProductCategory,
    getSingleProductCategory,
    postProductCategory,
    updateProductCategory,
    deleteProductCategory
} = require("../controllers/categoryController");

router.route("/").get(getAllProductCategory);
router.post("/", uploadImage.single('file'), postProductCategory);
router.put("/:id", uploadImage.single('file'), updateProductCategory);
router.route("/:id").get(getSingleProductCategory).delete(deleteProductCategory);


module.exports = router;