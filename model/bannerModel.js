const mongoose = require("mongoose")
const bannerShcema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const bannerColletion = mongoose.model("banner", bannerShcema)
module.exports = bannerColletion