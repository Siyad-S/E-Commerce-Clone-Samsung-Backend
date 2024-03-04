const asyncHandler = require("express-async-handler");
const admins = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//get admins
const getAdmins = asyncHandler( async (req, res) => {
    const adminsData = await admins.find();
    if(!adminsData) {
      res.status(404).json({message: "Error occured during getting admins"});
    } else {
      res.status(200).json({message:"All admins are gotten successfully", adminsData});
    }
});

//get single admin
const getSingleAdmin = asyncHandler( async (req, res) => {
    const singleAdmin = await admins.findById(req.params.id);
    if (!singleAdmin) {
        res.status(404).json({message: "Error occured during single admin get"});
    } else {
        res.status(200).json({message: "Single admin gotten successfully", singleAdmin});
    }
});

//post admin - signup
const postAdminSignup = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // check existing admin with email
    const existingAdmin = await admins.findOne({email: email});

    if (!email || !password) {

      res.status(400).json({message: "All fields are mandatory"});

    } else if (existingAdmin) {

      res.status(401).json({message: "Admin already exists with the same email"});

    } else {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await admins.create({
        email, password: hashedPassword
      });

      // generate a token for admin and send it.
      const token = jwt.sign(
        {id: admin._id, email },
        process.env.JWT_SECRET_CODE,
        {
          expiresIn: "1h",
        }
      );

      //send token and don't show password to the frontend
      admin.token = token
      admin.password = undefined

      res.status(201).json({message: "Admin posted successfully", admin});
    }
  } catch (err) {

    res.status(500).json({ err:err });

  }
});

//post admin - login
const postAdminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await admins.findOne({email});

    if (!email || !password) {

      res.status(400).json({message: "All fields are mandatory"});

    } else if (!admin){

      res.status(401).json({message: "Admin not found"});

    } 
    // comparing passwords
    else if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        {id: admin._id},
        process.env.JWT_SECRET_CODE,
        {
          expiresIn: "1h",
        }
      );

      admin.token = token
      admin.password = undefined

      //send admin token to cookie
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
      res.status(201).cookie("token", token, options).json({
        success: true,
        token,
        admin
      });
    }
  } catch (err) {
    res.status(500).json({ err:err });
  }
});

//update admin
const updateAdmin = asyncHandler( async (req, res) => {
    const adminData = {...req.body}
    const updateAdminData = await admins.findByIdAndUpdate(req.params.id, adminData, {new: true});
    if (!updateAdminData) {
        res.status(404).json({message:"Error occured during updation of admin"});
    } else {
        res.status(202).json({message: "Admin updated successfully", updateAdminData});
    }
});

//delete admin
const deleteAdmin = asyncHandler( async (req, res) => {
    const deleteAdminData = await admins.findOneAndDelete(req.params.id);
    if(!deleteAdminData) {
        res.status(404).json({message: "Error occured during deletion of admin"});
    } else {
        res.status(200).json({message:"Admin deleted successfully", deleteAdminData});
    }
});

module.exports = {
    getAdmins,
    postAdminSignup,
    postAdminLogin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}

