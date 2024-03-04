const express = require("express");
const router = express.Router();
const {
    getUsers,
    getSingleUser,
    postUserSignup,
    postUserLogin,
    userLogout,
    putToCart,
    getCartProducts,
    deleteProductFromCart,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.route("/").get(getUsers);
router.route("/register").post(postUserSignup);
router.route("/login").post(postUserLogin);
router.route("/logout").post(userLogout);
router.route('/cart/:userId').put(putToCart).get(getCartProducts);
router.route('/cart/:userId/:index').delete(deleteProductFromCart)
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;