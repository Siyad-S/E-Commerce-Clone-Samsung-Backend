const express = require("express");
const dotenv = require("dotenv").config();
const categoryRoute = require("./router/category");
const productRoute = require("./router/product");
const adminRoute = require("./router/admin");
const userRoute = require("./router/user");
const cartRoute = require("./router/cart");
const orderRoute = require("./router/order");
const subCategoryRoute = require("./router/subCategory");
const stripeRoute = require("./router/payment");
const connectDb = require("../Ecommerce-Samsung Clone/config/dbConnection");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth")
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();
connectDb()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/category", categoryRoute );
app.use("/product", productRoute );
app.use("/sub_category", subCategoryRoute);


app.use('/product/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/category/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/sub_category/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/banner/uploads', express.static(path.join(__dirname, "uploads")));

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
// app.use("/order", auth, orderRoute);
app.use("/order", orderRoute);
app.use("/banner", require("./router/banner"))
app.use("/stripe", stripeRoute)

app.listen(port, () => {
    console.log(`Server running on port:${port}`)
})