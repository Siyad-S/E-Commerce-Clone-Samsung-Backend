const mongoose = require("mongoose");
const user = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{}],

  token: {
    type: String,
    default: null,
  },
});

const userCollection = mongoose.model("user", user);
module.exports = userCollection;
