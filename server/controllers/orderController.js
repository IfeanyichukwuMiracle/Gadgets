const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

// create order
const createOrder = async (req, res, next) => {
  try {
    const newOrders = await Order.create(req.orders);
    // return response
    // return res.status(200).json({ status: "success", data: newOrders });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get orders
const getOrders = async (req, res, next) => {
  try {
    let queryObj = req.query;
    const excludedFields = ["sort", "select", "limit", "page"];
    excludedFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj).replace(
      /(gt|lt|lte|gte|regex|options)/,
      (str) => {
        return `$${str}`;
      }
    );
    queryObj = JSON.parse(queryStr);

    let query = Order.find(queryObj).populate("productId").populate("userId");

    // sort
    if (req.query.sort) {
      const sortStr = req.query.sort.split(",").join(" ");
      query = query.sort(sortStr);
    }
    // select
    if (req.query.select) {
      const selectStr = req.query.select.split(",").join(" ");
      query = query.select(selectStr);
    }
    // paginate
    if (req.query.page && req.query.limit) {
      const skipCount = (req.query.page - 1) * 5;
      query = query.skip(skipCount).limit(req.query.limit);
    }
    // limit
    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    const orders = await query;
    // return response
    return res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update product list
const updateProductList = async (req, res, next) => {
  // if there is an order
  if (req.body?.order?.length > 0) {
    const orders = req.body?.order?.map((order) => {
      return {
        productId: order._id,
        userId: req.user._id,
        quantity: order.quantity,
      };
    });

    req.orders = orders;

    // for each product in the order, update product
    orders.forEach(async (product) => {
      try {
        const prevProduct = await Product.findById(product.productId);
        prevProduct.quantity = prevProduct.quantity - product.quantity;
        await prevProduct.save();
        next();
      } catch (error) {
        console.log(error);
        return next(error);
      }
    });
    next();
  } else {
    console.log(`no order!`);
    return next(AppError(`No orders`, `error`, 400));
  }
  next();
};

// remove order
const removeOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    // send response
    return res
      .status(204)
      .json({ status: "success", message: "deletion successful!" });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// export
module.exports = { createOrder, getOrders, updateProductList, removeOrder };
