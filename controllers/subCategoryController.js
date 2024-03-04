const subCategory = require("../model/subCategoryModel");

//get sub-categories
const getSubCategories = async (req, res) => {
    const subCategories = await subCategory.find({deleted: false});
    if ( !subCategories ) {
        res.status(400).json({message: "Sub categories couldn't find"});
    } else {
        res.status(200).json({message: "Sub categories gotten successfully", subCategories});
    }
}

// //get single sub-categories
// const getSubCategory = async (req, res) => {
//     const id = req.params.id
//     const subCategories = await subCategory.findOne({deleted: false, _id: id});
//     if ( !subCategories ) {
//         res.status(400).json({message: "Sub categories couldn't find"});
//     } else {
//         res.status(200).json({message: "Sub categories gotten successfully", subCategories});
//     }
// }

//post sub-categories
const postSubCategory = async (req, res) => {
    try {
        const { subCategoryName, mainCategoryId } = req.body;
        if ( !subCategoryName || !mainCategoryId ) {
            return res.status(400).json({message: "req.body didn't get"});
        } else {
            const subCategories = await subCategory.create({
                subCategoryName , mainCategoryId, subCategory_image: req.file.filename
            });
            console.log(subCategories)

            res.status(200).json({message: "Sub categories added successfully", subCategories});
        }
    } catch (err) {
        res.status(401).json(err);
    }
}

//update sub-categories
const updateSubCategory = async (req, res) => {
            if (!req.file) {
                console.log(req.file);
            return res.status(400).json({ message: "No file provided for update" });
        }
    const subCategoryData = {...req.body, subCategory_image: req.file.filename}
    const updateData = await subCategory.findByIdAndUpdate(req.params.id, subCategoryData, {new: true});
    if ( !updateData ) {
        res.status(400).json({message: "Sub categories couldn't update"});
    } else {
        res.status(200).json({message: "Sub categories updated successfully", updateData});
    }
}

//get sub-categories
const deleteSubCategory = async (req, res) => {
    try {
        const deleteData = await subCategory.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { deleted: true },
            { new: true }
            );
        if ( !deleteData ) {
            res.status(404).json({message: "Sub categories couldn't delete"});
        } else {
            res.status(200).json({message: "Sub categories deleted successfully", deleteData});
        }
    } catch (error) {
        console.log( error.message );
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getSubCategories,
    postSubCategory,
    updateSubCategory,
    deleteSubCategory,
    // getSubCategory
}