require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// app error handler
const AppError = require("./utils/appError");

// routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");

// port number
const port = process.env.PORT || 8080;

// start server
startServer(process.env.MONGO_URI_2);

// cors
app.use(
  cors({
    origin: [
      `http://igadgets-admin.netlify.app`,
      `https://igadgets.netlify.app`,
    ],
    credentials: true,
    methods: [`GET`, `POST`, `PATCH`, `DELETE`, `PUT`],
  })
);

// parse cookies
app.use(cookieParser());

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/payment", paymentRoute);

// unhandled route
app.all("*", (req, res, next) => {
  next(AppError("Route doesn't exist!", "error", 404));
});

// error handling middleware
app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ status: err.status || "error", message: err.message, error: err });
});

async function startServer(uri) {
  try {
    await mongoose.connect(uri).then(() => console.log(`DB Connected...`));
    app.listen(port, () => console.log(`Server started on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}
