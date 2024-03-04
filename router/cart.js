const express = require("express");
const router = express.Router();
const {
    getCarts,
    postCart,
    deleteCart
} = require("../controllers/cartController");

router.route("/").get(getCarts).post(postCart);
router.route("/:id").delete(deleteCart);

module.exports = router;