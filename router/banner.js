const express = require("express");
const router = express.Router();
const uploadImage = require("../config/multerConfig");
const {
  getBanners,
  postBanner,
  updateBanner,
  deleteBanner,
  getBanner,
} = require("../controllers/bannerController");

router.route("/").get(getBanners);
router.post("/", uploadImage.single("file"), postBanner);
router.put("/:id", uploadImage.single("file"), updateBanner);
router.route("/:id").delete(deleteBanner).get(getBanner);

module.exports = router;
