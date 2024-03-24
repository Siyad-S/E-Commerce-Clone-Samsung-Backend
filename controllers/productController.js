const asyncHandler = require("express-async-handler");
const products = require("../model/productModel");


//get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await products.find();
    res.status(200).json({
      message: "All products are retrieved successfully",
      allProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred during getting all products", error });
  }
});

//serach

// const getSearched = asyncHandler(async (req, res) => {
//   console.log(req.query);
//   if (req.query && req.query.search) {
//     try {
//       const productsData = await products.aggregate([
//         {
//           $search: {
//             index: "searchProducts",
//             text: {
//               query: `{"product_name": {$eq: "${req.query.search}"}}`,
//               path: {
//                 wildcard: "*",
//               },
//             },
//           },
//         },
//       ]);
//       console.log(productsData);
//       res.status(200).json({
//         message: "Searched products are retrieved successfully",
//         productsData,
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Error occurred during search", error });
//     }
//   }
// });

const getSearched = asyncHandler(async (req, res) => {
  console.log(req.query);
  if (req.query && req.query.search) {
    try {
      const productsData = await products.aggregate([
        {
          $match: {
            product_name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        },
      ]);
      console.log("Products data:", productsData);
      res.status(200).json({
        message: "Searched products are retrieved successfully",
        productsData,
      });
    } catch (error) {
      console.error("Error occurred during search:", error);
      res.status(500).json({ message: "Error occurred during search", error });
    }
  }
});

//single get for product
const singleGetProduct = asyncHandler(async (req, res) => {
  const getSingleProduct = await products.findById(req.params.id);
  if (!getSingleProduct) {
    res
      .status(404)
      .json({ message: "Error occured during single product get" });
  } else {
    res.status(200).json({
      message: "Single product gotten successfully",
      getSingleProduct,
    });
  }
});

//post products
const postProduct = asyncHandler(async (req, res) => {
  try {
    console.log(req.files);

    const { product_name, category_id, sub_category_id, price, description } =
      req.body;
    if (
      !product_name ||
      !category_id ||
      !sub_category_id ||
      !price ||
      !description
    ) {
      res.status(404).json({ message: "All fields are mandatory" });
    } else {
      console.log(req.files);
      const productDataToSave = await products.create({
        product_name,
        category_id,
        sub_category_id,
        price,
        description,
        product_image: req.files[0].filename,
        product_images: req.files.map((file) => file.filename),
      });

      res.status(200).json({
        message: "Product posted successfully",
        productDataToSave,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

//update product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productData = {
      ...req.body,
      product_image: req.files[0].filename,
      product_images: req.files.map((file) => file.filename),
    };
    const updateProductWithId = await products.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );
    if (!updateProductWithId) {
      res.status.json({ message: "Error occured during updation" });
    } else {
      res
        .status(200)
        .json({ message: "Product updated successfully", updateProductWithId });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const deleteProductWithId = await products.findByIdAndDelete(req.params.id);
  if (!deleteProductWithId) {
    res.status.json({ message: "Error occured during deletion" });
  } else {
    res
      .status(200)
      .json({ message: "Product deleted successfully", deleteProductWithId });
  }
});

module.exports = {
  getAllProducts,
  singleGetProduct,
  getSearched,
  postProduct,
  updateProduct,
  deleteProduct,
};
