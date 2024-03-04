const mongoose = require("mongoose");
const cartModel = mongoose.Schema({
    product_id: {
        type: String,
        required: true
    }
});

const cartCollection = new mongoose.model("cart", cartModel);
module.exports = cartCollection;