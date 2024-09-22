const { Review } = require("../models/review.model");
const { Movie } = require("../models/movie.model");

//  @route   POST api/reviews/add
//  @desc    Add movie if not present or edit if present in the database
exports.addEditReview = async (req, res) => {
  try {
    const { rating, reviewComment, movieId, name, _id } = req?.body;
    const review = await Review.findOne({ _id });
    let result = null;
    if (review) {
      review.reviewerName = name;
      review.rating = Number(rating);
      review.reviewComment = reviewComment;
      review.movieId = movieId;
      await review.save();
      result = review;
    } else {
      const newReview = new Review({
        reviewerName: name,
        rating,
        reviewComment,
        movieId,
      });
      await newReview.save();
      result = newReview;
    }
    //Updating the averageRating
    const reviews = await Review.find({ movieId });
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie.averageRating) {
      movie.averageRating = result.rating;
    } else {
      movie.averageRating =
        Number.parseFloat((movie.averageRating * (reviews.length - 1) + result.rating) * 10) / (10 * (reviews.length - 1 + 1)).toFixed(1);
    }
    await movie.save();
    res.json({ result, movie });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};

//  @route   GET api/reviews/search?comment=:comment
//  @desc    Fetch all reviews for a movie in the database
exports.searchMovieReviews = async (req, res) => {
  try {
    const searchQuery = req.query.comment;
    let searchResults = null;
    if (searchQuery) {
      searchResults = await Review.find({ reviewComment: { $regex: `^${searchQuery}`, $options: "i" } });
    }
    res.json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};

//  @route   GET api/reviews/:id
//  @desc    Fetch all reviews for a movie in the database
exports.getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id });
    const movie = await Movie.findOne({ _id: req.params.id });
    res.json({ reviews, movie });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};

//  @route   DELETE api/reviews/delete/:id
//  @desc    Delete review from db
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    if (review) {
      const movie = await Movie.findOne({ _id: review.movieId });
      const reviews = await Review.find({ movieId: review.movieId });
      if (reviews.length > 1) {
        movie.averageRating =
          Number.parseFloat((movie?.averageRating * reviews?.length - review?.rating) * 10) / (10 * (reviews?.length - 1)).toFixed(1);
      } else {
        movie.averageRating = null;
      }
      await movie.save();
      await Review.deleteOne({ _id: req.params.id });
      res.json("Deleted Successfully");
    } else {
      res.status(400).json("No review found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};
