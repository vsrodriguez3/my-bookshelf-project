const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please provide book title"],
      maxLength: 100, 
    },
    reviewText: {
      type: String,
      required: [true, "Please enter your review"],
      maxLength: 1000, 
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      enum: [1, 2, 3, 4, 5], 
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
