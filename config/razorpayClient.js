const Razorpay = require('razorpay');

const razorpay_key_id = "rzp_test_ybIQO1FU15dZWH";
const razorpay_key_secret = "mqxflD8S9ITCK3OPHkMFDYVM";

const razorpay = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_key_secret,
});

module.exports = razorpay;
