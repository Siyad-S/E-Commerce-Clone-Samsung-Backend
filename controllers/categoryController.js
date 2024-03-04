const asyncHandler = require("express-async-handler");
const productCategoryData = require('../model/categoryModel');

//get product category
const getAllProductCategory = asyncHandler( async (req, res) => {
  try {
    // const categories = await productCategoryData.find({deleted: false});
    const categories = await productCategoryData.find({deleted: false});
    if(!categories) {
      res.status(404).json({message: "Error occured during getting all categories"});
    } else {
      res.status(200).json({message:"All categories are gotten successfully", categories});
    }
  } catch(error) {
    console.log(error.message)
  }
});

//get single product category
const getSingleProductCategory = asyncHandler(async (req, res) => {
  const singleCategory = await productCategoryData.findOne({
      _id: req.params.id,
      deleted: false
  });
  console.log(singleCategory);
  if (!singleCategory) {
      res.status(404).json({ message: "Error occurred during single get" });
  } else {
      res.status(200).json({ message: "Single Category gotten successfully", singleCategory });
  }
});


//post product category
const postProductCategory = asyncHandler(async (req, res) => {
  try {
    const {category} = req.body;
    // console.log(req.body)
    console.log("category: ",category)
    console.log("categoryImage: ",req.file)
    if (!category) {
      res.status(400).json({message: "All fields are mandatory"});
    } else {
      const adminCategoryToSave = await productCategoryData.create({
        category,
        category_image: req.file.filename,
      });
      res.status(201).json(adminCategoryToSave);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update category with id
const updateProductCategory = asyncHandler( async (req, res) => {
  try {
    const categoryData = {...req.body, category_image: req.file.filename}
    const updateCategoryData = await productCategoryData.findByIdAndUpdate(req.params.id, categoryData, {new: true});
    console.log(updateCategoryData)

    if (!updateCategoryData) {
        res.status(404).json({message:"Error occured during updation"});

    } else {
        res.status(202).json({message: "Category updated successfully", updateCategoryData});
    }
  } catch(error) {
    console.log(error)
  }
});

//delete category with id
const deleteProductCategory = asyncHandler(async (req, res) => {
  try {
    const category = await productCategoryData.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ message: "Category not found or already deleted" });
    } else {
      res.status(200).json({ message: "Category deleted successfully", category });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
    getAllProductCategory,
    getSingleProductCategory,
    postProductCategory,
    updateProductCategory,
    deleteProductCategory
}

