const mongoose = require("mongoose");
const orders = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: [],
        required: true
    },
    totalPrice: {
        type: String,
        require: true
    },
    orderDate: {
        type: String,
        required: true
    },
    orderStatus: {
        type: {},
        default: "pending"
    },
    billingAddress: {
        type: {}
    },
    shippingAddress: {
        type: {}
    }
});

const ordersCollection = mongoose.model( "order", orders );
module.exports = ordersCollection;