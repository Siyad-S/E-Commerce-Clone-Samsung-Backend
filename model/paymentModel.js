const mongoose = require('mongoose');
const payment = new mongoose.Schema({
    sessionId: {
        type: String,
        require: true
    },
    orderId: {
        type: String,
        require: true
    },
    paymentStatus: {
        type: String
    }
})

const paymentCollection = mongoose.model("payment", payment)
module.exports = paymentCollection;