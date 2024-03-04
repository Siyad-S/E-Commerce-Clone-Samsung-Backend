const express = require("express");
const router = express.Router();
const {
    getAdmins,
    getSingleAdmin,
    postAdminSignup,
    postAdminLogin,
    updateAdmin,
    deleteAdmin
} = require("../controllers/adminController");

router.route("/").get(getAdmins);
router.route("/register").post(postAdminSignup);
router.route("/login").post(postAdminLogin);
router.route("/:id").get(getSingleAdmin).put(updateAdmin).delete(deleteAdmin);

module.exports = router;