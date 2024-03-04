const asyncHandler = require("express-async-handler");
const carts = require("../model/cartModel");

//get carts
const getCarts = asyncHandler( async (req, res) => {
    const allCarts = await carts.find();
    if(!allCarts) {
        res.status(404).json({message: "Error occured during getting carts"});
    } else {
        res.status(200).json({message: "Carts gotten successfully", allCarts});
    }
});

//get single cart
// const getCart = asyncHandler( async (req, res) => {
//     const cart = await carts.findById(req.param.id);
//     if(!cart) {
//         res.status(404).json({message: "Error occured during single get of cart"});
//     } else {
//         res.status(200).json({messageP: "Single cart gotten successfully", cart});
//     }
// })

//post cart
const postCart = asyncHandler( async (req, res) => {
    try {
        const {product_id} = req.body;
        console.log(product_id)
        if (!product_id) {
            console.log("product_id:",product_id)
            res.status(400).json({message: "All fields are mandatory"});
        } else {
            const productSaveToCart = await carts.create({
                product_id
            });
            res.status(201).json({message: "Product added to cart succesfully", productSaveToCart});
        }
    } catch (err) {
        res.status(500).json({err : err});
    }
});

//update cart
// const updateCart = asyncHandler( async (req, res) => {
//     const cartData = {...req.body};
//     const editCart = await carts.findByIdAndUpdate(req.params.id, cartData, {new: true});
//     if (!editCart) {
//         res.status(404).json({message: "Error occured during updation"});
//     } else {
//         res.status(201).json({message: "Successfully updated cart", editCart});
//     }
// });

//delete cart
const deleteCart = asyncHandler( async (req, res) => {
    const deleteCartData = await carts.findByIdAndDelete(req.params.id);
    if (!deleteCartData) {
        res.status(404).json({message: "Error occured during deletion"});
    } else {
        res.status(200).json({message: "Successfully deleted cart", deleteCartData});
    }
})

module.exports = {
    getCarts,
    // getCart,
    postCart,
    // updateCart,
    deleteCart
}