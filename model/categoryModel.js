const mongoose = require("mongoose");
const productCategory = new mongoose.Schema({
    category: {
        type: String,
    },
    category_image: {
        type:String
    },
    deleted: {
        type: Boolean,
        default: false
      }

});

const productCategoryData = mongoose.model('category', productCategory);
module.exports = productCategoryData;