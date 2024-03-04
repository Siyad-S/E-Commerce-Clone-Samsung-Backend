const asyncHandler = require("express-async-handler");
const users = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


//get users
const getUsers = asyncHandler( async (req, res) => {
    const usersData = await users.find();
    if(!usersData) {
      res.status(404).json({message: "Error occured during getting users"});
    } else {
      res.status(200).json({message:"All users are gotten successfully", usersData});
    }
});

//get single user
const getSingleUser = asyncHandler( async (req, res) => {
    const singleUser = await users.findById(req.params.id);
    if (!singleUser) {
        res.status(404).json({message: "Error occured during single user get"});
    } else {
        res.status(200).json({message: "Single user gotten successfully", singleUser});
    }
});

//post user - signup
const postUserSignup = asyncHandler(async (req, res) => {
  try {
    console.log("request_body:", req.body)
    const { userName, email, phone, password, cart } = req.body;
    // check existing user with email
    const existingUser = await users.findOne({email: email});

    if (!userName || !email || !phone || !password) {

      res.status(400).json({message: "All fields are mandatory"});

    } else if (existingUser) {

      res.status(401).json({message: "User already exists with this email"});

    } else {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await users.create({
        userName, email, phone, password: hashedPassword, cart
      });

      // generate a token for user and send it.
      const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_SECRET_CODE,
        {
          expiresIn: "1h",
        }
      );

      //send token and don't show password to the frontend
      console.log(token)
      user.token = token
      user.password = undefined

      res.status(201).json({message: "User posted successfully", user});

    }
  } catch (err) {

    res.status(500).json({ err:err });

  }
});

//post user - login
const postUserLogin = asyncHandler( async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({email});

    if (!email || !password) {

      res.status(400).json({message: "All fields are mandatory"});

    } else if (!user) {

      res.status(401).json({message: "User not found"});

    }
    //comparing passwords
    else if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET_CODE,
        {
          expiresIn: "1h",
        }
      );
      user.token = token
      user.password = undefined
      const userId = user._id

      res.cookie('token',token, { maxAge: 600000, httpOnly: false, withCredentials: true })
      res
      .status(200)
      .json({message: "logged in successfully", userId});

      console.log("logined user's id:", userId);

    }


  } catch (err) {
    console.log(err);
  }
})

//logout user
const userLogout = asyncHandler( async (req, res) => {
  res
  .status(200)
  .clearCookie('token', { httpOnly: true })
  .json({ success: true, message: 'Logout successful' });
})

// update the user's cart
const putToCart = asyncHandler( async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    // Find the user by ID and update the cart
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { $push: { cart: new mongoose.Types.ObjectId(productId) } },
      { new: true }
    );

    res.json({ cart: updatedUser });
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

//get products from cart

const getCartProducts = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await users.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId) 
        }
      },
      {
        $unwind: "$cart"
      },
      {
        $lookup: {
          from: 'products',
          localField: 'cart',
          foreignField: '_id',
          as: 'cartDetails'
        }
      },
      {
        $group: {
          _id: "$_id",
          cartDetails: { $push: { $arrayElemAt: ["$cartDetails", 0] } }
        }
      }
    ]);

    if (userCart.length === 0) {
      res.status(404).json({ message: "User not found or no products in the cart" });
    } else {
      res.status(200).json(userCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete product from cart
const deleteProductFromCart = asyncHandler( async (req, res) => {

  const userId = req.params.userId
  const index = req.params.index

  if(userId && index) {

    const user = await users.findById(userId);
    console.log(user);
    if(user) {

      user.cart.splice(index, 1)
      await user.save()

    res.status(200).json({user: user.cart, message: "Successfully product removed from cart"});

  } else {
    res.status(400).json({message:"Parameters didn't reach correctly"});
  }
  }
})


//update user
const updateUser = asyncHandler( async (req, res) => {
    const userData = {...req.body}
    const updateUserData = await users.findByIdAndUpdate(req.params.id, userData, {new: true});
    if (!updateUserData) {
        res.status(404).json({message:"Error occured during updation of user"});

    } else {
        res.status(202).json({message: "User updated successfully", updateUserData});
    }
});

//delete user
const deleteUser = asyncHandler( async (req, res) => {
    const deleteUserData = await users.findOneAndDelete(req.params.id);
    if(!deleteUserData) {
        res.status(404).json({message: "Error occured during deletion of user"});
    } else {
        res.status(200).json({message:"User deleted successfully", deleteUserData});
    }
});

module.exports = {
    getUsers,
    getSingleUser,
    postUserSignup,
    postUserLogin,
    putToCart,
    getCartProducts,
    userLogout,
    deleteProductFromCart,
    updateUser,
    deleteUser
}

