const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product"
    },
    review: {
      type: String,
      required: [true, "review is required!"],
      trim: true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
