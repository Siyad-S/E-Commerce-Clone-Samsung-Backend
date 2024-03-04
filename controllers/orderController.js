const asyncHandler = require("express-async-handler");
const orders = require("../model/orderModel");

//get all orders
const getAllOrders = asyncHandler( async (req, res) => {
    const allOrders = await orders.find();
    if(!allOrders) {
        res.status(404).json({message: "Error occured during getting all products"});
    } else {
        res.status(200).json({message: "All products are gotten successfully", allOrders});
    }
});

//single get for order
const singleGetOrder = asyncHandler( async (req, res) => {
    console.log("id for order single get: ",req.params.id);
    const getSingleOrder = await orders.findById(req.params.id);
    console.log("singleOrder: ",getSingleOrder);
    if (!getSingleOrder) {
        res.status(404).json({message: "Error occured during single product get"})
    } else {
        res.status(200).json({message: "Single product gotten successfully", getSingleOrder});
    }
})

//place order

const placeOrder = asyncHandler(async (req, res) => {
  try {
    const amount = req.params.amount;
    const currency = req.params.currency;
    const receipt = req.params.receipt;
    const partialPayments = false;

    if (!amount || !currency || !receipt) {
      res.status(400).json({ message: "All para meters are mandatory" });
    } else {

      res.status(200).json(response.data);
    }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Internal Server Error");
  }
});

//update orders
const updateOrder = asyncHandler( async (req, res) => {
    const orderData = {...req.body}
    const updateOrderWithId = await orders.findByIdAndUpdate(req.params.id, orderData, {new:true});
    if (!updateOrderWithId) {
        res.status(401).json({message: "Error occured during updation"});
    } else {
        res.status(200).json({message: "Product updated successfully", updateOrderWithId});
    }
})

//delete orders

const deleteOrder = asyncHandler( async (req, res) => {
    const deleteOrderWithId = await orders.findByIdAndDelete(req.params.id);
    if (!deleteOrderWithId) {
        res.status.json({message: "Error occured during deletion"});
    } else {
        res.status(200).json({message: "Product deleted successfully", deleteOrderWithId});
    }
})

module.exports = {
    getAllOrders,
    singleGetOrder,
    placeOrder,
    updateOrder,
    deleteOrder
}