const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  reviewerName: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  reviewComment: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
