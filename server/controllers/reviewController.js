const Review = require("../models/reviewModel");

// create review
const createReview = async (req, res, next) => {
  try {
    // create review
    const review = await Review.create({
      review: req.body.review,
      productId: req.params.productId,
      userId: req.user.id
    });

    // send response
    return res.status(201).json({ status: "success", data: review });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// get reviews for a product
const getReviews = async (req, res, next) => {
  try {
    // get reviews
    const reviews = await Review.find({
      productId: req.params.productId
    })
      .populate("productId")
      .populate("userId");

    // console.log(reviews);
    // send response
    return res
      .status(200)
      .json({ status: "success", results: reviews.length, data: reviews });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { createReview, getReviews };
