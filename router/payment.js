const express = require("express");
const router = express.Router();
const { stripeCheckout, findSession } = require('../controllers/paymentController');

router.route("/create-checkout-session").post(stripeCheckout)
router.route("/order-session").get(findSession);

module.exports = router;