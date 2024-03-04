const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    singleGetOrder,
    placeOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

router.route("/").get(getAllOrders);
router.route("/:amount/:currency/:receipt").post(placeOrder);
router.route("/:id").get(singleGetOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;