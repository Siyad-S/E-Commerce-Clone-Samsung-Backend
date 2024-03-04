const express = require("express");
const router = express.Router();
const fileUpload = require("../config/multerConfig")
const {
    getSubCategories,
    postSubCategory,
    updateSubCategory,
    deleteSubCategory,
    // getSubCategory
} = require("../controllers/subCategoryController");

router.route("/").get(getSubCategories);
router.post("/", fileUpload.single('file'), postSubCategory);
router.put('/:id', fileUpload.single('file'), updateSubCategory);
router.route("/:id").delete(deleteSubCategory)
// .get(getSubCategory);

module.exports = router;
