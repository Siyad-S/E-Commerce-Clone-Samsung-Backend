const mongoose = require("mongoose");
const subCategoryModel = mongoose.Schema({
    subCategoryName: {
        type: String
    },
    mainCategoryId: {
        type: String
    },
    subCategory_image: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
});

const subCategory = mongoose.model( "sub-category", subCategoryModel);
module.exports = subCategory;