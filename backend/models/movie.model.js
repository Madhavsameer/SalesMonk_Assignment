const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  averageRating: {
    type: Number,
    max: 10,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
