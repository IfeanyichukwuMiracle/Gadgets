const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const cloudinary = require("cloudinary").v2;

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get premium products
const getPremiumProducts = async (req, res, next) => {
  try {
    req.query.sort = "-price,quantity";
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get latest arrivals
const latestArrivals = async (req, res, next) => {
  try {
    req.query.sort = `-createdAt`;
    req.query.limit = 5;
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// create product
const createProduct = async (req, res, next) => {
  try {
    // cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // create product from request body
    const product = await Product.create({
      ...req.body,
      image: result.secure_url,
    });

    // send response
    return res.status(201).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// find products
const findProducts = async (req, res, next) => {
  try {
    // remove certain fields from query object
    let queryObj = { ...req.query };
    const exculdedFields = ["select", "sort", "page", "limit"];
    exculdedFields.forEach((field) => delete queryObj[field]);

    // find and replace certain strings in the query
    let queryStr;
    queryStr = JSON.stringify(queryObj).replace(
      /(gt|lt|lte|gte|regex|options)/,
      (str) => `$${str}`
    );
    queryObj = JSON.parse(queryStr);

    // make query
    let query = Product.find(queryObj);

    if (req.query.select) {
      const selectStr = req.query.select.split(",").join(" ");
      query = query.select(selectStr);
    }

    if (req.query.sort) {
      const sortStr = req.query.sort.split(",").join(" ");
      query = query.sort(sortStr);
    }

    if (req.query.limit) query = query.limit(req.query.limit);

    if (req.query.page && req.query.limit) {
      const skipCount = (req.query.page - 1) * 5;
      query = query.skip(skipCount).limit(req.query.limit);
    }

    const products = await query;

    // send response
    return res
      .status(200)
      .json({ status: "success", results: products.length, data: products });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// find product
const findProduct = async (req, res, next) => {
  try {
    // find product
    const product = await Product.findById(req.params.id);

    // check for product
    if (!product) return next(AppError("No product!", "fail", 404));

    // send response
    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// update product details
const updateProductDetails = async (req, res, next) => {
  try {
    // check for image
    if (!req.file && !req.body?.image) {
      // find product and update
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true }
      );

      // send response
      return res.status(201).json({ status: "success", data: updatedProduct });
    } else {
      // cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
      });

      // find product and update
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: result.secure_url },
        { new: true, runValidators: true }
      );

      // send response
      return res.status(201).json({ status: "success", data: updatedProduct });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// delete product
const removeProduct = async (req, res, next) => {
  try {
    // find and delete
    await Product.findByIdAndDelete(req.params.id);

    // send response
    return res
      .status(204)
      .json({ status: "success", message: "deletion successful!" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  latestArrivals,
  createProduct,
  findProduct,
  findProducts,
  updateProductDetails,
  removeProduct,
  getPremiumProducts,
};
