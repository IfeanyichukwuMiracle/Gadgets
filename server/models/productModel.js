const mongoose = require("mongoose");

// name, price, description, reviews, quantity, category, image
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required!"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required!"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      enum: ["phone", "laptop", "headset", "tablet"],
      default: "phone",
    },
    image: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
