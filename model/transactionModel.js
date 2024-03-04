const mongoose = require("mongoose");

const transaction = new mongoose.Schema ({
    transactionId : {
        type: String
    },
    transactionAmount : {
        type: String
    },
})

module.exports = mongoose.model ('transaction', transaction);