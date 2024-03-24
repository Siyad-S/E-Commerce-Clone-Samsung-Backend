const banner = require("../model/bannerModel");

//get banner
const getBanners = async (req, res) => {
  try {
    const bannerData = await banner.find();
    if (!bannerData) {
      res.status(400).json({ message: "Banner couldn't find" });
    } else {
      res
        .status(200)
        .json({ message: "Banner gotten successfully", bannerData });
    }
  } catch (err) {
    throw err;
  }
};

//get banner
const getBanner = async (req, res) => {
    try {
      const bannerData = await banner.findById(req.params.id);
      if (!bannerData) {
        res.status(400).json({ message: "Banner couldn't find" });
      } else {
        res
          .status(200)
          .json({ message: "Banner gotten successfully", bannerData });
      }
    } catch (err) {
      throw err;
    }
  };

//post banner
const postBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "req.body didn't get" });
    } else {
      const bannerData = await banner.create({
        title,
        description,
        image: req.file.filename,
      });
      console.log(bannerData);

      res
        .status(200)
        .json({ message: "Banner data added successfully", bannerData });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//update banner
const updateBanner = async (req, res) => {
  try {
    if (!req.file) {
      console.log(req.file);
      return res
        .status(400)
        .json({ message: "No file provided for update of banner" });
    }
    const bannerData = { ...req.body, image: req.file.filename };
    const updateData = await banner.findByIdAndUpdate(
      req.params.id,
      bannerData,
      { new: true }
    );
    if (!updateData) {
      res.status(400).json({ message: "Banner couldn't update" });
    } else {
      res
        .status(200)
        .json({ message: "Banner updated successfully", updateData });
    }
  } catch (error) {
    throw error;
  }
};

//get banner
const deleteBanner = async (req, res) => {
  try {
    const removeBanner = await banner.findByIdAndDelete(req.params.id);
    if (!removeBanner) {
      res.status.json({ message: "Error occured during deletion of banner" });
    } else {
      res
        .status(200)
        .json({ message: "Banner deleted successfully", removeBanner });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBanners,
  postBanner,
  updateBanner,
  deleteBanner,
  getBanner
};
