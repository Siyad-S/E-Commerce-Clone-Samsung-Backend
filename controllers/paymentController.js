const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const orderCollection = require("../model/orderModel");
const paymentCollection = require("../model/paymentModel");

require('dotenv').config();
const stripe = Stripe("sk_test_51OU4tWSIguEQwhJ5DJFjCeFKHbB20b9Q82maGgluLI2eBTYDzdcfUjYcyYjhuP77KGXAanwCXwPWl5hI0tGz7kI400DLMvtipK");

const stripeCheckout = asyncHandler(async (req, res) => {
  try {
    const { cartData, userId, totalPrice } = req.body;

    const addToOrder = await orderCollection.create({
      userId: userId,
      products: cartData,
      totalPrice: totalPrice,
      orderDate: new Date(),
    });

    console.log("Currently ordered products: ", addToOrder);

    const line_items = cartData.map((items) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: items.product_name,
            // images: items.product_image,
            description: items.description,
            metadata: {
              id: items._id,
            },
          },
          unit_amount: items.price,
        },
        quantity: 1,
      };
    });

    try {
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        billing_address_collection: 'auto',
        success_url: `${process.env.CLIENT_URL}/checkout-success/?id=${addToOrder._id}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });

      res.send({ url: session.url });

      const payments = await paymentCollection.create({
        sessionId: session.id,
        orderId: addToOrder._id,
        paymentStatus: session.payment_status,
      });

      const updateOrderStatus = await orderCollection.findByIdAndUpdate(
        addToOrder._id,
        { orderStatus: "Ordered" },
        { new: true }
      );

      console.log("updatedOrder: ", updateOrderStatus);
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).json({ error: "Failed to create payment session" });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const findSession = async (req, res) => {
  try {
    const { orderId } = req.query;
    const sessionDetails = await paymentCollection.findOne({ orderId });
    console.log("sessionDetails: ", sessionDetails);
    if (!sessionDetails) {
      res.status(400).json({ message: "Find by orderId for session not successful" });
    } else {
      const paymentDetails = await stripe.checkout.sessions.retrieve(sessionDetails.sessionId);
      if (!paymentDetails) {
        res.status(400).json({ message: "Payment details finding failed" });
      } else {
        const paymentData = { ...paymentDetails };
        const updatePaymentStatus = await paymentCollection.findByIdAndUpdate(sessionDetails._id, { paymentStatus: "Completed" }, { new: true });
        console.log("updatedPayment :", updatePaymentStatus);
        res.status(200).json({ message: "Payment details successfully retrieved", paymentDetails });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  stripeCheckout,
  findSession
};