const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: [true, `quantity is required!`],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
